// src/styles/globals.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  /* CSS Reset */
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    background: #f7f9fb !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif !important;
    color: #203970 !important;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    background: #f7f9fb;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    line-height: 1.3;
    color: inherit;
  }

  p {
    margin: 0 0 1em;
    padding: 0;
  }

  a {
    color: #1464ff;
    text-decoration: none;
  }

  /* Form elements */
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  /* Utility classes */
  .kanban-board {
    background: #f7f9fb !important;
    min-height: 100vh;
    padding: 1.5em 0;
    transition: background 0.19s;
  }

  /* Ensure styled-components take precedence */
  [data-styled] {
    background: inherit !important;
  }

  /* Loading spinner animation */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default GlobalStyle;
