import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {CreateRequestTask, UpdateRequestTask} from './types';
import {Task} from 'types/task';

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

//TODO: Add filters
export async function searchTasks() {
  const {email} = getUserEmail();

  return firestore()
    .collection('todos')
    .doc(email ?? '')
    .collection('data')
    .get() as unknown as Promise<Task[]>;
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
