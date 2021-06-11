import { takeLatest } from "redux-saga/effects";

import axiosMiddleware from "../middlewares/axios.middleware";
import ActionTypes from "../actionTypes";

export default function* userSaga() {
  yield takeLatest(ActionTypes.LOAD_ALL_USER, axiosMiddleware);
  yield takeLatest(ActionTypes.LOAD_USER, axiosMiddleware);
  yield takeLatest(ActionTypes.CREATE_USER, axiosMiddleware);
  yield takeLatest(ActionTypes.UPDATE_USER, axiosMiddleware);
  yield takeLatest(ActionTypes.DELETE_USER, axiosMiddleware);
}
