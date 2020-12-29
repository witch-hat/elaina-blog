import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    [key: string]: {
      // Background Color
      mainBackground: string;
      headerBackground: string;
      inputBackground: string;
      buttonBackground: string;
      hoverBackground: string;
      articleBackground: string;
      secondaryContentBackground: string;
      submitButtonColor: string;
      // Text Color
      blogName: string;
      mainText: string;
      detailText: string;
      hoverText: string;
      placeholderText: string;
      inputText: string;
      // Border
      borderColor: string;
      inputBorder: string;
      // Others
      navUnderBar: string;
      navHoverUnderBar: string;
      shadowColor: string;
    };
  }
}
