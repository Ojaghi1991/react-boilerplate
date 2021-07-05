export default {
  dev: process.env.NODE_ENV || "development",
  host: process.env.SERVER_HOST || "0.0.0.0",
  port: process.env.SERVER_PORT || 3000,
  apiURL: process.env.API_URL || "https://jsonplaceholder.typicode.com",
  googleMapApiKey:
    process.env.GOOGLE_MAP_API_KEY ||
    "Generate Google Api in you accound for Input Address Component",
};
