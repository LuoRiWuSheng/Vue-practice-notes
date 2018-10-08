<template>
	<div class="header">
		<slot>首页</slot>
		<i class="iconfont icon-fanhui1" v-if="back" @click="goback"></i>
	</div>
</template>

<script>
	export default {
		props: {
			back: {
				default: false,
				type: Boolean
			}
			
		},
		methods: {
			goback() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped lang="less">
	.header {
		position: fixed;
		width: 100%;
		height: 40px;
		background: #afb910;
		text-align: center;
		line-height: 40px;
		font-weight: bold;
		
		i {
			position: absolute;
			left: 10px;
			top: 0;
			font-size: 20px;
		}
	}
</style>