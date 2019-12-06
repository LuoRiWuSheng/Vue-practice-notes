/**
 * 添加全局方法或属性
 */

export default {
  install(Vue, options) {
    Vue.$xia = '你好'

    Vue.say = ()=> {
      return 'hello'
    }
  }
}