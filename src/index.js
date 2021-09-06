import React, { Fragment, Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from './commons/theme';

const T = createTheme(themeOptions);

ReactDOM.render(
  <>
    <ThemeProvider theme={T}>
      <Suspense fallback={<Fragment>Loading...</Fragment>}>
        <App />
      </Suspense>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
