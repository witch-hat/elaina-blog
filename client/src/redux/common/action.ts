import { ActionTypes, ThemeMode } from './type';

export function SetThemeMode(theme: ThemeMode) {
  return {
    type: ActionTypes.SetTheme,
    payload: theme
  };
}
