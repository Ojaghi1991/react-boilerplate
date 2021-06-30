const path = require("path");
const webpack = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const isDev = mode === "development";
const loadPlugins = () => {
  const plugins = [
    new LoadablePlugin({
      writeToDisk: true,
      filename: "./loadable-stats.json",
    }),
    new webpack.DefinePlugin({
      CLIENT: true,
      DEV: isDev,
      "process.env": {},
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[contenthash:8].css",
      chunkFilename: isDev ? "[id].css" : "[id].[contenthash:8].css",
    }),
  ];

  if (isDev) {
    plugins.push(
      // webpack-hot-middleware
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  }
  return plugins;
};
module.exports = {
  devtool: isDev ? "eval-source-map" : false,
  entry: isDev
    ? ["webpack-hot-middleware/client?reload=true", "./src/client/client.tsx"]
    : ["./src/client/client.tsx"],
  mode: isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: isDev,
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          {
            loader: "css",
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css",
            options: {
              importLoaders: 3,
            },
          },
          {
            loader: "less",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/,
        use: {
          loader: "url",
        },
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  // Telling webpack which extensions
  // we are interested in.
  plugins: loadPlugins(),
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils"),
      config: path.resolve(__dirname, "config"),
      helpers: path.resolve(__dirname, "src/helpers"),
      "redux/actions": path.resolve(__dirname, "src/redux/actions"),
      themes: path.resolve(__dirname, "src/themes"),
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    moduleExtensions: ["-loader"],
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  // What file name should be used for the result file,
  // and where it should be palced.
  output: {
    filename: isDev ? "[name].js" : "[name].[hash:8].js",
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
  },
};
