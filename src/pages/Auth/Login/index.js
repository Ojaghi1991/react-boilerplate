import React from "react";
import loadable from "@loadable/component";

import { ErrorBoundary, Fallback } from "components";

const Component = loadable(() => import("./login.page"), {
  fallback: <Fallback />,
});

export default (props) => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
);
