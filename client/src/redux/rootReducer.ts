import { combineReducers } from 'redux';

import { commonReducer } from './common/reducer';
import { postReducer } from './post/reducer';
const rootReducer = combineReducers({
  common: commonReducer,
  post: postReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
