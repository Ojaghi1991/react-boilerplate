import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { loadableReady } from '@loadable/component';

import createStore from "../redux/store";

// @ts-ignore
const store = createStore(window.INITIAL_STATE);
const hotModule = (module as any);

const render = (routes: Array<any>) => (hotModule.hot ? ReactDOM.render : ReactDOM.hydrate)(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
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
