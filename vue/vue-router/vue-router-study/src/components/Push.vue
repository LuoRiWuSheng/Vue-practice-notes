<template>
	<div>
		<h3>这个示例演示怎么手动控制跳转路由</h3>
		<button @click="go">跳转到首页</button> <br>
		<button @click='go2'>传入对象的方式--直接指定path</button> <br>
		<button @click='go3'>带查询参数和普通参数</button> <br>
	</div>
</template>

<script>
	export default {
		name: 'Push',
		methods: {
			// 简单粗暴，直接传入字符串--路由地址的字符串
			go() {
				this.$router.push("/")
			},
			// 传入对象
			go2() {
				this.$router.push({
					path: 'list'
				})
			},
			// 命名的路由
			go3() {
				this.$router.push({
					name: 'foo',
					params: {p: '测试参数'},
					query: {pageSize: 10} // 带查询  参数 地址栏会变成 /foo/p=测试参数?pageSize=10
				})
			}
		}
	}
</script>
<style scoped>
	button {
		margin-bottom: 20px;
	}
</style>