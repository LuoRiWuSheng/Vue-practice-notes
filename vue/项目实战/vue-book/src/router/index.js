import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Add from '@/components/Add'
import Collection from '@/components/Collection'
import List from '@/components/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/add',
        component: Add
    },
    {
      path: '/collection',
      component: Collection
    },
    {
      path: '/list',
      component: List
    }
  ]
})
