import { DefaultTheme } from 'styled-components';

export const theme: { light: DefaultTheme; dark: DefaultTheme } = {
  light: {
    themeColor: '#2a9df4',
    // Background Color
    mainBackground: '#fff',
    inputBackground: '#fff',
    hoverBackground: 'rgba(0, 0, 0, 0.125)',
    headerBackground: 'rgb(255, 255, 255)',
    articleBackground: '#fff',
    secondaryContentBackground: '#eee',
    editorBackground: '#fff',
    adminCommentColor: 'rgba(145, 255, 0, 0.05)',
    adminReplyColor: 'rgba(145, 255, 0, 0.15)',
    loadingBackground: 'rgba(255, 255, 255, .8)',
    selectedButton: 'rgba(200, 200, 200, .8)',
    // Text Color
    blogName: '#121314',
    mainText: '#121314',
    detailText: '#888',
    hoverText: '',
    placeholderText: '#888',
    inputText: '#121314',
    // Border
    borderColor: '#ddd',
    inputBorder: '#ccc',
    focusBorder: '#2a9df4',
    hoverBorderColor: '#121314',
    invalidBorder: '#ff3d41',
    // Others
    navUnderBar: '#555',
    navHoverUnderBar: '#888',
    shadowColor: 'rgba(38, 38, 38, 0.4)',
    inputOutline: 'rgba(134, 125, 255, .7)',

    // submit
    submitButton: {
      buttonColor: '#2a9df4',
      textColor: '#f1f2f3'
    },

    // danger
    dangerButton: {
      buttonColor: '#ff0000',
      textColor: '#f1f2f3'
    },

    // Nav
    navList: {
      selectedColor: '#867dff',
      selectedBorderLeft: '2px solid #867dff',
      hoverColor: 'inherit',
      hoverMarginLeft: '.35rem',
      hoverBorderLeft: '2px solid #121314'
    }
  },
  dark: {
    themeColor: '#2a9df4',
    // Background Color
    mainBackground: '#1a1a1a',
    inputBackground: '#555',
    hoverBackground: '#444',
    headerBackground: 'rgb(37, 37, 37)',
    articleBackground: '#252525',
    secondaryContentBackground: '#313131',
    editorBackground: '#313131',
    adminCommentColor: 'rgba(77, 77, 77, 0.5)',
    adminReplyColor: 'rgba(77, 77, 77, 0.7)',
    loadingBackground: 'rgba(0, 0, 0, .7)',
    selectedButton: 'rgba(60, 60, 60, .8)',
    // Text Color
    blogName: '#f1f2f3',
    mainText: '#f1f2f3',
    detailText: '#aaa',
    hoverText: '',
    placeholderText: '#f1f2f3',
    inputText: '#f1f2f3',
    // Border
    borderColor: '#aaa',
    inputBorder: '#111',
    focusBorder: '#324123',
    hoverBorderColor: '#f1f2f3',
    invalidBorder: '#ff3d41',
    // Others
    navUnderBar: '#888',
    navHoverUnderBar: '#ddd',
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    inputOutline: 'rgba(134, 125, 255, .7)',

    // submit
    submitButton: {
      buttonColor: '#2a9df4',
      textColor: '#f1f2f3'
    },

    // danger
    dangerButton: {
      buttonColor: '#ff0000',
      textColor: '#f1f2f3'
    },

    // Nav
    navList: {
      selectedColor: '#867dff',
      selectedBorderLeft: '2px solid #867dff',
      hoverColor: 'inherit',
      hoverMarginLeft: '.35rem',
      hoverBorderLeft: `2px solid #f1f2f3`
    }
  }
};
