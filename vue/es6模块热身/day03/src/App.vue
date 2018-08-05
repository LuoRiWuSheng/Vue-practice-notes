<template>
	<div>
		<router-view></router-view>
		<button @click="show">弹窗组件 vue-notify</button>
	</div>
</template>

<script>
	import Vue from "vue";
	
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			show() {
				this.$notify("吃饭",{delay: 5000});
				// 测试  say是类上的方法，所以只能通过类.方法名调用，这就是上面为啥要引入Vue
				Vue.say();
			}
		},
		computed: {
			
		},
		components: {}
	}
</script>

<style scoped>
</style>