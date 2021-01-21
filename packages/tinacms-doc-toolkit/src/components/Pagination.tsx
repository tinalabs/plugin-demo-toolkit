import React from "react";
import styled, { css } from "styled-components";
import { Page } from "./DocsLayout";

interface NextPrevPageProps {
  title: string;
  slug: string;
}

interface PaginationProps {
  prevPage?: Page;
  nextPage?: Page;
  Link: React.FC<{ to: string }>;
}

export function DocsPagination({ prevPage, nextPage, Link }: PaginationProps) {
  return (
    <Wrapper>
      {prevPage && prevPage.slug && (
        <Link to={prevPage.slug}>
          <PaginationLink previous>
            <span>Previous</span>
            <h5>{prevPage.label}</h5>
            <svg
              viewBox="0 0 32 32"
              fill="inherit"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 24.792L12.2654 26L21.4773 17.2061C22.1747 16.5403 22.1737 15.4588 21.4773 14.7939L12.2654 6L11 7.20799L20.2099 16L11 24.792Z" />
            </svg>
          </PaginationLink>
        </Link>
      )}
      {nextPage && nextPage.slug && (
        <Link to={nextPage.slug}>
          <PaginationLink>
            <span>Next</span>
            <h5>{nextPage.label}</h5>
            <svg
              viewBox="0 0 32 32"
              fill="inherit"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 24.792L12.2654 26L21.4773 17.2061C22.1747 16.5403 22.1737 15.4588 21.4773 14.7939L12.2654 6L11 7.20799L20.2099 16L11 24.792Z" />
            </svg>
          </PaginationLink>
        </Link>
      )}
    </Wrapper>
  );
}

export default DocsPagination;

/*
 ** Styles ------------------------------------------
 */

interface PaginationLinkProps {
  previous?: boolean;
}

const PaginationLink = styled.a<PaginationLinkProps>`
  padding: 1rem;
  display: block;
  flex: 1 1 auto;
  font-family: var(--font-tuner);
  font-weight: regular;
  font-style: normal;
  text-decoration: none;
  background-color: #fafafa;
  color: var(--color-secondary);
  position: relative;
  text-align: right;
  padding-right: 3.5rem;
  margin: 0 1px 1px 0;

  span {
    font-size: 0.9375rem;
    text-transform: uppercase;
    opacity: 0.5;
  }

  h5 {
    font-size: 1.25rem;
    line-height: 1.3;
    margin: 0 !important;
    transition: all 180ms ease-out;
  }

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 2rem;
    height: auto;
    fill: var(--color-grey);
    transition: all 180ms ease-out;
  }

  &:hover {
    h5 {
      color: var(--color-primary);
    }
    svg {
      fill: var(--color-primary);
    }
  }

  ${(props) =>
    props.previous &&
    css`
      padding-right: 1rem;
      padding-left: 3.5rem;
      text-align: left;

      svg {
        right: auto;
        left: 0.75rem;
        transform: translate3d(0, -50%, 0) rotate(180deg);
      }
    `};
`;

const Wrapper = styled.div`
  margin-top: 2rem;
  background-color: var(--color-light-dark);
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1px 0 0 1px;
`;
