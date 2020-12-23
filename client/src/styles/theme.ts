import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  dark: {
    // Background Color
    mainBackground: '#1a1a1a',
    inputBackground: '#555',
    hoverBackground: '#444',
    buttonBackground: '',
    headerBackground: '#252525',
    articleBackground: '#252525',
    secondaryContentBackground: '#313131',
    // Text Color
    blogName: '#f1f2f3',
    mainText: '#f1f2f3',
    detailText: '#666',
    hoverText: '',
    placeholderText: '#f1f2f3',
    inputText: '#f1f2f3',
    // Border
    borderColor: '#aaa',
    inputBorder: '#111',
    // Others
    navUnderBar: '#888',
    navHoverUnderBar: '#aaa',
    shadowColor: 'rgba(0, 0, 0, 0.9)'
  },
  light: {
    // Background Color
    mainBackground: '#fff',
    inputBackground: '#fff',
    hoverBackground: 'rgba(0, 0, 0, 0.125)',
    buttonBackground: '',
    headerBackground: '#fff',
    articleBackground: '#fff',
    secondaryContentBackground: '#eee',
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
    // Others
    navUnderBar: '#555',
    navHoverUnderBar: '#888',
    shadowColor: 'rgba(38, 38, 38, 0.4)'
  }
};
