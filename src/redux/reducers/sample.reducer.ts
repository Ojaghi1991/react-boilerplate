import ActionTypes from "../actionTypes";

export const initialState = {};

export default (state = initialState, action:any) => {
  switch (action.type) {
    case ActionTypes.SAMPLE:
      return {
        ...state,
      };
      
    default:
      return state;
  }
};
