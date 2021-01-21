import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
});

export function configureNext(config: any) {
  config.pageExtensions = ["js", "jsx", "ts", "tsx", "md", "mdx"];

  return withMDX(config);
}
