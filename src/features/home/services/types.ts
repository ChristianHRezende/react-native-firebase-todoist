import {Task} from 'types/task';

export type CreateRequestTask = Omit<Task, 'id' | 'done' | 'isReminded'>;
export type UpdateRequestTask = Partial<Task>;
export interface UpdateTaskParams {
  id: string;
  data: UpdateRequestTask;
}
export interface SearchTaskParams {
  query?: string;
  done?: Task['done'];
  limit: number;
}
