<template>
	<div>
		<router-link to="/user/张三?name=钩子,age=22#F1">用户列表</router-link>
       	<router-link to='/user/李四'>传李四</router-link>
     	
        <router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'List'
	}
</script>