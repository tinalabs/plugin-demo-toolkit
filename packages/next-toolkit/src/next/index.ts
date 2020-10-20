const path = require("path");

const config = {
  webpack(config: any) {
    config.resolve.alias["react"] = path.resolve(
      __dirname,
      "node_modules/react"
    );
    config.resolve.alias["react-dom"] = path.resolve(
      __dirname,
      "node_modules/react-dom"
    );
    return config;
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

export const withDocToolkit = (config: any) => {
  const webpack = (config: any) => {
    let newConfig = { ...config };
    if (config.webpack) {
      newConfig = { ...config, ...config.webpack(config) };
    }
    newConfig.resolve.alias["react"] = path.resolve(
      __dirname,
      "node_modules/react"
    );
    newConfig.resolve.alias["react-dom"] = path.resolve(
      __dirname,
      "node_modules/react-dom"
    );
    return newConfig;
  };
  const newConfig = {
    ...config,
    webpack,
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  };
  return withMDX(newConfig);
};
