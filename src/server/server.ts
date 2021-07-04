import path from "path";
import express from "express";
import { ServerStyleSheet } from "styled-components";
import compression from "compression";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import config from "config";
import createStore from "redux/store";
import ActionTypes from "redux/actionTypes";
import devServer from "./devServer";
import serverSideApiCall from "./serverSideApiCall";
import ServerSideHtml from "./ServerSideHtml";

const { port } = config;
const expressApp = express();

expressApp.use(compression());
expressApp.use(hpp());
expressApp.use(cookieParser());
expressApp.use(helmet());
expressApp.use(express.static(path.resolve(process.cwd(), "dist")));
expressApp.use(
  "/assets",
  express.static(path.resolve(process.cwd(), "assets"))
);
if (process.env.NODE_ENV === "development") {
  devServer(expressApp);
}

expressApp.get("*", (req: express.Request, res: express.Response) => {
  const store = createStore({});
  const sheet = new ServerStyleSheet();
  const { appToken = "" } = req.cookies;
  (async () => {
    // if there is token dispatch profile api
    if (appToken) {
      // Note: you can call api with axiosHelper in this part
      // take the result and dispatch it in redux
      store.dispatch({ type: ActionTypes.SAMPLE, data: appToken });
    }
    // dispatch all loadData action which are in router.ts
    try {
      await serverSideApiCall(req, store);
    } catch (e) {
      console.log(e);
    }
    // load reactjs component in the server and render it to html and send it to client as html
    try {
      return res.send(ServerSideHtml(req, { sheet, store }));
    } catch (error) {
      console.error(`==> render error ${JSON.stringify(error)}`);

      return res.status(404).send("Not Found :(");
    } finally {
      sheet.seal();
    }
  })();
});

expressApp.listen(port, () => {
  console.log(`Server now listen to port ${port}`);
});
