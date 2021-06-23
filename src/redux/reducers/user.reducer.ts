import ActionTypes from "../actionTypes";

export const initialState = {
  fetching: undefined,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    /**
     * LOAD_ALL_USER
     */
    case ActionTypes.LOAD_ALL_USER_REQUESTING:
      return {
        ...state,
        fetching: true,
      };

    case ActionTypes.LOAD_ALL_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        fetching: false,
      };

    case ActionTypes.LOAD_ALL_USER_FAILURE:
      return {
        ...state,
        erroru: action.error,
        fetching: false,
      };

    default:
      return state;
  }
};
