import React, { FC } from 'react';
import { renderRoutes } from 'react-router-config';

const App: FC = ({ route }: any) => (
  <div>
    {renderRoutes(route.routes)}
  </div>
);

export default App;
