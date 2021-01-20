declare module "@next/mdx";

declare module "*.mdx" {
  let MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
}

declare module "*.svg" {}
