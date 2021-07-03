// Require hook for @babel/register
require("@babel/register")({
  plugins: ["dynamic-import-node"],
});

require("asset-require-hook")({
  // Must use the same option with webpack's configuration
  extensions: ["woff", "woff2", "ttf", "otf", "eot"],
  publicPath: "/assets/",
});

// Run server
require("./server/server.ts");
