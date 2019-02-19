const path = require("path")
// 前提是 npm install vue-loader
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpack = require("webpack")
// 将非js代码打包成单独的文件--下面这个插件不支持hash打包，所以放弃
const ExtractPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const isDev = process.env.NODE_ENV === "development"


let config = {
    target: "web",
    mode: "development",
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/",
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
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader","css-loader"]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
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
        // 注意这里清除目录，一定要传入参数，清除哪个目录
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            title: "todoList", // 网页标题
            favicon: '',
            filename: "index.html"
        })
        
    ]
}

if(isDev) {
    // 开发环境配置
    config.module.rules.push({
        test: /\.styl(us)?$/,
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
    })

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
    }

    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
} else {
    // 正式环境的配置
    config.entry = {
        app: path.join(__dirname, "src/index.js"),
        vendor: ["vue", "vue-router"] // 将经常变动的类库框架，单独打包，浏览器能够缓存这个，业务代码可能经常动，所以，浏览器的缓存作用就小一些
    }
    // chunkhash:8 8表示hash的长度
    config.output.filename = '[name].[chunkhash:8].js'

    config.module.rules.push({
        test: /\.styl(us)?$/,
        use: ExtractPlugin.extract({
            fallback: "style-loader",
            use: [
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                },
                "stylus-loader"
            ]
        })
        // use: [
        //     MiniCssExtractPlugin.loader,
        //     {
        //         loader: "postcss-loader",
        //         options: {
        //             sourceMap: true
        //         }
        //     },
        //     "stylus-loader"
        // ]
    })

    config.plugins.push(
        new ExtractPlugin("style.[chunkhash:8].css"),
        // webpack4.X移除了CommonsChunkPlugin插件分离代码，采用optimization
        /*new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        })*/
        // new MiniCssExtractPlugin({
        //     filename: '[name].[chunkhash:8].css',
        //     chunkFilename: '[id].[hash].css'
        // })
    )
    config.optimization = {
        splitChunks: {
            name: "vendor"
        },
        runtimeChunk: true
    }
}

module.exports = config