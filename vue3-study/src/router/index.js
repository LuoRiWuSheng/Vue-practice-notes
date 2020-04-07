import VueRouter from "vue-router"

import Home from '../pages/Home'
import Computed from '../pages/Computed'
import Ref from '../pages/Ref'
import Watch from '../pages/Watch'

import SetUpCom from '../pages/Setup/01.setup'
import ReactiveCom from '../pages/Reactive/02-reactive'

import RefCom from '../pages/Ref/components/03-1-ref'
import RefCom2 from '../pages/Ref/components/03-2-ref'
import RefCom3 from '../pages/Ref/components/03-3-ref'
import RefCom4 from '../pages/Ref/components/03-4-ref'

import ToRefsCom from '../pages/ToRefs/04-toRefs'

import ComputedCom from '../pages/Computed/components/05-1-computed'
import ComputedCom2 from '../pages/Computed/components/05-2-computed'

import WatchCom1 from '../pages/Watch/components/06-1-watch'
import WatchCom2 from '../pages/Watch/components/06-2-watch'
import WatchCom3 from '../pages/Watch/components/06-3-watch'
import WatchEffectCom1 from '../pages/Watch/components/06-1-watchEffect'
import WatchEffectCom2 from '../pages/Watch/components/06-2-watchEffect'
import WatchEffectCom4 from "../pages/Watch/components/06-3-watchEffect-debug"

import Provide from '../pages/Provide'

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
          },{
            path: "4",
            component: RefCom4,
            title: "ref操作DOM,ref操作组件"
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
        title: "watch与watchEffect",
        component: Watch,
        children: [
          {
            path: "1",
            component: WatchCom1,
            title: "watch"
          },
          {
            path: "2",
            component: WatchCom2,
            title: "watch"
          }, {
            path: "3",
            component: WatchCom3,
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
          }, {
            path: "4",
            component: WatchEffectCom4,
            title: "watchEffect4"
          }
        ]
      },
      {
        path: "/provide",
        component: Provide
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

