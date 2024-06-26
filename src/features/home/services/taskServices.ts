import auth from '@react-native-firebase/auth';
import firestore, {Filter} from '@react-native-firebase/firestore';

import {
  CreateRequestTask,
  SearchTaskParams,
  UpdateRequestTask,
  UpdateTaskParams,
} from './types';
import {FirebaseTask, Task} from 'types/task';

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

export async function updateTask({id, data}: UpdateTaskParams) {
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

export async function searchTasks({done, query, limit}: SearchTaskParams) {
  const {email} = getUserEmail();

  const filters: ReturnType<typeof FILTER>[] = [];
  if (done !== undefined) {
    filters.push(FILTER('done', '==', done ? true : false));
  }
  if (query !== undefined) {
    filters.push(FILTER('title', '==', query));
    filters.push(FILTER('description', '==', query));
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
    .limit(limit)
    .get()
    .then(response => {
      if (response.empty) {
        return [];
      }
      let data: FirebaseTask[] = [];
      response.forEach(documentSnapshot => {
        data.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        } as FirebaseTask);
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
    .get()
    .then(documentSnapshot => {
      if (!documentSnapshot.exists) {
        return null;
      }
      return documentSnapshot.data() as FirebaseTask;
    });
}
