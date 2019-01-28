var path = require("path")

module.exports = {
    build: { // 生产环境
        env: require("./prod.env"),
        index: path.resolve(__dirname, "../dist/index.html"),
        assetsSubDirectory: "static",
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: { // 开发环境
        env: require("./dev.env"),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api/':'http://localhost:8081/'
        },
        cssSourceMap: false
    }

}