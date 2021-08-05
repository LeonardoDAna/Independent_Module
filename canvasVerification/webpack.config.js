// webpack 是 node 写法
let path = require('path')
let Htmlwebpackplugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('miniCssExtractPlugin')
module.exports = {
  devServer: { // 开发服务器配置
    port: 3000, // 端口号
    progress: true, // 展示进度条
    contentBase: './build', // 指定目录
    open: true, // 自动打开
  },
  mode: 'development', // 模式  分为两种  prodution development
  entry: './src/index.js', // 入口
  output: {
    // publicPath:'./',
    filename: 'index.js', // 打包后的文件名
    path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径
  },
  plugins: [ // 放着所有的 webpack 插件
    new Htmlwebpackplugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true, // 压缩成一行
      },
      hash: true // 添加hash戳
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: { // 模块
    rules: [ // 规则 css-loader可以解析 @import这种语法的
      // style-loader 是用来把 css 插入到head标签中
      // loader的特点 希望单一
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'less-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        // 注意:use 的别名 是 loaders。下面3个加载的执行顺序是 3 2 1
        use: [
          // 1.不用传递参数可以简写
          'style-loader',
          {
            loader: 'css-loader',
            // 2.给css-loader传递参数
            options: {
              url: true,
              import: true
            }
          },
          // 3.使用sass加载器
          'sass-loader'
        ],
      }
    ]
  }
}
