<template>
	<div>
		<h3>用户列表</h3>
		获取用户信息： user: {{this.$route.params.id}}
		<br>
		query信息： {{this.$route.query}}
		<br>
		hash信息： {{this.$route.hash}}

		<h3>
			在你切换同路由，不同参数的时候，生命周期的钩子不会被重复触发的，从下面的created中看到，只打印了一次信息，所以，想要通过生命周期钩子做监听是不行的。

			<ol>
				<li>通过watch，在你的组件中对$route进行监听，因为这个$route是会随着组件的切换会改变的</li>
				<li>通过beforeRouteUpdate对路由进行拦截，这是能够判断路由的变化的，因为路由会经过这个函数，再进入页面 </li>
			</ol>

			<b>在使用beforeRouteUpdate做路由拦截的时候，一定要调用next,不然，是不会切换内容的</b> <br>
			<b>从console.log打印出来的顺序可以看到，beforeRouteUpdate是先于watch执行的，created又是先于前面2个执行</b>
		</h3>
	</div>

</template>

<script>
	export default {
		name: 'User',
		created() {
			console.log(this.$route)
		},
		watch: {
			$route(to, from) {
				console.log("---------------下面是监听$route-----------------")
				console.log(to)
				console.log(from)

			}
		},
		beforeRouteUpdate(to, from, next) {
			console.log('通过beforeRouteUpdate监听的，记得一定要调用next,不然页面是不跳转的')
			console.warn(to)
			console.log(from)
			next()
		}
	}	
</script>
