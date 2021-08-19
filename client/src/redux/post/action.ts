import { ActionTypes } from './type';

export function addLikedId(id: number) {
  return {
    type: ActionTypes.AddLikedId,
    id
  };
}

export function deleteLikedId(id: number) {
  return {
    type: ActionTypes.DeleteLikedId,
    id
  };
}
