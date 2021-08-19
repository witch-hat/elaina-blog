export enum ActionTypes {
  SetLikedId = 'SetLikedId'
}

export interface PostState {
  likedById: { [id: number]: boolean };
}

interface SetLikedId {
  type: ActionTypes.SetLikedId;
  id: number;
  isLike: boolean;
}

export type PostAction = SetLikedId;
