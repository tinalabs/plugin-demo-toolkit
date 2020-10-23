import React, { useState } from "react";
import { Container, Columns, Column } from "bloomer";
import { Button } from "bloomer/lib/elements/Button";
import Code from "./Code.js";
import { NavItem } from "./NavItem";
import { LayoutProps } from "../interfaces";
import { useGetComponent } from "../hooks";
import { TinaCMS, TinaCMSConfig, TinaProvider } from "tinacms";
import { CodeBlock } from "./CodeBlock";
import { MDXProvider } from "@mdx-js/react";
const PreBlock = (props: any) => <div {...props} />;
export const MDXComponents = {
  pre: PreBlock,
  code: CodeBlock,
};

export const Layout: React.FC<LayoutProps> = ({
  config,
  currentSlug,
  loadComponent,
}) => {
  //   const cms = useCMS();
  const [showCode, setVisibility] = useState(false);
  const foundPage = config.pages.find((page) => page.slug === currentSlug);
  if (!foundPage) {
    throw Error(`did not find page with slug ${currentSlug}`);
  }
  const { loading, Component } = useGetComponent({
    loadComponent,
    filePath: foundPage.filePath,
  });
  const currentPage = foundPage;
  const currentIndex = config.pages.findIndex((page) => page === currentPage);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { LinkWrapper, title } = config;
  if (loading) {
    return <div>Loading</div>;
  }

  const pageTinaConfig: TinaCMSConfig = Component.TinaConfig || {};
  const cms = new TinaCMS({ ...config.tinaConfig, ...pageTinaConfig });

  return (
    // <MDXProvider components={components}>
    <TinaProvider cms={cms}>
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
                  <LinkWrapper to={config.pages[currentIndex - 1].slug}>
                    <Button type="button" className="button is-small">
                      Previous
                    </Button>
                  </LinkWrapper>
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
                  <LinkWrapper to={config.pages[currentIndex + 1].slug}>
                    <Button type="button" className="button is-small">
                      Next
                    </Button>
                  </LinkWrapper>
                )}
              </div>
              <Code show={showCode}>
                {typeof Component.code == "undefined"
                  ? ""
                  : Component.code.toString() || ""}
              </Code>
            </div>
          </Column>

          <Column isSize="1/4">
            {config.tableOfContentsText || "Table of Contents"}
            <ol style={{ marginTop: 20 }}>
              {config.pages.map((page) => {
                return (
                  <NavItem
                    active={page.slug === currentPage.slug}
                    key={page.slug}
                  >
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
    </TinaProvider>
    // </MDXProvider>
  );
};
