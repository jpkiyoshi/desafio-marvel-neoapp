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
   background-image: url('/images/hero-image.jpg');
	background-color: var(--black);
	background-size: auto;
	background-position: center;
	background-repeat: repeat;


    --orange: #ffb800;
    --red: #aa0001;
    --white: #f8f8f8;
    --black: #161616;
  }

  a{
    text-decoration: none;
  }
`;
