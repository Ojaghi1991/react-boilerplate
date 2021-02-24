const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Our application entry point.
  entry: './src/server/index.tsx',
  mode: 'development',
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

  // What file name should be used for the result file,
  // and where it should be palced.
  output: {
    filename: 'build/bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};
