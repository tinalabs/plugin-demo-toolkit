import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import DocsRichText from "../RichText";

/* Styles rich text (markdown output)
 */

export const DocsTextWrapper = ({ children }: any) => {
  return <TextWrapper>{children}</TextWrapper>;
};

const CssReset = css`
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select,
  textarea {
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
    text-align: left;
  }
`;
export const GlobalStyle = React.memo(createGlobalStyle`
  ${CssReset}

  html {
    font-size: 81.25%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    line-height: 1.6;
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
    -webkit-font-smooth: 'antialiased';
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    @media (min-width: 450px) {
      font-size: 87.5%;
    }

    @media (min-width: 685px) {
      font-size: 100%;
    }

    /* Color */
    --color-primary: #EC4815;
    --color-primary-dark: #CE411D;
    --color-secondary: #302454;
    --color-secondary-dark: #241748;
    --color-seafoam: #E6FAF8;
    --color-seafoam-dark: #B4F4E0;
    --color-light: #FAFAFA;
    --color-light-dark: #E9E9EC;
    --color-grey: #595959;
    --color-grey-dark: #404040;

    /* Layout */
    --breakpoint-small: 400px;
    --breakpoint-medium: 800px;
    --breakpoint-large: 1200px;

    /* Typography */
    --font-tuner: 'tuner-regular', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;

    * {
      box-sizing: inherit;
      font-variant-numeric: inherit;
      font-family: inherit;
      line-height: inherit;
      font-size: 100%;
      font-weight: normal;
      scrollbar-width: thin;
      scrollbar-color: #E1DDEC var(--color-light);
      
      &::-webkit-scrollbar {
        width: 9px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
        border-left: 1px solid var(--color-light-dark);
        border-right: 1px solid var(--color-light-dark);
      }
      &::-webkit-scrollbar-thumb {
        background-color: #E1DDEC;
        border-radius: 0;
        border: none;
      }
    }
  }
`);

const TextWrapper = styled.div`
  ${DocsRichText}
  min-height: 68vh;
`;

const FallbackPlaceholder = ({ wrapperStyles, placeholderStyles }: any) => (
  <FallbackWrapper style={wrapperStyles}>
    <FallbackItem style={placeholderStyles} />
  </FallbackWrapper>
);

const FallbackWrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;

const FallbackItem = styled.div`
  width: 100%;
  height: 50vh;
  background-color: var(--color-light);
  border-radius: 5px;
  animation: bgfade 1.5s ease infinite;
  @keyframes bgfade {
    0% {
      background-color: var(--color-light);
    }
    50% {
      background-color: var(--color-light-dark);
    }
  }
`;
