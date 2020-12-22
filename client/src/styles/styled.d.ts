import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    dark: {
      mainBackground: string;
      blogName: string;
      mainText: string;
      detailText: string;
      borderColor: string;
    };
    light: {
      mainBackground: string;
      blogName: string;
      mainText: string;
      detailText: string;
      borderColor: string;
    };
  }
}
