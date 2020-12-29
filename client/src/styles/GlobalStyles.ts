import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

import { theme } from 'src/styles/theme';
import { ThemeMode } from 'src/redux/common/type';

export const GlobalStyles = createGlobalStyle<{ themeMode: ThemeMode }>`
	a {
		text-decoration: none;
		color: inherit;
	}
	button {
		background-color: inherit;
		color: ${(props) => theme[props.themeMode].mainText};
		user-select: 'none';
		outline: 'none';
	}
	input {
		font-weight: 200;
	}
	ul {
		padding: 0;
	}
	li {
		list-style: none;
	}
	* {
		box-sizing: border-box;
	}
	body {
    background-color: ${(props) => theme[props.themeMode].mainBackground};
    color: ${(props) => theme[props.themeMode].mainText};
		line-height: 1.4;
	}
	html {
		font-size: 16px;
		font-family: 'Nanum Gothic', sans-serif;
		vertical-align: baseline;
		@media screen and (max-width: 1380px) {
			font-size: 15px;
		}
		@media screen and (max-width: 767px) {
			font-size: 14px;
		}
	}
`;
