import React, { useState } from "react";
import { TinaCMS, TinaCMSConfig, TinaProvider } from "tinacms";
import { Button } from "@tinacms/styles";
import { useLoadPage } from "../hooks";
import { CodeBlock } from "./CodeBlock";
import Loader from "./Loader";
import ErrorRenderer from "./ErrorRenderer";
import styled, { css } from "styled-components";
import { DocsTextWrapper, GlobalStyle } from "./tinaioStyles/DocsTextWrapper";
import Toc from "./tinaioStyles/toc";

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
        <>
          <GlobalStyle />
          <TinaProvider cms={cms}>
            <DocsLayout>
              <DocsGrid>
                <DocGridToc>
                  <Toc config={config} currentPage={currentPage} />
                </DocGridToc>
                <DocGridContent>
                  <DocsTextWrapper>
                    <Page.default />
                  </DocsTextWrapper>

                  {/* {(props.prevPage?.slug !== null ||
                        props.nextPage?.slug !== null) && (
                        <DocsPagination
                          prevPage={props.prevPage}
                          nextPage={props.nextPage}
                        />
                      )} */}
                </DocGridContent>
              </DocsGrid>
            </DocsLayout>

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
            {showCode && (
              <CodeBlock className="js">
                {typeof Page.code == "undefined"
                  ? ""
                  : Page.code.toString() || ""}
              </CodeBlock>
            )}
          </TinaProvider>
        </>
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
interface DocsLayoutProps {
  children: any;
}
const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <>
      <DocsLayoutDiv>{children}</DocsLayoutDiv>
    </>
  );
};
const Overlay = styled.div<Overlay>`
  pointer-events: none;
  display: block;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-secondary);
  transition: all 180ms ease-out;
  opacity: 0;
  z-index: 1200;

  ${(props) =>
    props.open &&
    css`
      opacity: 0.7;
      pointer-events: all;
    `};
`;
const DocsLayoutDiv = styled.div`
  @media (min-width: 1200px) {
    position: relative;
    padding: 0 0 0 16rem;

    ${Overlay} {
      display: none;
    }
  }
`;

interface Overlay {
  open: boolean;
}

export const DocsGrid = styled.div`
  display: grid;
  width: 100%;
  position: relative;
  grid-auto-columns: minmax(1.5rem, 4rem) minmax(280px, 768px)
    minmax(1.5rem, 4rem);
  grid-template-areas:
    ". header ."
    ". toc ."
    ". content .";
  padding-top: 2rem;
  padding-bottom: 3rem;

  @media (min-width: 830px) {
    grid-template-areas:
      ". header header ."
      ". content toc .";
    margin: 0 auto;
    grid-auto-columns: minmax(2rem, auto) fit-content(768px) 240px
      minmax(0, auto);
    grid-column-gap: 2rem;
  }

  @media (min-width: 1600px) {
    grid-auto-columns: auto 768px 330px auto;
    grid-column-gap: 3rem;
  }
`;

export const DocGridHeader = styled.div`
  grid-area: header;
  width: 100%;

  @media (min-width: 830px) {
    max-width: none;
  }
`;

export const DocGridContent = styled.div`
  grid-area: content;
  width: 100%;
`;

export const DocsPageTitle = styled.h1`
  font-size: 2rem;
  line-height: 1.3;
  letter-spacing: 0.1px;
  color: var(--color-primary);
  position: relative;
  font-family: var(--font-tuner);
  font-style: normal;

  @media (max-width: 1199px) {
    margin: 0 0 1.25rem 0 !important;
  }
`;

export const DocsNavToggle = styled.div`
  position: fixed;
  margin-top: 1.25rem;
  left: 1rem;
  z-index: 500;

  @media (min-width: 999px) {
    display: none;
  }
`;

export default Layout;
