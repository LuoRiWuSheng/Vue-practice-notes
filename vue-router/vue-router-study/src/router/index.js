import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Foo from '@/components/Foo'
import User from '@/components/User'
import List from '@/components/List'

import Nesting from '@/components/Nesting'
import File from '@/components/File'
import Video from '@/components/Video'

import Push from "@/components/Push"

import Base from '@/components/multy/Base'
import Bar from '@/components/multy/Bar'
import Baz from '@/components/multy/Baz'

import Article from '@/components/article'
import ArticleCreate from '@/components/ArticleEdit'
import ArticleEdit from '@/components/ArticleEdit'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/foo/:id?',
		component: Foo,
		name: 'foo'
	},
	{
		path: '/list',
		component: List
	},
	{
		// 动态路径参数
		path: '/user/:id',
		component: User
	},
	// 嵌套路由--start
	{ 
		// 形如  /nesting/:id/file  和/nesting/:id/video 属于嵌套路由
		path: '/nesting/:id?',
		component: Nesting,
		children: [
			{
				path: 'file',
				component: File
			},
			{
				path: 'video',
				component: Video
			}
		]

	},
	// 嵌套路由--end
	// 编程式导航-- start
	{
		path: '/push/:p?',
		component: Push
	},
	// 编程式导航 -- end
	// 命名视图 -- start
	{
		path: '/multy',
		components: {
			default: Base,
			a: Bar, // 这个是router-view 中命名的
			b: Baz
		}
	},
  // 命名视图 -- end
  {
    path: '/article',
    component: Article
  },
  {
    name: '新增文章',
    path: '/article/create',
    component: ArticleCreate
  },
  {
    name: '编辑文章',
    path: '/article/edit',
    component: ArticleEdit
  }
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

export default router