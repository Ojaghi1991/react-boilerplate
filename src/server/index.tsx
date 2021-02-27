import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import htmlContent from '../utils/htmlContent';
import App from '../components';

const PORT = process.env.PORT || 3000;
const expressApp = express();

expressApp.use(express.static('../../public'));

expressApp.get('*', (req: express.Request, res: express.Response) => {
  const content = renderToString(<App />);
  return res.send(htmlContent(content));
});

expressApp.listen(PORT, () => {
  console.log(`Server now listen to port ${PORT}`);
});
