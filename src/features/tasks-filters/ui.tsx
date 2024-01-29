import { reflect } from "@effector/reflect";

import { Radio } from "shared/ui";

import { taskModel } from "entities/task";

import { filtersList, getFilterById, DEFAULT_FILTER } from "./config";

type Props = {
  loading: boolean;
  onFilterClick: (p: taskModel.QueryConfig) => void;
};

const View = ({ loading, onFilterClick }: Props) => {
  return (
    <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
      {filtersList.map(({ title, id }) => (
        <Radio.Button
          key={id}
          onClick={() => onFilterClick(getFilterById(id).config)}
          value={id}
          disabled={loading}
        >
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

// The use of effector-reflect here is optional and not critical within the methodology
export const TasksFilters = reflect({
  view: View,
  bind: {
    loading: taskModel.$tasksListLoading,
    onFilterClick: taskModel.events.setQueryConfig,
  },
});
