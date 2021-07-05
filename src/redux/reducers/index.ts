import { combineReducers } from "redux";

import user from "./user.reducer";
import ws from "./ws.reducer";

export default combineReducers({
  user,
  ws,
});
