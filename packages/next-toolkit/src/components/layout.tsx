import React, { useEffect, useMemo, useState } from "react";
// import { useCMS } from "tinacms";

// import NavItem from "../components/Nav.js";
import { Container, Columns, Column } from "bloomer";
import { Button } from "bloomer/lib/elements/Button";
import Code from "./Code.js";
import { NavItem } from "./NavItem";
import { LayoutProps } from "../interfaces";

// export const LoadComponent = async (fileName: string) => {
//   try {
//     const component = await import(`../docs/${fileName}.tsx`);
//     return component;
//   } catch (e) {
//     console.error(`${fileName} was not found`);
//     console.error(e);
//     throw e;
//   }
// };

export const Layout: React.FC<LayoutProps> = ({
  config,
  currentSlug,
  loadComponent,
}) => {
  //   const cms = useCMS();
  const [loading, setLoading] = useState(true);
  const [showCode, setVisibility] = useState(false);
  const [Component, setComponent] = useState(undefined as any);
  const foundPage = config.pages.find((page) => page.slug === currentSlug);
  if (!foundPage) {
    throw Error(`did not find page with slug ${currentSlug}`);
  }
  const currentPage = foundPage;
  const currentIndex = config.pages.findIndex((page) => page === currentPage);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { LinkWrapper, title } = config;

  useEffect(() => {
    const callLoadComponent = async () => {
      setLoading(true);
      const c = await loadComponent(currentPage.filePath);
      if (c.default) {
        setComponent(c);
      }
      setLoading(false);
    };
    callLoadComponent();
  }, [foundPage.filePath]);

  if (loading) {
    return <div>Loading</div>;
  }
  // const RenderedComponent = Component.default;

  return (
    <Container
      style={{
        marginTop: 40,
        marginBottom: 40,
        paddingLeft: 40,
        paddingRight: 40,
        maxWidth: 1000,
      }}
    >
      <Columns>
        <Column isSize="3/4">
          <h1 className="title is-1">
            {/* <Link to="/" className="has-text-black"> */}
            <div className="has-text-black">{title}</div>
            {/* </Link> */}
          </h1>
          <Component.default />
          <div style={{ marginRight: "0px", marginTop: "40px" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {config.pages[currentIndex - 1] && (
                // <Link to={prevLink}>
                <Button type="button" className="button is-small">
                  Previous
                </Button>
                // </Link>
              )}

              {/* <Button
                onClick={cms.toggle}
                type="button"
                className="button is-small"
              >
                Toggle Edit Mode
              </Button> */}
              {Component.code && (
                <Button
                  type="button"
                  className="button is-small"
                  onClick={() => {
                    setVisibility(!showCode);
                  }}
                >
                  {showCode ? "Close Code" : "Show Code"}
                </Button>
              )}

              {config.pages[currentIndex + 1] && (
                // <Link to={nextLink}>
                <Button type="button" className="button is-small">
                  Next
                </Button>
                // </Link>
              )}
            </div>
            <Code show={showCode}>{Component.code.toString() || ""}</Code>
          </div>
        </Column>

        <Column isSize="1/4">
          {/* TODO: this is passed in and the default is table of contents */}
          Table of Contents
          <ol style={{ marginTop: 20 }}>
            {/* TODO: make this list from the config */}
            {/* <NavItem to="/">
              <li>Welcome</li>
            </NavItem> */}
            {config.pages.map((page) => {
              return (
                <NavItem to={page.slug} key={page.slug}>
                  <LinkWrapper to={page.slug}>
                    <li>{page.label}</li>
                  </LinkWrapper>
                </NavItem>
              );
            })}
          </ol>
        </Column>
      </Columns>
    </Container>
  );
};
