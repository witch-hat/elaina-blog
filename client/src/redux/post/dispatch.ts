import { store } from '../store';
import { addLikedId, deleteLikedId } from './action';

export const postDispatch = {
  addLikedId: (id: number) => store.dispatch(addLikedId(id)),
  deleteLikedId: (id: number) => store.dispatch(deleteLikedId(id))
};
