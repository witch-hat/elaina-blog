import { store } from '../store';
import { setLikedId } from './action';

export const postDispatch = {
  setLikedId: (id: number, isLike: boolean) => store.dispatch(setLikedId(id, isLike))
};
