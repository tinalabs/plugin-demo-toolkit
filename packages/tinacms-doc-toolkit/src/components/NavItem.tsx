import React from "react";
import styled from "styled-components";

export const NavItem: React.FC<{ active: boolean }> = (props) => {
  const styles = {} as React.CSSProperties;
  if (props.active) {
    styles.fontWeight = "bold";
    styles.color = "var(--color-primary)";
  }
  return <ListItem active={props.active}>{props.children}</ListItem>;
};

const ListItem = styled.li<{ active: boolean }>`
  color: ${(props) =>
    props.active
      ? "var(--color-primary) !important;"
      : "var(--color-secondary); !important;"}
  /* font-family: var(--font-tuner); */
  display: block;
  margin: 0;
  padding: 0.375rem 0 0.375rem 0;
  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }
  &:focus {
    outline: none;
  }
`;
