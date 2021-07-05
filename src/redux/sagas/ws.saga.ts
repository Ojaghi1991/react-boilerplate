import { takeLatest } from "redux-saga/effects";

import wsMiddleware from "../middlewares/ws.middleware";
import ActionTypes from "../actionTypes";

export default function* wsSaga() {
  yield takeLatest(ActionTypes.WS_GET_ROOM, wsMiddleware);
  yield takeLatest(ActionTypes.WS_GET_ROOMS, wsMiddleware);
}
