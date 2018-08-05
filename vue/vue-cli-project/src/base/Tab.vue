<template>
	<div class="footer">
		<router-link to="/home">
			<i class="iconfont icon-69"></i>
			<span>首页</span>
		</router-link>
		<router-link to="/list">
			<i class="iconfont icon-liebiao"></i>
			<span>列表</span>
		</router-link>
		<router-link to="/add">
			<i class="iconfont icon-add"></i>
			<span>添加</span></router-link>
		<router-link to="/collection">
			<i class="iconfont icon-shoucang"></i>
			<span>收藏</span></router-link>
	</div>
</template>
<!--
	下面想要4个等分的，可以使用百分比布局，flex布局
	
	display: flex;
	flex-direction: row/colum;  flex的方向，默认横向
	justify-content: center;  垂直居中
	align-item: center;	// 水平居中
	flex: 1; 	每份占1
	
	router-link-exact-active  /home 和点击的/home匹配上，就会用这个
	router-link-active		/home 和 /home/a 这个能够匹配上 
-->
<style scoped lang="less">
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 50px;
		display: flex;
		border-top: 1px solid #CCC;
			a {
				display: flex;
				flex-direction: column;
				flex: 1;
				align-items: center;
				justify-content: center;
				color: #008000;
			}
			a.router-link-active {
				color: red;
			}
	}
</style>