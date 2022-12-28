import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { basicTheme } from './theme';
import App from './App';

const queryClient = new QueryClient();

const GlobalStyles = createGlobalStyle`
  ${reset}

  html, body{
    height:100vh;
  }

  a{
    text-decoration:none;
    color:#000;
  }
  div{
    box-sizing:border-box;
  }

  #root {
    height: 100%;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={basicTheme}>
      <GlobalStyles />
      <App />
      <ReactQueryDevtools />
    </ThemeProvider>
  </QueryClientProvider>,
);
