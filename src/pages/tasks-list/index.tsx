import { variant, list } from "@effector/reflect";
import { combine } from "effector";
import { ReactElement } from "react";

import { typicodeApi } from "shared/api";
import { Layout, Row, Col, Typography, Spin, Empty } from "shared/ui";

import { TaskRow, taskModel } from "entities/task";

import { TasksFilters } from "features/tasks-filters";
import { ToggleTask } from "features/toggle-task";

import styles from "./styles.module.scss";

export const TasksListPage = (): ReactElement => {
  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        {/* ~ Layout.Toolbar */}
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        <Row justify="center">
          <TasksFilters />
        </Row>
      </Layout>
      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          {/* eslint-disable-next-line no-use-before-define */}
          <PageContent />
        </Row>
      </Layout.Content>
    </Layout>
  );
};

const ListItemView: React.FC<{ task: typicodeApi.models.Task }> = ({
  task,
}) => {
  return (
    <Col key={task.id} span={24}>
      <TaskRow
        data={task}
        titleHref={`/${task.id}`}
        before={<ToggleTask taskId={task.id} withStatus={false} />}
      />
    </Col>
  );
};

// The use of effector-reflect here is optional and not critical within the methodology
const TasksList = list({
  view: ListItemView,
  source: taskModel.$tasksFiltered,
  bind: {},
  mapItem: {
    task: (task) => task,
  },
});

// The use of effector-reflect here is optional and not critical within the methodology
const PageContent = variant({
  source: combine(
    {
      isLoading: taskModel.$tasksListLoading,
      isEmpty: taskModel.$tasksListEmpty,
    },
    ({ isLoading, isEmpty }) => {
      if (isLoading) return "loading";
      if (isEmpty) return "empty";
      return "ready";
    }
  ),
  cases: {
    loading: () => <Spin size="large" />,
    empty: () => <Empty description="No tasks found" />,
    ready: TasksList,
  },
  hooks: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mounted: taskModel.effects.getTasksListFx.prepend(() => {}),
  },
});
