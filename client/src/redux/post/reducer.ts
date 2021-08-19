import { ActionTypes, PostAction, PostState } from './type';

export const initialPostState: PostState = {
  likedIds: [] as number[]
};

export function postReducer(state = initialPostState, action: PostAction): PostState {
  switch (action.type) {
    case ActionTypes.AddLikedId:
      return {
        ...state,
        likedIds: [...state.likedIds, action.id]
      };
    case ActionTypes.DeleteLikedId:
      return {
        ...state,
        likedIds: state.likedIds.filter((id) => id !== action.id)
      };
    default:
      return state;
  }
}
