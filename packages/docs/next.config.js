const { configureNext } = require("tinacms-doc-toolkit");

const BASE_PATH = process.env.NEXT_BASE_PATH || "/"
const ASSET_PREFIX = process.env.NEXT_ASSET_PREFIX || BASE_PATH

module.exports = configureNext({
  basePath: BASE_PATH,
  assetPrefix: ASSET_PREFIX
})
