const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        hot: true

    },
    plugins: [
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            template: path.join(__dirname, 'index.html'),  //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html'   //指定生成页面的名称
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [ // 就是这些 非 JS 文件 和 loader 之间的对应关系
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 创建处理 css 文件的 loader 匹配规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 配置处理less文件的规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置 处理 scss 文件的规则
            {
                test: /\.jpg|png|gif|bmp$/, use: [{
                    loader:'file-loader',
                    options:{
                        esModule: false
                    }
                }],
            }, // 配置 处理 样式表中图片的 loader规则
            // 可以使用?给 url-loader传递参数，其中，有一个固定的参数，叫做 limit，表示图片的大小，需要给定一个 数值；
            // limit 给定的这个数值，是 图片的大小，单位是 Byte（字节）'url-loader?limit=7631&name=[hash:8]-[name].[ext]'
            // 如果指定了 limit 参数，则只有图片的大小，小于给定的 值时候，才会转为base64格式的图片；否则，就不转换；
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 添加转换JS文件的loader，其中，必须把 node_modules 目录设置为 排除项，这样，在打包的时候，会忽略node_modules 目录下的所有JS文件；否则项目运行不起来！
            { test: /\.vue$/, use: 'vue-loader' }, // 解析Vue组件的第三方loader
            { test: /\.ttf|woff|woff2|eot|svg$/, use: 'url-loader' }, // 处理 样式中字体文件路径的问题
        ]
    }
}
