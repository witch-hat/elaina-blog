import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  dark: {
    // Background Color
    mainBackground: '#262728',
    inputBackground: '#888',
    hoverBackground: '',
    buttonBackground: '',
    headerBackground: '#121314',
    // Text Color
    blogName: '#f1f2f3',
    mainText: '#f1f2f3',
    detailText: '#666',
    hoverText: '',
    placeholderText: '#f1f2f3',
    // Border
    borderColor: '#aaa',
    inputBorder: '#111',
    // Others
    navUnderBar: '',
    shadowColor: 'rgba(0, 0, 0, 0.9)'
  },
  light: {
    // Background Color
    mainBackground: '#fff',
    inputBackground: '#fff',
    hoverBackground: '',
    buttonBackground: '',
    headerBackground: '#fff',
    // Text Color
    blogName: '#121314',
    mainText: '#121314',
    detailText: '#888',
    hoverText: '',
    placeholderText: '#888',
    // Border
    borderColor: '#ddd',
    inputBorder: '#ccc',
    // Others
    navUnderBar: '',
    shadowColor: 'rgba(38, 38, 38, 0.4)'
  }
};
