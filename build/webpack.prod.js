const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseConfig, {
  // 生产模式。自动包含UglifyJsPlugin、optimize.ModuleConcatenationPlugin、NoEmitOnErrorsPlugin插件,默认开启tree-shaking
  // ModuleConcatenationPlugin： 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度
  // NoEmitOnErrorsPlugin： 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
  entry: path.join(__dirname, '../src/index.ts'), // 入口文件配置
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'] // 删除console.log
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        // 提取node_modules代码
        vendors: {
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1 // 提取优先级为1
        },
        // 提取页面公共代码
        commons: {
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0 // 提取代码体积大于0就提取出来
        }
      }
    }
  }
});
