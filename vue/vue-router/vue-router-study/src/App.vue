<template>
    <div id="app">
       	<router-link to="/list" class="nav">用户列表</router-link>
       	<router-link to="/foo" class="nav">foo界面</router-link>
		<router-link to="/nesting" class="nav">嵌套路由</router-link>

		<router-link to="/push" class="nav">编程式导航</router-link>
		<router-link to="/multy" class="nav">命名视图</router-link>

       	<router-view class="view one"></router-view>
   		<router-view name='a'></router-view>
		<router-view name='b'></router-view>
	</div>
    </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style scoped>
	.nav {
		display: inline-block;
		font-size: 20px;
		text-decoration: none;
		margin-right: 20px;
		margin-bottom: 60px;
	}
	.router-link-active {
		color: red;
	}
</style>
