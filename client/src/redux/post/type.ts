export enum ActionTypes {
  AddLikedId = 'AddLikedId',
  DeleteLikedId = 'DeleteLikedId'
}

export interface PostState {
  likedIds: number[];
}

interface AddLikedId {
  type: ActionTypes.AddLikedId;
  payload: number;
}

interface DeleteLikedId {
  type: ActionTypes.DeleteLikedId;
  payload: number;
}

export type PostAction = AddLikedId | DeleteLikedId;
