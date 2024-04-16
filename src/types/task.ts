export type Task = {
  id: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  priority: TaskPriority;
  reminder: Date;
  isReminded: boolean;
  done: boolean;
};

export enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
