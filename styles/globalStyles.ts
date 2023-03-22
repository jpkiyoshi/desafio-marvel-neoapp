import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    display: block;
    max-width: 100%;
  }

  body {
   font-family: 'Comic Neue', cursive;

    --orange: #ffb800;
    --red: #aa0001;
    --white: #f8f8f8;
    --black: #161616;
  }
`;
