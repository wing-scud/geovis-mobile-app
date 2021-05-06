// vue.config.js
const path = require("path");
module.exports = {
  publicPath: "./",
  outputDir: "../www/",
  productionSourceMap:false,
  // assetsDir: "static",
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/geovis/common/scss/style.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@$", path.join(__dirname, "src")).set("@geovis", path.join(__dirname, "src/geovis"));
    config.module.rule("js").set("exclude", item => item.search("geovis/common") > -1);
  },
  configureWebpack: {
    // entry: "./src/main.js",
    devtool: "source-map",
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
};
