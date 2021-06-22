import express from "express";
import { ServerStyleSheet } from "styled-components";

import devServer from "./devServer";
import createStore from "../redux/store";
import loadServerSideData from "./serverSideApiCall";
import RenderServerSideHtml from "./RenderServerSideHtml";
import config from "../../config";

const { port } = config;
const expressApp = express();

expressApp.use(express.static("../../dist"));

if (process.env.NODE_ENV === "development") {
  devServer(expressApp);
}

expressApp.get("*", (req: express.Request, res: express.Response) => {
  const store = createStore({});

  (async () => {
    const sheet = new ServerStyleSheet();
    try {
      // dispatch actions in loadData in router.ts
      await loadServerSideData(req, store);
    } catch (err) {
      // @ts-ignore
      if (global.DEV) console.error(`==> Data error ${JSON.stringify(err)}`);
    }

    try {
      return res.send(RenderServerSideHtml(req, { store, sheet }));
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
