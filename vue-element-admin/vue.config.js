const path = require('path')
const chalk = require('chalk')
const defaultSettings = require('./src/settings')
const log = console.log

function resolve (dir) {
  return path.join(__dirname, dir)
}

// 页面标题
const name = defaultSettings.name || 'vue element admin'

// 设置开发环境端口
const port = process.env.port || process.env.npm_config_port || 8080

log(chalk.red('当前环境-->', process.env.NODE_ENV))

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port,
    open: true,
    // 将编译过程的错误显示在浏览器控制台
    overlay: {
      warnings: false,
      errors: true
    },
    // 在开发环境启动mock接口服务--这也是一个后台服务
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // 这个name会被加载到index.html的document.title上
    name: name
  },
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // 设置svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // 配置devtool
    config
      .when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

    // 去掉元素之间空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 设置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
  }
}
