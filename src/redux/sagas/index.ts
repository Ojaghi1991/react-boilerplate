import { all } from "redux-saga/effects";

import userSaga from "./user.saga";
import wsSaga from "./ws.saga";

export default function* saga() {
  yield all([userSaga(), wsSaga()]);
}
