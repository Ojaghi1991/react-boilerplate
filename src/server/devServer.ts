import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config.js';

const devServer = (expressApp) => {
  const PORT = process.env.PORT || 3000;
  const compiler = webpack(webpackConfig);
  const instance = devMiddleware(compiler, {
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

  expressApp.use(hotMiddleware(compiler));
};

export default devServer;
