import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import store from './store/store';
import ErrorBoundary from './components/common/ErrorBoundary';
import GlobalStyle from './styles/globals';
import './styles/emergency.css';
import theme from './styles/theme';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);

// PWA/offline readiness
serviceWorker.register();

