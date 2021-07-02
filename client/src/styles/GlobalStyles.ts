import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

// import { theme } from 'src/styles/theme';
import { ThemeMode } from 'src/redux/common/type';

export const GlobalStyles = createGlobalStyle`
	html {
		/* scroll-behavior: smooth; */
		font-size: 16px;
		font-family: "Nanum Gothic", sans-serif;
		vertical-align: baseline;
		@media screen and (max-width: 1380px) {
			font-size: 16px;
		}
		@media screen and (max-width: 767px) {
			font-size: 15px;
		}
	}
	body {
		background-color: ${(props) => props.theme.mainBackground};
		color: ${(props) => props.theme.mainText};
		line-height: 1.4;
	}
	* {
		box-sizing: border-box;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	p {
		margin: 0;
		cursor: text;
	}
	article {
		cursor: text;
	}
	pre[contentEditable] {
		margin: 0;
	}
	button {
		background-color: inherit;
		color: ${(props) => props.theme.mainText};
		user-select: none;
		outline: none;
		cursor: pointer;
		border: 1px solid ${(props) => props.theme.borderColor};
	}
	input {
		font-weight: 200;
	}
	ul {
		padding: 0;
	}
`;
