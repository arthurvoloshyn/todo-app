import { typicodeApi } from "shared/api";

type TaskStatus = "CLOSED" | "OPENED";

export const getTaskStatus = (data: typicodeApi.models.Task): TaskStatus =>
  data.completed ? "CLOSED" : "OPENED";
