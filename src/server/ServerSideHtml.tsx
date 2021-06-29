import React from "react";
import path from "path";
import { Provider } from "react-redux";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { StyleSheetManager } from "styled-components";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";

import htmlContent from "utils";

import routes from "../router";

export default (req, options) => {
  const { sheet, store } = options;
  const statsFile = path.resolve("./dist/loadable-stats.json");
  const extractor = new ChunkExtractor({ statsFile });

  const head = Helmet.renderStatic();

  const initialState: any = store.getState();

  const component = (
    <ChunkExtractorManager extractor={extractor}>
      <Provider store={store}>
        <StaticRouter location={req.path} context={{}}>
          <StyleSheetManager sheet={sheet.instance}>
            {renderRoutes(routes)}
          </StyleSheetManager>
        </StaticRouter>
      </Provider>
    </ChunkExtractorManager>
  );

  const content = renderToString(component);
  return htmlContent(head, content, extractor, initialState);
};
