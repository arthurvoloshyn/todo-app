import { reflect } from "@effector/reflect";
import { useEffect } from "react";
import { Link, RouteChildrenProps } from "react-router-dom";

import { Layout, Result, Button } from "shared/ui";

import { TaskCard, taskModel } from "entities/task";

import { ToggleTask } from "features/toggle-task";

import styles from "./styles.module.scss";

type Props = RouteChildrenProps<{ taskId: string }> & { isLoading: boolean };

const View = ({ match, isLoading }: Props) => {
  const taskId = Number(match?.params.taskId);
  const task = taskModel.selectors.useTask(taskId);

  useEffect(() => {
    taskModel.effects.getTaskByIdFx({ taskId });
  }, [taskId]);

  // You can move some logic to entity/task/card (as a container)
  if (!task && !isLoading) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Task was not found"
        extra={
          <Link to="/">
            <Button type="primary">
              Back to tasks list
              {taskId}
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <Layout className={styles.root}>
      <Layout.Content className={styles.content}>
        <TaskCard
          data={task}
          size="default"
          loading={isLoading}
          className={styles.card}
          bodyStyle={{ height: 400 }}
          extra={<Link to="/">Back to TasksList</Link>}
          actions={[<ToggleTask key="toggle" taskId={taskId} />]}
        />
      </Layout.Content>
    </Layout>
  );
};

// The use of effector-reflect here is optional and not critical within the methodology
export const TaskDetailsPage = reflect({
  view: View,
  bind: {
    isLoading: taskModel.$taskDetailsLoading,
  },
});
