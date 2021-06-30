import path from "path";
import express from "express";
import { ServerStyleSheet } from "styled-components";

import config from "config";
import createStore from "redux/store";
import devServer from "./devServer";
import serverSideApiCall from "./serverSideApiCall";
import ServerSideHtml from "./ServerSideHtml";

const { port } = config;
const expressApp = express();

expressApp.use(express.static(path.resolve(process.cwd(), "dist")));

if (process.env.NODE_ENV === "development") {
  devServer(expressApp);
}

expressApp.get("*", (req: express.Request, res: express.Response) => {
  const store = createStore({});
  const sheet = new ServerStyleSheet();

  (async () => {
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
