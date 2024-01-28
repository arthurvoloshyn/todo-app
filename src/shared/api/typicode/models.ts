export type TaskId = number;

export interface Task {
  id: TaskId;
  title: string;
  userId: number;
  completed: boolean;
}
