import { NavItem } from "../NavItem";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Config, Page } from "../DocsLayout";
// import RightArrowSvg from "../../public/svg/right-arrow.svg";

interface TocProps {
  config: Config;
  currentPage: Page;
}

const Toc = ({ config, currentPage }: TocProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { Link } = config.components;

  if (!config) {
    return null;
  }

  return (
    <TocWrapper>
      <TocButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{isOpen ? "Hide" : "Show"} Table of Contents</span>{" "}
        {/* <RightArrowSvg /> */}
        {">"}
      </TocButton>
      <TocContent isOpen={isOpen}>
        <TocDesktopHeader>Table of Contents</TocDesktopHeader>
        <ListUL>
          {config.pages.map((page) => {
            return (
              <NavItem active={page.slug === currentPage.slug} key={page.slug}>
                <Link to={page.slug}>{page.label}</Link>
              </NavItem>
            );
          })}
        </ListUL>
      </TocContent>
    </TocWrapper>
  );
};
export default Toc;

const ListUL = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const TocDesktopHeader = styled.span`
  display: none;
  font-size: 1rem;
  color: var(--color-secondary);
  opacity: 0.5;
  background: transparent;
  line-height: 1;
  margin-bottom: 1.125rem;

  @media (min-width: 830px) {
    display: block;
  }
`;

const TocWrapper = styled.div`
  margin-bottom: -0.375rem;
  flex: 0 0 auto;

  @media (min-width: 830px) {
    position: sticky;
    top: 1.5rem;
  }
`;

const TocButton = styled.button<{ isOpen: boolean }>`
  display: block;
  padding: 0;
  outline: none;
  border: none;
  color: var(--color-secondary);
  opacity: 0.65;
  background: transparent;
  cursor: pointer;
  transition: opacity 185ms ease-out;
  display: flex;
  align-items: center;
  line-height: 1;
  margin-bottom: 1.125rem;

  span {
    margin-right: 0.5rem;
  }

  svg {
    position: relative;
    width: 1.25rem;
    height: auto;
    fill: var(--color-grey);
    transform-origin: 50% 50%;
    transition: opacity 180ms ease-out, transform 180ms ease-out;
    opacity: 0.5;
  }

  :hover,
  :focus {
    opacity: 1;

    svg {
      opacity: 1;
    }
  }

  ${(props) =>
    props.isOpen
      ? css`
          color: var(--color-primary);

          svg {
            transform: rotate(90deg);
            opacity: 1;
          }
        `
      : ``};

  @media (min-width: 830px) {
    display: none;
  }
`;

interface TocContentProps {
  isOpen: boolean;
}

const TocContent = styled.div<TocContentProps>`
  display: block;
  width: 100%;
  line-height: 1.25;
  height: auto;
  max-height: 0;
  overflow: hidden;
  transition: all 400ms ease-out;

  ${(props) =>
    props.isOpen
      ? css`
          transition: all 750ms ease-in;
          max-height: 1500px;
        `
      : ``};

  @media (min-width: 830px) {
    max-height: none;
  }

  /* Top Level Styles */
  a {
    color: inherit !important;
    text-decoration-color: inherit !important;
    text-decoration: !important;
  }
  /* Hide underline except on hover or focus */
  a {
    :not(:focus) {
      :not(:hover) {
        text-decoration-color: transparent !important;
      }
    }
  }

  /* Nested Styles */
  ul {
    ul {
      padding: 0.125rem 0 0.125rem 0.75rem;

      li {
        padding: 0.25rem 1.5rem 0.25rem 0;

        &:last-child {
          padding-bottom: 0rem;
        }
      }

      a {
        font-size: 0.9375rem;
        font-family: var(--font-primary);
      }
    }
  }
`;
