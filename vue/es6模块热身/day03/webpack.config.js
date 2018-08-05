const path = require("path");
const HtmlWebpackPlugin  =require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin  =require("vue-loader/lib/plugin");

module.exports = {
	entry: "./src/main.js",
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname,"dist")
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader","css-loader"]
			},
			{
				test: /\.vue$/,
				use: "vue-loader"
			},
			{
				test: /\.less$/,
				use: ["style-loader","css-loader","less-loader"]
			},
			{
				test: /\.(jpg|bmp|png|gif|svg)$/,
				use: "url-loader"
			}
		]
	},
	devtool:"inline-resoure-map",
	plugins: [
		new HtmlWebpackPlugin({ 
			// 自动插入到dist目录下，生成html
			template: "./src/index.html",	// 使用的模版
			//filename: "login.html"	// 放到dist下生成的html文件名，默认是index.html
		}),
		new CleanWebpackPlugin(["dist"]),
		// 引入下面的插件是必须的
		new VueLoaderPlugin()
	],
	mode: "development"
}

