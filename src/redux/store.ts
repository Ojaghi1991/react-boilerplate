import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import config from "../../config";
import reducer from "./reducers";
import saga from "./sagas";

const DEV = process.env.NODE_ENV === "development";

const composeEnhancers =
  (DEV &&
    typeof window === "object" &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default (initialState: any) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(reducer, initialState || {}, enhancers);

  sagaMiddleware.run(saga);

  return store;
};
