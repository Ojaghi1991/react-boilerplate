import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { matchRoutes, renderRoutes } from "react-router-config";

import pages from "../pages";
import AuthorizedStyleWrapper from "./authorized.style";
import UnauthorizedStyleWrapper from "./unauthorized.style";

export default ({ location, params, query, route }: any) => {
  if (matchRoutes(route.routes, location.pathname).length === 0)
    return renderRoutes([{ component: pages.NotFound }]);

  /* TODO: auth is a sample reducer
   *  I use auth to store the profile data
   *  when there is no auth it's means user not authroize
   *  i usually call the profile api in the server side (in server.tsx file)
   */
  const { data } = useSelector(({ sample }: any) => sample, shallowEqual);

  if (!data)
    return (
      <UnauthorizedStyleWrapper>
        {renderRoutes([{ component: pages.Login }], { params, query })}
      </UnauthorizedStyleWrapper>
    );

  return (
    <AuthorizedStyleWrapper>
      <div>{renderRoutes(route.routes, { params, query })}</div>
    </AuthorizedStyleWrapper>
  );
};
