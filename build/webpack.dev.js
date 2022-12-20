const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = {};

module.exports = merge(baseConfig, {
  mode: 'development', //开发模式，会省去代码优化步骤，打包速度会比生产环境快
  entry: path.join(__dirname, '../demo/index.js'), // 入口文件配置
  devtool: 'eval-cheap-module-source-map', // Tradeoff choice for development builds. build:slow, rebuild: fast
  devServer: {
    port: 8888,
    compress: false, // 开发环境不开启压缩
    client: {
      progress: true
    },
    hot: true,
    historyApiFallback: true, // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses
    static: {
      directory: path.join(__dirname, '../public') //托管静态资源public文件夹
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../demo/index.html'),
      inject: true
    })
  ]
});
