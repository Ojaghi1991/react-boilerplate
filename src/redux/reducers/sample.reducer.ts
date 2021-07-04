import Cookies from "universal-cookie";
import ActionTypes from "../actionTypes";

export const initialState = {};

const cookies = new Cookies();

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SAMPLE:
      cookies.set("appToken", action.data);
      return {
        data: action.data,
        ...state,
      };

    default:
      return state;
  }
};
