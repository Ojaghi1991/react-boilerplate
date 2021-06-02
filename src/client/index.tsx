import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';

const render = (routes: Array<any>) => ((module as any).hot ? ReactDOM.render : ReactDOM.hydrate)(
  <AppContainer>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </AppContainer>,
  document.getElementById('react-view'),
);

render(require('../router').default);

if ((module as any).hot) {
  (module as any).hot.accept('../router', () => {
    try {
      render(require('../router').default);
    } catch (error) {
      console.error(`Routes hot reloading error ${error}`);
    }
  });
}
