const path = require("path")
// 启用热更新的 第2步
const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.join(__dirname,"./src/main.js"), // 设置入口目录
    output: {
        path: path.join(__dirname,"./dist"),     // 设置出口目录
        filename: "bundle.js"                    // 设置输出文件名称
    },
    plugins: [ // 配置插件的节点
        new htmlWebpackPlugin({ // 创建一个 在内存中 生成 HTML  页面的插件
            template: path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
            filename: 'index.html' // 指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader","css-loader"] },
            { test: /\.less$/, use: ["style-loader","css-loader","less-loader"] },
            { test: /\.scss$/, use: ["style-loader","css-loader","sass-loader"] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ["url-loader?limit=28,718&name=[hash:8]-[name].[ext]"] },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
        ]
    },
    resolve:{
        alias:{     // 设置vue被导入时的路径
            "vue$": "vue/dist/vue.js"
        }
    },
    mode: "development",    // 解决多个警告和热加载缓慢

}