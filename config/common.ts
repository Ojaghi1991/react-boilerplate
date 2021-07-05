export default {
  dev: process.env.NODE_ENV || "development",
  host: process.env.SERVER_HOST || "0.0.0.0",
  port: process.env.SERVER_PORT || 3000,
  apiURL: process.env.API_URL || "https://jsonplaceholder.typicode.com",
  wsUrl: process.env.WS_URL || "ws:server baseurl",
};
