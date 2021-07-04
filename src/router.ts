import { userAction } from "redux/actions";

import App, { Authorized, Unauthorized } from "./app";
import pages from "./pages";

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: pages.Dashboard,
        loadData: () => [userAction.loadAll()],
      },
      {
        // Unauthorized
        path: "/auth",
        component: Unauthorized,
        routes: [
          {
            path: "/auth/login",
            component: pages.Login,
          },
        ],
      },
      {
        // Authorized
        component: Authorized,
        routes: [
          {
            path: "/about",
            exact: true,
            component: pages.About,
            loadData: () => [userAction.loadAll()],
          },
          {
            path: "/me",
            exact: true,
            component: pages.Me,
          },
        ],
      },
      {
        component: pages.NotFound,
      },
    ],
  },
];
