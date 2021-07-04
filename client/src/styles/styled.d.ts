import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    themeColor: string;
    // Background Color
    mainBackground: string;
    headerBackground: string;
    inputBackground: string;
    buttonBackground: string;
    hoverBackground: string;
    articleBackground: string;
    secondaryContentBackground: string;
    submitButtonColor: string;
    editorBackground: string;
    dangerButtonColor: string;
    adminCommentColor: string;
    adminReplyColor: string;
    loadingBackground: string;
    // Text Color
    blogName: string;
    mainText: string;
    detailText: string;
    hoverText: string;
    placeholderText: string;
    inputText: string;
    dangerContentText: string;
    // Border
    borderColor: string;
    inputBorder: string;
    focusBorder: string;
    hoverBorderColor: string;
    invalidBorder: string;
    // Others
    navUnderBar: string;
    navHoverUnderBar: string;
    shadowColor: string;
    inputOutline: string;
  }
}
