import { ActionTypes } from './type';

export function setLikedId(id: number, isLike: boolean) {
  return {
    type: ActionTypes.SetLikedId,
    id,
    isLike
  };
}
