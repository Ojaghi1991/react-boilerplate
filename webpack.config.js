const path = require('path');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports = {
  devtool: isDev ? 'eval-source-map' : false,
  entry: isDev
    ? ['webpack-hot-middleware/client?reload=true', './src/client/index.tsx']
    : ['./src/client/index.tsx'],
  mode: isDev ? 'development' : 'production',
  // These rules define how to deal
  // with files with given extensions.
  // For example, .tsx files
  // will be compiled with ts-loader,
  // a spcific loader for webpack
  // that knows how to work with TypeScript files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  // Telling webpack which extensions
  // we are interested in.
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: isDev ? [new webpack.HotModuleReplacementPlugin(), new LoadablePlugin({
    writeToDisk: true,
    filename: './loadable-stats.json',
  })] : [new LoadablePlugin({
    writeToDisk: true,
    filename: './loadable-stats.json',
  })],
  // What file name should be used for the result file,
  // and where it should be palced.
  output: {
    filename: isDev ? '[name].js' : '[name].[hash:8].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
};
