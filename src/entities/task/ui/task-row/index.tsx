import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { Row } from "shared/ui";
import styles from "./styles.module.scss";

export type TaskRowProps = PropsWithChildren<{
  data: import("shared/api").Task;
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
