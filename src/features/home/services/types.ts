import {Task} from 'types/task';

export type CreateRequestTask = Omit<Task, 'id' | 'done' | 'isReminded'>;
export type UpdateRequestTask = Partial<Task>;
