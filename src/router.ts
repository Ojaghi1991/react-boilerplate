import { userAction } from "redux/actions";

import App from "./app/app";
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
        path: "/about",
        exact: true,
        component: pages.About,
        loadData: () => [userAction.loadAll()],
      },
      {
        component: pages.NotFound,
      },
    ],
  },
];
