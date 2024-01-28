// Either use @loadable/component, within the tutorial - not critical
import { lazy, type ReactElement } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const TasksListPage = lazy(() =>
  import("./tasks-list").then((module) => ({ default: module.TasksListPage }))
);
const TaskDetailsPage = lazy(() =>
  import("./task-details").then((module) => ({
    default: module.TaskDetailsPage,
  }))
);

export const Routing = (): ReactElement => {
  return (
    <Switch>
      <Route exact path="/" component={TasksListPage} />
      <Route exact path="/:taskId" component={TaskDetailsPage} />
      <Redirect to="/" />
    </Switch>
  );
};
