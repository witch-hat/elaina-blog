import { ActionTypes, PostAction, PostState } from './type';

export const initialPostState: PostState = {
  likedIds: []
};

export function postReducer(state = initialPostState, action: PostAction): PostState {
  switch (action.type) {
    case ActionTypes.AddLikedId:
      return {
        ...state,
        likedIds: [...state.likedIds, action.payload]
      };
    case ActionTypes.DeleteLikedId:
      return {
        ...state,
        likedIds: state.likedIds.filter((payload) => payload !== action.payload)
      };
    default:
      return state;
  }
}
