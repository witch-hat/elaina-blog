import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    dark: {
      mainBackground: string;
      blogName: string;
      mainText: string;
      detailText: string;
      borderColor: string;
      inputBackground: string;
      hoverBackground: string;
      hoverText: string;
      buttonBackground: string;
    };
    light: {
      mainBackground: string;
      blogName: string;
      mainText: string;
      detailText: string;
      borderColor: string;
      inputBackground: string;
      hoverBackground: string;
      hoverText: string;
      buttonBackground: string;
    };
  }
}
