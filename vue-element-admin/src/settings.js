module.exports = {
  title: 'Vue Element Admin',

  /**
   * @type {Boolean} true | false
   * @description 在右侧是否显示设置面板
   */
  showSettings: true,

  /**
   * @type {Boolean} true | false
   * @description 是否显示tags快速访问组件
   */
  tagsView: true,

  /**
   * @type {Boolean} true | false
   * @description 是否固定头部
   */
  fixedHeader: false,

  /**
   * @type {Boolean} true | false
   * @description 是否在左侧导航栏显示Logo
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 显示错误日志组件,默认情况下是在生产环境开启，如果需要在开发环境开启，则传入数组
   */
  errorLog: 'production'
}
