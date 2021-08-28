import { ActionTypes } from './type';

export function addLikedId(payload: number) {
  return {
    type: ActionTypes.AddLikedId,
    payload
  };
}
export function deleteLikedId(payload: number) {
  return {
    type: ActionTypes.DeleteLikedId,
    payload
  };
}
