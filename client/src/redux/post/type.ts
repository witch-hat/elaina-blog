export enum ActionTypes {
  AddLikedId = 'AddLikedId',
  DeleteLikedId = 'DeleteLikedId'
}

export interface PostState {
  likedIds: number[];
}

interface AddLikedId {
  type: ActionTypes.AddLikedId;
  id: number;
}

interface DeleteLikedId {
  type: ActionTypes.DeleteLikedId;
  id: number;
}

export type PostAction = AddLikedId | DeleteLikedId;
