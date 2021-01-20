const { configureNext } = require("tinacms-doc-toolkit");
const { resolve } = require('path');
const glob = require('glob');

const CONTENT_DIR = resolve(process.cwd(), "content");
const BASE_PATH = process.env.NEXT_BASE_PATH || ""
const ASSET_PREFIX = process.env.NEXT_ASSET_PREFIX || BASE_PATH
const PAGES = glob.sync(`${CONTENT_DIR}/**/*.mdx`)
  .map(pagePath => pagePath
    .replace(CONTENT_DIR, '') // Make relative
    .replace(/\.mdx$/, '') // Remove extension
    .replace(/index$/, '') // Remove trailing index
  );

module.exports = configureNext({
  env: {
    pagePaths: PAGES
  },
  basePath: BASE_PATH,
  assetPrefix: ASSET_PREFIX
})
