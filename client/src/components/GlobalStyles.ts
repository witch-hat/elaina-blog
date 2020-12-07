import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

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
    background-color: #fff;
    color: #121314;
		line-height: 1.4;
		font-family: 'Nanum Gothic', sans-serif
	}
`;
