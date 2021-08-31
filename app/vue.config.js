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
    entry: "./src/main.ts",
    devtool: 'source-map',
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/, // 位于node_modules中的模块做代码分割
            priority: -10, // 根据优先级决定打包到哪个组里，例如一个 node_modules 中的模块进行代码
            filename :"vendor.js"
          }, // 分割，，既满足 vendors，又满足 default，那么根据优先级会打包到 vendors 组中。
          default: { // 没有 test 表明所有的模块都能进入 default 组，但是注意它的优先级较低。
            priority: -20, //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
            reuseExistingChunk: true // //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: true,
      }),
    ]
  }
}
