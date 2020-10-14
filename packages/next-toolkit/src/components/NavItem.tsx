import React from "react";

export const NavItem = (props: any) => {
  const styles = {} as React.CSSProperties;
  if (props.active) {
    styles.fontWeight = "bold";
    styles.color = "hsl(0, 0%, 21%)";
  }
  return (
    <>
      <div style={styles}>{props.children}</div>
    </>
  );
};
