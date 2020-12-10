export enum ThemeMode {
  light = 'light',
  dark = 'dark'
}

export interface CommonState {
  theme: ThemeMode;
}

export enum ActionTypes {
  SetTheme = 'SetTheme'
}

interface SetTheme {
  type: ActionTypes.SetTheme;
  payload: ThemeMode;
}

export type CommonAction = SetTheme;
