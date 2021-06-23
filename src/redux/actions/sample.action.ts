import ActionTypes from "../actionTypes";

export default function sample(id: string) {
  return {
    type: ActionTypes.SAMPLE,
    data: id,
  };
}
