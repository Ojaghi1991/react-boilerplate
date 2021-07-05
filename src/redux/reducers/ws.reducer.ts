import ActionTypes from "../actionTypes";

const initialState = {
  room: { fetching: undefined },
  rooms: { fetching: undefined },
};

export default function reducer(state: any = initialState, action: any = {}) {
  switch (action.type) {
    /**
     * WS_GET_ROOM
     */
    case ActionTypes.WS_GET_ROOM_REQUESTING:
      return {
        ...state,
        room: { ...state.room, fetching: true },
      };

    case ActionTypes.WS_GET_ROOM_SUCCESS:
      return {
        ...state,
        room: {
          ...action.data,
          fetching: false,
        },
      };

    /**
     * WS_GET_ROOMS
     */
    case ActionTypes.WS_GET_ROOMS_REQUESTING:
      return {
        ...state,
        room: initialState.room,
        rooms: { ...state.rooms, fetching: true },
      };

    case ActionTypes.WS_GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: { ...action.data.rooms, fetching: false },
      };

    /**
     * LOAD_ALL_CHATROOMS
     */
    case ActionTypes.LOAD_ALL_CHATROOM_REQUESTING:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          fetching: true,
        },
      };

    case ActionTypes.LOAD_ALL_CHATROOM_SUCCESS:
      return {
        ...state,
        rooms: {
          data: action.data,
          fetching: false,
        },
      };

    case ActionTypes.LOAD_ALL_CHATROOM_FAILURE:
      return {
        rooms: {
          error: action.error,
          fetching: false,
        },
      };

    /**
     * LOAD_ALL_CHATROOM_MESSAGE
     */
    case ActionTypes.LOAD_ALL_CHATROOM_MESSAGE_REQUESTING:
      return {
        ...state,
        room: {
          ...state.room,
          fetching: true,
        },
      };

    case ActionTypes.LOAD_ALL_CHATROOM_MESSAGE_SUCCESS:
      return {
        ...state,
        room: {
          ...state.room,
          messages: action.data,
          fetching: false,
        },
      };

    case ActionTypes.LOAD_ALL_CHATROOM_MESSAGE_FAILURE:
      return {
        room: {
          error: action.error,
          fetching: false,
        },
      };

    default:
      return state;
  }
}
