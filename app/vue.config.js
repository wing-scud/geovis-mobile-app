// vue.config.js
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  publicPath: "./",
  outputDir: "../www/",
  productionSourceMap: false,
  // assetsDir: "static",
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/geovis/common/scss/style.scss";`
      },
      // less: {
      //   // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
      //   // lessOptions: {
      //   // additionalData: `@import "./src/geovis/common/less/style.less";`,
      //   modifyVars: {
      //     // 直接覆盖变量
      //     'text-color': '#111',
      //     'border-color': '#eee',
      //     // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      //     hack: `true; @import "./src/geovis/common/less/style.less";`,
      //   },
      //   // },
      // }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@$", path.join(__dirname, "src")).set("@geovis", path.join(__dirname, "src/geovis"));
    config.module.rule("js").set("exclude", item => item.search("geovis/common") > -1);
  },
  configureWebpack: {
    // entry: "./src/main.js",
    devtool: 'source-map',
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: true,
      }),
    ]
  }
}
