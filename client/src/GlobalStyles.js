import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    // width: 100vw;
    height: 100vh;
    // background: ${(props) => props.theme.White};
    font-family: 'Prompt', sans-serif;
    font-size:18px;
    // color: ${(props) => props.theme.Dark};
  }

  h1, h2, h3, p{
    // color: ${(props) => props.theme.Dark};
    font-family: "Prompt", sans-serif;
  }

  // p{
  //   color: ${(props) => props.theme.Grayish};
  // }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border:none;
    outline: none;
    text-decoration:none;
    color:inherit;
  }
`;
