import type { AxiosPromise } from "axios";
import { apiInstance } from "./base";
import type { Task } from "./models";

const BASE_URL = "/todos";

export interface GetTasksListParams {
  userId?: number;
  completed?: boolean;
}

export const getTasksList = (
  params?: GetTasksListParams
): AxiosPromise<Task[]> => apiInstance.get(BASE_URL, { params });

export interface GetTaskByIdParams {
  taskId: number;
  [x: string]: unknown;
}

export const getTaskById = ({
  taskId,
  ...params
}: GetTaskByIdParams): AxiosPromise<Task> =>
  apiInstance.get(`${BASE_URL}/${taskId}`, { params });
