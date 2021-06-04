import React from 'react';
import path from 'path';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import htmlContent from '../utils/htmlContent';
import routes from '../router';
import devServer from './devServer';

const PORT = process.env.PORT || 3000;
const expressApp = express();

expressApp.use(express.static('../../dist'));

if (process.env.NODE_ENV === 'development') {
  devServer(expressApp);
}
const statsFile = path.resolve('./dist/loadable-stats.json');

expressApp.get('*', (req: express.Request, res: express.Response) => {
  const extractor = new ChunkExtractor({ statsFile });

  const component = (
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.path} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </ChunkExtractorManager>
  );
  const content = renderToString(component);
  return res.send(htmlContent(content, extractor));
});

expressApp.listen(PORT, () => {
  console.log(`Server now listen to port ${PORT}`);
});
