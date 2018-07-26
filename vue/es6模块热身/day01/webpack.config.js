const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./main.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname,"dist")
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader","css-loader"]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				// 使用url-loader 就会将图片转换成base64,8912字节=8k以下，转base64,其他情况输出图片
				use: ["url-loader?limit=8912"]
			},
			{
				test: /\.less$/,
				use: ["style-loader","css-loader","less-loader"]
			}
		]
	},
	plugins: [
		
		//new CleanWebpackPlugin(["dist"])
	
	]
}
