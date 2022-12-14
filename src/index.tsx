import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { basicTheme } from './theme';
import App from './App';

const GlobalStyles = createGlobalStyle`
  ${reset}

  a{
    text-decoration:none;
    color:#000;
  }
  div{
    box-sizing:border-box;
  }
`;

ReactDOM.render(
	<ThemeProvider theme={basicTheme}>
		<GlobalStyles />
		<App />
	</ThemeProvider>,
	document.getElementById('root')
);
