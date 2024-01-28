import type { Task } from "shared/api";

type TaskStatus = "CLOSED" | "OPENED";

export const getTaskStatus = (data: Task): TaskStatus =>
  data.completed ? "CLOSED" : "OPENED";
