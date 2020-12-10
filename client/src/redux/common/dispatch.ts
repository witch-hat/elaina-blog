import { SetThemeMode } from './action';
import { ThemeMode } from './type';
import { store } from '../store';

export const commonDispatch = {
  SetThemeMode: (theme: ThemeMode) => store.dispatch(SetThemeMode(theme))
};
