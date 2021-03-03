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
