import { type ReactNode } from "react";
import { Routing } from "pages";
import { withProviders } from "./providers";
import "./index.scss";

const App = (): ReactNode => {
  return (
    <div className="app">
      <Routing />
    </div>
  );
};

export const AppWithProviders = withProviders(App);
