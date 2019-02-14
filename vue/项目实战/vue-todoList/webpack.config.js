const path = require("path")
// 前提是 npm install vue-loader
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpack = require("webpack")

const isDev = process.env.NODE_ENV === "development"


let config = {
    target: "web",
    mode: "development",
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader","css-loader"]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    "css-loader", 
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, 
                    "stylus-loader"
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10*1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 引入一下webpack包
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        // 确保引入了这个插件
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
}

if(isDev) {
    config.devtool = "#cheap-module-eval-source-map"
    config.devServer = {
        contentBase: path.join(__dirname, "dist"),
        // 因为devServer是会起一个服务，所以需要一个端口
        port: 8000,
        // 好处 ： 1、可以通过127.0.0.0访问 2、可以通过内网ip进行访问，可以在别的电脑上访问本机电脑，调试手机端，可以使用手机连接电脑调试
        //host: '0.0.0.0',
        host: "localhost",
        // 如果在webpack编译的过程报错或者警告，将报错信息直接反馈到网页上，默认是不显示的
        overlay: {
            errors: true
        },
        // 当我们打包后，自动打开浏览器
        open: true,
        // 热加载
        hot: true,
        // 一切服务启用gzip压缩
        compress: true
    },
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
}

module.exports = config