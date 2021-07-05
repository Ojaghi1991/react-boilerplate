import { single, socket, promise } from "./typeGenerator";

export default [
  // Single Actions
  single("sample"),

  // WS
  socket("get_room"),
  socket("get_rooms"),
  socket("send_message"),

  /**
   * Promise Actions -> Second arguments guide
   * c: CREATE
   * l: LOAD
   * a: LOAD_ALL
   * u: UPDATE
   * d: DELETE
   */
  promise("user", "claud"),
];
