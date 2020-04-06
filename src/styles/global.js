import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html,body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;

export const colors = {
  primary: '#7D40E7',
  danger: '#DE3B3B',
  info: '#4D85EE',
};

export const statusColors = {
  PENDENTE: {
    color: '#C1BC35',
    background: '#F0F0DF',
  },
  RETIRADA: {
    color: '#4D85EE',
    background: '#BAD2FF',
  },
  ENTREGUE: {
    color: '#2CA42B',
    background: '#DFF0DF',
  },
  CANCELADA: {
    color: '#DE3B3B',
    background: '#FAB0B0',
  },
};
