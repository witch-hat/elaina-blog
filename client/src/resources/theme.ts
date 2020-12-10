interface Color {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  blogName: string;
}

export interface Theme {
  light: Color;
  dark: Color;
}

export const theme: Theme = {
  light: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    textColor: '#111213',
    blogName: '#ff00f8'
  },
  dark: {
    backgroundColor: '#222324',
    borderColor: '#ddd',
    textColor: '#f1f2f3',
    blogName: '#ff00f8'
  }
};
