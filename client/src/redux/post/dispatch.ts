import { store } from '../store';
import { addLikedId, deleteLikedId } from './action';

export const postDispatch = {
  addLikedId: (payload: number) => store.dispatch(addLikedId(payload)),
  deleteLikedId: (payload: number) => store.dispatch(deleteLikedId(payload))
};
