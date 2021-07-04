import React from "react";
import { matchRoutes, renderRoutes } from "react-router-config";

import pages from "../pages";
import StyleWrapper from "./unauthorized.style";

export default ({ location, params, query, route }: any) => {
  const matched = matchRoutes(route.routes, location.pathname).length > 0;

  return matched ? (
    <StyleWrapper>{renderRoutes(route.routes, { params, query })}</StyleWrapper>
  ) : (
    renderRoutes([{ component: pages.NotFound }])
  );
};
