import { createStore, combine, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";
import { normalize, schema, NormalizedSchema } from "normalizr";

import { typicodeApi } from "shared/api";

export interface QueryConfig {
  completed?: boolean;
  userId?: number;
}

const setQueryConfig = createEvent<QueryConfig>();

// Each effect can also have its own additional processing
const getTasksListFx = createEffect(
  (params?: typicodeApi.tasks.GetTasksListParams) =>
    typicodeApi.tasks.getTasksList(params)
);
const getTaskByIdFx = createEffect(
  (params: typicodeApi.tasks.GetTaskByIdParams) =>
    typicodeApi.tasks.getTaskById(params)
);

// It is possible to bring normalization to the API level
type NormalizedTaskSchema<R> = NormalizedSchema<
  { tasks: Record<number, typicodeApi.models.Task> },
  R
>;
export const taskSchema = new schema.Entity("tasks");
export const normalizeTask = (
  data: typicodeApi.models.Task
): NormalizedTaskSchema<number> => normalize(data, taskSchema);
export const normalizeTasks = (
  data: typicodeApi.models.Task[]
): NormalizedTaskSchema<number[]> => normalize(data, [taskSchema]);

// It is not critical within the demo, but you can also store it as an array without normalization
export const tasksInitialState: Record<number, typicodeApi.models.Task> = {};
export const $tasks = createStore(tasksInitialState)
  .on(
    getTasksListFx.doneData,
    (_, payload) => normalizeTasks(payload.data).entities.tasks
  )
  .on(getTaskByIdFx.doneData, (state, payload) => ({
    ...state,
    ...normalizeTask(payload.data).entities.tasks,
  }));

// You can put it in a separate directory (for storing multiple models)
export const $queryConfig = createStore<QueryConfig>({}).on(
  setQueryConfig,
  (_, payload) => payload
);

// You can add potentially debounceable logic
export const $tasksListLoading = getTasksListFx.pending;
export const $taskDetailsLoading = getTaskByIdFx.pending;

/**
 * "List" of tasks
 */
export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));

/**
 * Filtered tasks
 * @remark It is possible to handle it at the effect level - but then you need to plug additional logic into the store
 * > For example, hide/show task at `toggleTask` event
 */
export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasksList, config) =>
    tasksList.filter(
      (task) =>
        config.completed === undefined || task.completed === config.completed
    )
);

export const $tasksListEmpty = $tasksFiltered.map((list) => list.length === 0);

// If desired, you can have a separate selector that is not tied to react bindings
const useTask = (taskId: number): typicodeApi.models.Task | undefined =>
  useStore($tasks)[taskId];

export const events = { setQueryConfig };

export const effects = {
  getTaskByIdFx,
  getTasksListFx,
};

export const selectors = {
  useTask,
};
