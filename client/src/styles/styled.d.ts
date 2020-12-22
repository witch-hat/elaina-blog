import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    [key: string]: {
      // Background Color
      mainBackground: string;
      inputBackground: string;
      buttonBackground: string;
      hoverBackground: string;
      // Text Color
      blogName: string;
      mainText: string;
      detailText: string;
      hoverText: string;
      // Other
      borderColor: string;
      navUnderBar: string;
    };
  }
}
