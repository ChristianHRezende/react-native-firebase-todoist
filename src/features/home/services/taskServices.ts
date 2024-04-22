import auth from '@react-native-firebase/auth';
import firestore, {Filter} from '@react-native-firebase/firestore';

import {CreateRequestTask, SearchTaskParams, UpdateRequestTask} from './types';
import {Task} from 'types/task';

const FILTER = firestore.Filter;

function getUserEmail() {
  const user = auth().currentUser;
  if (!user || !user?.email) {
    throw new Error('User email not found');
  }
  return user;
}

export async function createTask(data: CreateRequestTask) {
  const user = getUserEmail();

  return firestore()
    .collection('todos')
    .doc(user.email || '')
    .collection('data')
    .add(data) as unknown as Promise<void>;
}

export async function updateTask(id: string, data: UpdateRequestTask) {
  const {email} = getUserEmail();

  return firestore()
    .collection('todos')
    .doc(email ?? '')
    .collection('data')
    .doc(id)
    .update(data) as unknown as Promise<void>;
}

export async function deleteTask(id: string) {
  const {email} = getUserEmail();

  return firestore()
    .collection('todos')
    .doc(email ?? '')
    .collection('data')
    .doc(id)
    .delete() as unknown as Promise<void>;
}

//TODO: Paginate
export async function searchTasks(params: SearchTaskParams) {
  const {email} = getUserEmail();

  const filters: ReturnType<typeof FILTER>[] = [];
  if (params.done !== undefined) {
    filters.push(FILTER('done', '==', params.done ? true : false));
  }

  function buildQuery() {
    if (filters) {
      return firestore()
        .collection('todos')
        .doc(email ?? '')
        .collection('data')
        .where(filters.length === 1 ? filters[0] : FILTER.or(...filters));
    }
    return firestore()
      .collection('todos')
      .doc(email ?? '')
      .collection('data');
  }

  return buildQuery()
    .get()
    .then(response => {
      if (response.empty) {
        return [];
      }
      let data: Task[] = [];
      response.forEach(documentSnapshot => {
        data.push(documentSnapshot.data() as Task);
      });
      return data;
    });
}

export async function getTaskById(id: string) {
  const {email} = getUserEmail();

  return firestore()
    .collection('todos')
    .doc(email ?? '')
    .collection('data')
    .doc(id)
    .get() as unknown as Promise<Task>;
}
