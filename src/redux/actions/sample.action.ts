import ActionTypes from '../actionTypes';

export default function(id:string) {
  return {
    type: ActionTypes.SAMPLE,
    data: id,
  };
}
