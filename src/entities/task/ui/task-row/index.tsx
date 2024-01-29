import cn from "classnames";
import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

import { typicodeApi } from "shared/api";
import { Row } from "shared/ui";

import styles from "./styles.module.scss";

export type TaskRowProps = PropsWithChildren<{
  data: typicodeApi.models.Task;
  titleHref?: string;
  before?: ReactNode;
}>;

export const TaskRow = ({
  data,
  before,
  titleHref,
}: TaskRowProps): ReactElement => {
  const title = titleHref ? (
    <Link to={titleHref}>{data.title}</Link>
  ) : (
    data.title
  );

  return (
    <Row className={cn(styles.root, { [styles.completed]: data.completed })}>
      {before}
      {title}
    </Row>
  );
};
