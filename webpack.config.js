const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports = {
  devtool: isDev ? 'eval-source-map' : false,
  entry: isDev
    ? ['webpack-hot-middleware/client?reload=true', './src/client/index.tsx']
    : ['./src/client/index.tsx'],
  mode: isDev ? 'development' : 'production',
  target: 'node',
  externals: [nodeExternals()],
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
  plugins: isDev ? [new webpack.HotModuleReplacementPlugin()] : [],
  // What file name should be used for the result file,
  // and where it should be palced.
  output: {
    filename: 'build/bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};
