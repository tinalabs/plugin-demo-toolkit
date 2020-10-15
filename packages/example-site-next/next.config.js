const path = require("path");
const config = {
  webpack(config) {
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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
module.exports = withMDX(config)
