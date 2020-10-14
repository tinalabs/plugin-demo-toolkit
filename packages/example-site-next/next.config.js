const path = require("path");
console.log('running config')
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
};

module.exports = config;