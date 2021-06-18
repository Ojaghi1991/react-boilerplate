import React from 'react';
import { hot } from 'react-hot-loader';
import { useDispatch } from "react-redux";
import { matchRoutes, renderRoutes } from "react-router-config";
import { urlHelper } from "../helpers"
import { get } from 'lodash';

const App = ({location, route, store}:any) => {

const matchedRoutes = matchRoutes(route.routes, location.pathname);
const params = matchedRoutes.reduce(
  (acc, { match }) => ({ ...acc, ...match.params }),
  {}
);
const query = urlHelper.parse(location);
const dispatch = useDispatch();
if(get(process,'browser',false)) {
  matchedRoutes
      .map(({ route: { loadData } }) =>
        loadData ? loadData({ getState: store.getState, params, query }) : []
      )
      // @ts-ignore
      .flat()
      .filter((item) => !!item)
      .forEach(dispatch);
  }
  return(<div>
    {renderRoutes(route.routes)}
  </div>)
}

export default hot(module)(App);
