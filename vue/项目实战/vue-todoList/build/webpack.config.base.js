const path = require("path")
// 前提是 npm install vue-loader
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

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
    }
}

module.exports = config