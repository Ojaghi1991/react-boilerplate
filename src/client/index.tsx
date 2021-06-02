import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { loadableReady } from '@loadable/component';

const hotModule = (module as any);

const render = (routes: Array<any>) => (hotModule.hot ? ReactDOM.render : ReactDOM.hydrate)(
  <AppContainer>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </AppContainer>,
  document.getElementById('react-view'),
);

loadableReady(() => {
  render(require('../router').default);
});

if (hotModule.hot) {
  hotModule.hot.accept('../router', () => {
    try {
      render(require('../router').default);
    } catch (error) {
      console.error(`Routes hot reloading error ${error}`);
    }
  });
}
