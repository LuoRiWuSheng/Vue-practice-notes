import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 全局注册svg图标
Vue.component('svg-icon', SvgIcon)

// 利用webpack的 require.context 一次性导入svg图标
// 导入svg目录下的所有以.svg结尾的文件，且不会去递归svg子目录(false就是不递归子目录)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
// 因为在main.js中是直接引入 import './icons/index.js 下面的requireAll(req)是将所有的图标都导入
// 等价于在 main.js中import XXX很多svg图标文件
requireAll(req)
