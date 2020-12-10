import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { theme } from 'src/resources/theme';

export const GlobalStyles = createGlobalStyle`
	${reset};
	a {
		text-decoration: none;
		color: inherit;
	}
	* {
		box-sizing: border-box;
	}
	body {
    background-color: ${theme.light.backgroundColor};
    color: ${theme.light.textColor};
		line-height: 1.4;
		font-family: 'Nanum Gothic', sans-serif
	}
`;
