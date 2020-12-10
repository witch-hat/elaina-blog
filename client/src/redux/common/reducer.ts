import { ActionTypes, CommonAction, CommonState, ThemeMode } from './type';

export const initialCommonState: CommonState = {
  theme: ThemeMode.light
};

export function commonReducer(state = initialCommonState, action: CommonAction) {
  switch (action.type) {
    case ActionTypes.SetTheme:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
}
