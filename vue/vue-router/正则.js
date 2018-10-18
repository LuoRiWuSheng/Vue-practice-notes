import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/'
	},
	{
		path: '/params/:foo/:bar'
	},
	{
		// 可选的路由 bar这个位置是可选的
		path: '/optional-params/:foo/:bar?'
	},
	{
		// 后面的参数，id这个位置只能是数字
		path: '/params-with-regex/:id(\\d+)'
	},
	{ 
		// 路由asterisk后面可以接任意内容
		path: '/asterisk/*' 
	},
	{ 
		// 中间这个foo位置参数是可选的
		path: '/optional-group/(foo/)?bar' 
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

new Vue({
	router,
	template: `
		<div id='#app'>
			<ul>
				<li><router-link to="/">/</router-link></li>
				<li><router-link to="/params/foo/bar">/params/foo/bar</router-link></li>
			  	<li><router-link to="/optional-params">/optional-params</router-link></li>
		        <li><router-link to="/optional-params/foo">/optional-params/foo</router-link></li>
		        <li><router-link to="/params-with-regex/123">/params-with-regex/123</router-link></li>
		        <li><router-link to="/params-with-regex/abc">/params-with-regex/abc</router-link></li>
		        <li><router-link to="/asterisk/foo">/asterisk/foo</router-link></li>
		        <li><router-link to="/asterisk/foo/bar">/asterisk/foo/bar</router-link></li>
		        <li><router-link to="/optional-group/bar">/optional-group/bar</router-link></li>
		        <li><router-link to="/optional-group/foo/bar">/optional-group/foo/bar</router-link></li>
			</ul>
			<pre>
				{{ JSON.stringify($route, null, 2) }}
			</pre>
		</div>
	`
})