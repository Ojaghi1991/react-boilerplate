import ActionTypes from "../actionTypes";

export function sample(id: string) {
  return {
    type: ActionTypes.SAMPLE,
    data: id,
  };
}

export default sample;
