module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      '@babel/preset-env',
      {
        // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
        // "targets": {
        //  "chrome": 49,
        //  "ie": 9
        // },
        // useBuiltIns共有三个参数：
        // entry: 掉目标浏览器已支持的 polyfilll 模块，不管代码里有没有用到，只要目标浏览器不支持都会引入对应的 polyfilll 模块
        // usage: 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        // 不作任何处理，也不会自动引入 polyfilll 模块,需要注意的是在 webpack 打包文件配置的 entry 中引入的 @babel/polyfill 不会根据 useBuiltIns 配置任何转换处理。
        useBuiltIns: 'usage',
        corejs: 3 // 配置使用core-js使用的版本,版本号看package.json中查看
      }
    ],
    '@babel/preset-typescript'
  ],
  // 支持装饰器语法
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
};
