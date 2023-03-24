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

  @keyframes pulse{
      0% {
        transform: scale(1) ;
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
      }
      70% {
        transform: scale(1.4) ;
        box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
      }
      100% {
        transform: scale(1) ;
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }};

  .animate {
    animation: pulse 0.5s ease-in-out;
  }
`;
