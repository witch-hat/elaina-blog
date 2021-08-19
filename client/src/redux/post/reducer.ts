import { ActionTypes, PostAction, PostState } from './type';

export const initialPostState: PostState = {
  likedById: {} as { [id: number]: boolean }
};

export function postReducer(state = initialPostState, action: PostAction): PostState {
  switch (action.type) {
    case ActionTypes.SetLikedId:
      return {
        ...state,
        likedById: {
          ...state.likedById,
          [action.id]: action.isLike
        }
      };
    default:
      return state;
  }
}
