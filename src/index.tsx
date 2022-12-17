import React from 'react';
import ReactDOM from 'react-dom/client';
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ThemeProvider theme={basicTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
);
