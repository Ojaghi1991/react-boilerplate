import React from 'react';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';

const App = ({ route }: any) => (
  <div>
    {renderRoutes(route.routes)}
  </div>
);

export default hot(module)(App);
