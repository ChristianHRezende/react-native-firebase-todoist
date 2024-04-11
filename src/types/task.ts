export type Task = {
  id: number;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  priority: boolean;
  reminder: Date;
  isReminded: boolean;
  done: boolean;
};
