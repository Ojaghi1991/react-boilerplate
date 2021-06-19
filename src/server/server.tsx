import React from 'react';
import path from 'path';
import { Provider } from "react-redux";
import express from 'express';
import { Helmet } from "react-helmet";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import htmlContent from '../utils/htmlContent';
import { axiosHelper, dispatchHelper }  from '../helpers';
import routes from '../router';
import devServer from './devServer';
import createStore from "../redux/store";
import ActionTypes from '../redux/actionTypes'
const PORT = process.env.PORT || 3000;
const expressApp = express();

expressApp.use(express.static('../../dist'));

if (process.env.NODE_ENV === 'development') {
  devServer(expressApp);
}
const statsFile = path.resolve('./dist/loadable-stats.json');

expressApp.get('*', (req: express.Request, res: express.Response) => {

  const { "application-api-token": token } = req.cookies || {};
  const extractor = new ChunkExtractor({ statsFile });
  const store = createStore({});
 
  const loadData = () => {
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

  (async () => {
    try {
      await loadData();
    } catch (err) {
      // @ts-ignore
      if (global.DEV) console.error(`==> Data error ${JSON.stringify(err)}`);
    }
    try {
      const initialState: any = store.getState();
      const head = Helmet.renderStatic();
    
      const component = (
        <ChunkExtractorManager extractor={extractor}>
          <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        </ChunkExtractorManager>
      );
      const content = renderToString(component);
      return res.send(htmlContent(head, content, extractor, initialState));
   } catch(error) {
    console.error(`==> render error ${JSON.stringify(error)}`);
    res.status(404).send("Not Found :(");
    console.error(error);
   }
  })();
});

expressApp.listen(PORT, () => {
  console.log(`Server now listen to port ${PORT}`);
});
