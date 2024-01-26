import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { basePath } from "shared/config";
import { Spin } from "shared/ui";

export const withRouter = (component: () => React.ReactNode) => () => (
    <BrowserRouter basename={basePath}>
        <Suspense fallback={<Spin delay={300} className="overlay" size="large" />}>
            {component()}
        </Suspense>
    </BrowserRouter>
);
