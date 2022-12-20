const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'; // 是否是开发模式

module.exports = {
  // 单入口
  // entry: path.join(__dirname, '../src/index.tsx'), // 入口文件配置
  // 多入口
  // entry: {
  //   pageOne: './src/pageOne/index.js',
  //   pageTwo: './src/pageTwo/index.js',
  // }
  // 多入口的也是一个出口配置
  output: {
    filename: '[name].[chunkhash:8].js', //定义输出文件名字
    path: path.join(__dirname, '../lib'),
    clean: true, // 相当于webpack4中 clean-webpack-plugin,
    library: 'lib',
    libraryTarget: 'umd'
  },
  // cache: {
  //   type: 'filesystem' // 使用文件缓存
  // },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')], // 缩小loader作用范围，不处理nodule_module
        test: /.(ts|tsx)$/, // 匹配ts/tsx文件
        // 将 thread-loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行; 不支持抽离css
        use: ['thread-loader', 'babel-loader']
      },
      // 把css和less匹配规则分开
      {
        test: /.(css)$/,
        // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
        // css-loader: 解析css文件代码
        // postcss-loader: 兼容一些低版本浏览器,需要给css3加前缀
        // 开发环境使用style-looader,打包模式抽离css
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /.(less)$/,
        // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
        // css-loader: 解析css文件代码
        // less-loader要求安装less
        // postcss-loader: 兼容一些低版本浏览器,需要给css3加前缀
        // 开发环境使用style-looader,打包模式抽离css
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片，使用内置asset-module模块进行处理
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb将会视为 inline 模块类型，否则会被视为 resource 模块类型。
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]' // 文件输出路径和命名
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb将会视为 inline 模块类型，否则会被视为 resource 模块类型。
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 文件输出路径和命名
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb将会视为 inline 模块类型，否则会被视为 resource 模块类型。
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]' // 文件输出路径和命名
        }
      }
    ]
  },
  resolve: {
    // 主要是用来解决引入文件不配后缀的情况，从左到右
    extensions: ['.js', '.tsx', '.ts'],
    // 给路径配置别名
    alias: {
      '@': path.join(__dirname, '../src')
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]
};
