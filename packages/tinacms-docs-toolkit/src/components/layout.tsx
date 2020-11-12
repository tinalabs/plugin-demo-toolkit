import React, { useState } from "react";
import { TinaCMS, TinaCMSConfig, TinaProvider } from "tinacms";
import { Container, Columns, Column } from "bloomer";
import { Button } from "bloomer/lib/elements/Button";
import { useLoadPage } from "../hooks";
import Code from "./Code.js";
import { NavItem } from "./NavItem";
import { CodeBlock } from "./CodeBlock";
import Loader from "./Loader";
import ErrorRenderer from "./ErrorRenderer";
import DocsRichText from "./RichText";
import styled from "styled-components";
const TextWrapper = styled.div`
  ${DocsRichText}
  min-height: 68vh;
`;

export interface Config {
  pages: Page[];
  components: {
    Link: React.FC<{ to: string }>;
    Loading?: React.FC<unknown>;
    RenderError?: React.FC<{ error: Error }>;
  };
  labels?: {
    tableOfContentsTitle?: string;
  };
  cmsToggle?: boolean;
  tinaConfig?: TinaCMSConfig;
}

export interface DemoPage {
  default: React.FC<unknown>;
  code?: string;
  tinaConfig?: TinaCMSConfig;
}

export interface Page {
  label: string;
  slug: string;
  loadPage: Promise<unknown>;
}

export const MDXComponents = {
  pre: function pre(props: any) {
    return <div {...props} />;
  },
  code: CodeBlock,
};

export interface LayoutProps {
  config: Config;
  currentSlug: string;
}

export const Layout: React.FC<LayoutProps> = ({ config, currentSlug }) => {
  const cleanCurrentSlug = currentSlug.startsWith("/")
    ? currentSlug
    : "/" + currentSlug;
  const { Link, Loading, RenderError } = config.components;
  const [showCode, setVisibility] = useState(false);
  const foundPage = config.pages.find((page) => page.slug === cleanCurrentSlug);

  if (!foundPage) {
    throw Error(`did not find page with slug ${currentSlug}`);
  }

  const currentPage = foundPage;
  const currentIndex = config.pages.findIndex((page) => page === currentPage);
  const [Page, loading, error] = useLoadPage(
    currentPage.loadPage as Promise<DemoPage>
  );
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pageTinaConfig: TinaCMSConfig = Page?.tinaConfig || {};
  const cms = new TinaCMS({
    ...config.tinaConfig,
    ...pageTinaConfig,
  });

  const ErrorHandler = (RenderError || ErrorRenderer) as React.FC<
    React.PropsWithChildren<any>
  >;
  const errorMessage = error?.message || JSON.stringify(error);

  return (
    <>
      {(loading && Loading && <Loading />) || Loader}
      {errorMessage && <ErrorHandler>{errorMessage}</ErrorHandler>}
      {Page && (
        <TinaProvider cms={cms}>
          <div
            style={{
              marginTop: 40,
              marginBottom: 40,
              paddingLeft: 40,
              paddingRight: 40,
              maxWidth: "px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                gridAutoRows: "minmax(100px, auto)",
              }}
            >
              <div
                style={{
                  gridColumn: "1/4",
                  gridRow: "1",
                }}
              >
                <TextWrapper>
                  <Page.default />
                </TextWrapper>
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
                      <Link to={config.pages[currentIndex - 1].slug}>
                        <Button type="button" className="button is-small">
                          Previous
                        </Button>
                      </Link>
                    )}
                    {config.cmsToggle && (
                      <Button
                        onClick={cms.toggle}
                        type="button"
                        className="button is-small"
                      >
                        Toggle Edit Mode
                      </Button>
                    )}
                    {Page.code && (
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
                      <Link to={config.pages[currentIndex + 1].slug}>
                        <Button type="button" className="button is-small">
                          Next
                        </Button>
                      </Link>
                    )}
                  </div>
                  <Code show={showCode}>
                    {typeof Page.code == "undefined"
                      ? ""
                      : Page.code.toString() || ""}
                  </Code>
                </div>
              </div>

              <div
                style={{
                  gridColumn: "4/5",
                  gridRow: "1",
                }}
              >
                {config.labels?.tableOfContentsTitle || "Table of Contents"}
                <ol style={{ marginTop: 20 }}>
                  {config.pages.map((page) => {
                    return (
                      <NavItem
                        active={page.slug === currentPage.slug}
                        key={page.slug}
                      >
                        <Link to={page.slug}>
                          <li>{page.label}</li>
                        </Link>
                      </NavItem>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </TinaProvider>
      )}
    </>
  );
};

/*
 * STYLES --------------------------------------------------------------
 */

export const DocGridToc = styled.div`
  grid-area: toc;
  width: 100%;

  @media (min-width: 830px) {
    padding-top: 4.5rem;
  }
`;

export default Layout;
