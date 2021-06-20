import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { useDispatch } from "react-redux";
import { matchRoutes, renderRoutes } from "react-router-config";
import { urlHelper } from "../helpers"

import StyledWrapper from './app.style'
import GlobalStyle from "./global.style";
const App = ({location, route, store}:any) => {
  const currentPathURL = location.pathname + location.search;

  const [pathURL, setPathURL] = useState(currentPathURL);

  const matchedRoutes = matchRoutes(route.routes, location.pathname);
  const params = matchedRoutes.reduce(
    (acc, { match }) => ({ ...acc, ...match.params }),
    {}
  );

  // parsing the querystring from location.search
  const query = urlHelper.parse(location);

  // get dispatch method to dispatch action in client side
  const dispatch = useDispatch();

  /*
   * prevent dispatch action in client side
   * while it was dispatch on server side
  */
  if(
    typeof window === "object" && 
    (currentPathURL !== pathURL )
  ) {
    // fetch all action from loadData and filter the falsy
    // finally dispatch it
    matchedRoutes
        .map(({ route: { loadData } }) =>
          loadData ? loadData({ getState: store.getState, params, query }) : []
        )
        // @ts-ignore
        .flat()
        .filter((item) => !!item)
        .forEach(dispatch);

    setPathURL(currentPathURL);
  }
  return(<>
    <GlobalStyle />
    <StyledWrapper backgroundColor="#ff00ff"> 
      {renderRoutes(route.routes)}
    </StyledWrapper>
  </>)
}

export default hot(module)(App);
