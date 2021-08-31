import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	.Toastify__toast {
		font-size: 1.4rem;
	}
	html, body, body > div {
		height: 100%;
		background: #fff;
	}
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	html {
		font-size: 62.5%;
	}
	body {
		box-sizing: border-box;
		overflow-x: hidden;
		color: #fff;
		font-family: 'Roboto', sans-serif;
	}
	a, input, button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		outline: inherit;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}
	a, button {
		cursor: pointer;
	}
	
	input {
		cursor: text;
	}
`;
