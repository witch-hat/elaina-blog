import { ActionTypes, ThemeMode } from './type';
import { LangCode } from 'src/resources/languages';

export function SetThemeMode(theme: ThemeMode) {
  return {
    type: ActionTypes.SetTheme,
    payload: theme
  };
}

export function SetLangauge(lang: LangCode) {
  return {
    type: ActionTypes.SetLang,
    payload: lang
  };
}
