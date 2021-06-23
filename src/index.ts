// Require hook for @babel/register
require("@babel/register")({
  plugins: ["dynamic-import-node"],
});

// Run server
require("./server/server.ts");
