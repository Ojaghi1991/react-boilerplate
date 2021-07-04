import { combineReducers } from "redux";

import user from "./user.reducer";
import sample from "./sample.reducer";

export default combineReducers({
  user,
  sample,
});
