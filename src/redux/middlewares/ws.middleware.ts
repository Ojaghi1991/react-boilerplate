import { put } from "redux-saga/effects";

export default function* wsMiddleware(action) {
  const { type, ...params } = action;

  yield put({ type: `${type}_REQUESTING`, ...params });
}
