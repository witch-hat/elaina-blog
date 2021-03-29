import { ActionTypes, CommonAction, CommonState, ThemeMode } from './type';
import { LangCode } from 'src/resources/languages';

export const initialCommonState: CommonState = {
  theme: ThemeMode.light,
  lang: LangCode.ko
};

export function commonReducer(state = initialCommonState, action: CommonAction) {
  switch (action.type) {
    case ActionTypes.SetTheme:
      return {
        ...state,
        theme: action.payload
      };
    case ActionTypes.SetLang:
      return {
        ...state,
        lang: action.payload
      };
    default:
      return state;
  }
}
