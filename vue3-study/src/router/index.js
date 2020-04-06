import VueRouter from "vue-router"

import Home from '../pages/Home'
import Computed from '../pages/Computed'
import Ref from '../pages/Ref'
import Watch from '../pages/Watch'

import SetUpCom from '../components/01.setup'
import ReactiveCom from '../components/02-reactive'

import RefCom from '../components/03-1-ref'
import RefCom2 from '../components/03-2-ref'
import RefCom3 from '../components/03-3-ref'
import ToRefsCom from '../components/04-toRefs'
import ComputedCom from '../components/05-1-computed'
import ComputedCom2 from '../components/05-2-computed'
import WatchCom2 from '../components/06-2-watch'
import WatchEffectCom1 from '../components/06-1-watchEffect'
import WatchEffectCom2 from '../components/06-2-watchEffect'

export const routes = [
  {
    path: "/",
    title: "首页",
    component: Home,
    children: [
      {
        path: "/setup",
        title: "setup",
        component: SetUpCom
      },
      {
        path: "/reactive",
        title: "reactive",
        component: ReactiveCom
      },
      {
        path: "/ref",
        title: "ref",
        component: Ref,
        children: [
          {
            path: "1",
            component: RefCom,
            title: "ref创建响应式数据"
          },
          {
            path: "2",
            component: RefCom2,
            title: "ref中创建的响应式数据在reactive中使用"
          },
          {
            path: "3",
            component: RefCom3,
            title: "新ref创建的响应式会覆盖旧创建的ref响应式对象"
          }
        ]
      },
      {
        path: "/torefs",
        component: ToRefsCom,
        title: "toRefs"
      },
      {
        path: "/computed",
        component: Computed,
        children: [
          {
            path: "1",
            component: ComputedCom,
            title: "setup中使用computed函数"
          },
          {
            path: "2",
            component: ComputedCom2,
            title: "setup中使用computed函数-创建可读可写的计算属性"
          }
        ]
      },
      {
        path: "/watch",
        title: "监听数据变化watch与watchEffect",
        component: Watch,
        children: [
          {
            path: "1",
            component: WatchCom2,
            title: "watch"
          }, {
            path: "2",
            component: WatchEffectCom1,
            title: "watchEffect"
          },
          {
            path: "3",
            component: WatchEffectCom2,
            title: "watchEffect3"
          }
        ]
      }
    ]
  },

]

/* let m = routes.map(p=> {
  p.component && delete p.component

  if(p.children) {
    p.children.forEach(i=> {
      delete i.component
      return i
    })
  }
  return p
})

console.log(JSON.stringify(m)) */

const router = new VueRouter({
  routes
})

export default router

