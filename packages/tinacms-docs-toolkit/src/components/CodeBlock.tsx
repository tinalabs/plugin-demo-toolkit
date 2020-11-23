// import React from "react";
// import Highlight, { defaultProps } from "prism-react-renderer";

// export const CodeBlock = ({ children, className }: any) => {
//   const language = className.replace(/language-/, "");
//   return (
//     <Highlight {...defaultProps} code={children} language={language}>
//       {({ className, style, tokens, getLineProps, getTokenProps }) => (
//         <pre className={className} style={{ ...style, padding: "20px" }}>
//           {tokens.map((line, i) => (
//             <div key={i} {...getLineProps({ line, key: i })}>
//               {line.map((token, key) => (
//                 <span key={key} {...getTokenProps({ token, key })} />
//               ))}
//             </div>
//           ))}
//         </pre>
//       )}
//     </Highlight>
//   );
// };

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CodeStyle from "./CodeStyles";
import styled from "styled-components";

const copyToClipboard = (text: string) => {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

interface copyButtonProps {
  value?: string;
}
const CodeWrapper = styled.div`
  position: relative;
`;
const CopyCodeButton = ({ value }: copyButtonProps) => {
  const [copied, setCopied] = React.useState(false);

  const clickEvent = () => {
    setCopied(true);
    copyToClipboard(value || "");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <StyledCopyCodeButton onClick={clickEvent}>
      {!copied ? "Copy" : "Copied!"}
    </StyledCopyCodeButton>
  );
};
const StyledCopyCodeButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  border: 1px solid var(--tina-color-grey-3);
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.03);
  color: var(--tina-color-grey-7);
  border-right-width: 0;
  transition: all 150ms ease-out;
  border-top-width: 0;
  font-size: var(--tina-font-size-1);
  border-radius: 0 0 0 5px;

  &:hover {
    color: var(--color-primary);
    opacity: 1;
  }
`;
function WithCodeStyles({ className, children }: any) {
  // const [language, ...other] = tags?.split(",") || [];
  // const copy = other.includes("copy") || language === "copy";
  const language = className.replace(/language-/, "");
  return (
    <CodeWrapper>
      <SyntaxHighlighter language={language} style={CodeStyle}>
        {children}
      </SyntaxHighlighter>
      <CopyCodeButton value={children} />
    </CodeWrapper>
  );
}

export const CodeBlock = WithCodeStyles;
