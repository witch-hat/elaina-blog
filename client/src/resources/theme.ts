import { ThemeMode } from 'src/redux/common/type';

interface Color {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  blogName: string;
}

export type Theme = {
  [key in ThemeMode]: Color;
};

export const theme: Theme = {
  light: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    textColor: '#111213',
    blogName: '#1f2f3f'
  },
  dark: {
    backgroundColor: '#262728',
    borderColor: '#ddd',
    textColor: '#f1f2f3',
    blogName: '#1f2f3f'
  }
};
