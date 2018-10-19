<template>
	<div>
		测试嵌套路由--当前是Nesting.vue-- 这是顶层的
		<h2>在地址栏附加的地址为 /nesting/1/file  或者 /nesting/12312/video 观察变化</h2>
		<span>
			形如这样：   http://localhost:8080/#/nesting/2/file
		</span>
	<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'Nesting'
	}
</script>