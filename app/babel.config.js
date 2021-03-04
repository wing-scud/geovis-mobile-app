const path = require("path");
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  exclude: [path.resolve("src/geovis/common/*/**")]
};
