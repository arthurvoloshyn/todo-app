import { Suspense, ReactNode, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { basePath } from "shared/config";
import { Spin } from "shared/ui";

export const withRouter = (
  component: () => ReactNode
): (() => ReactElement) => {
  const Router = () => (
    <BrowserRouter basename={basePath}>
      <Suspense
        fallback={<Spin delay={300} className="overlay" size="large" />}
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );

  return Router;
};
