import React from "react";
import loadable from "@loadable/component";

const Component = loadable(() => import("./dashboard.page"), {
  fallback: <div>loading</div>,
});

export default (props) => <Component {...props} />;
