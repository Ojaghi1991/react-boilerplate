import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import htmlContent from '../utils/htmlContent';
import routes from '../router';

const PORT = process.env.PORT || 3000;
const expressApp = express();

expressApp.use(express.static('../../public'));

if (process.env.NODE_ENV === 'development') {
  /* Run express as webpack dev server */
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config.js');
  const compiler = webpack(webpackConfig);
  const instance = require('webpack-dev-middleware')(compiler, {
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal',
    serverSideRender: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  });

  expressApp.use(instance);

  instance.waitUntilValid(() => {
    console.clear();
    console.log(`Development Server is now running on port ${PORT} ...`);
  });

  expressApp.use(require('webpack-hot-middleware')(compiler));
}

expressApp.get('*', (req: express.Request, res: express.Response) => {
  const component = (
    <StaticRouter location={req.path} context={{}}>
      {renderRoutes(routes)}
    </StaticRouter>
  );
  const content = renderToString(component);
  return res.send(htmlContent(content));
});

expressApp.listen(PORT, () => {
  console.log(`Server now listen to port ${PORT}`);
});
