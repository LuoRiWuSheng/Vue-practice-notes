## 慕课网-TodoList 开发

涉及内容

- webpack + vue

>   在package.json中配置的webpack运行脚本是跑的本地webpack，而不是全局的，避免版本不一致导致不能run

> 针对文件的处理

**css类型**

>   安装 vue-style-loader css-loader

**图片文件类型**

>   安装 url-loader ，而url-loader依赖file-loader  所以 安装顺序是 npm i file-loader url-loader

**webpack-dev-server**

**html-webpack-plugin**


**cross-env**

为了解决不同平台下，设置的环境变量的方式不同，使用cross-env包，统一

安装的packages

npm i postcss-loader autoprefixer  babel-cli babel-preset-env  babel-core babel-plugin-transform-vue-jsx --save-dev

针对jsx的文件使用babel-loader进行编译， 在webapck.config.js中配置


在项目根目录创建
    postcss.config.js
    .babelic

## 分离css

**webpack.config.js在开发环境的配置**
```js
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
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: "file-loader",
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
```

1、分离CSS
```js
    npm run build
```
发现css还是在js中动态加载的，要分离成单个的css文件，修改部分配置如下

安装包
```js
npm install extract-text-webpack-plugin@next --save-dev
// 重新build
npm run build
```