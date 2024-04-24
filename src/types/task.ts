export interface Task {
  id: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  priority: TaskPriority;
  reminder: Date;
  isReminded: boolean;
  done: boolean;
}

export interface FirebaseTask
  extends Omit<Task, 'startDateTime' | 'endDateTime' | 'reminder'> {
  startDateTime: Timestamp;
  endDateTime: Timestamp;
  reminder: Timestamp;
}

export enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
