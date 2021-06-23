import { matchRoutes } from "react-router-config";
import { dispatchHelper } from "helpers";

import routes from "../router";

export default (req, store) => {
  const { "application-api-token": token } = req.cookies || {};

  const promises = matchRoutes(routes, req.path)
    .map(({ route, match }: Record<string, any>) =>
      route.loadData
        ? route.loadData({
            params: match.params,
            query: req.query,
            getState: store.getState,
          })
        : []
    )
    // @ts-ignore
    .flat()
    .filter((item: any) => !!item)
    .map((item) => dispatchHelper(store.dispatch, item, token));

  return Promise.all(promises);
};
