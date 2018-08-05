<template>
	<div id="app">
		<transition name="fadeIn">
            <!-- 需要缓存的 -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="fadeIn">
            <!-- 正常的访问 走下面 -->
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
		<Tab></Tab>
	</div>
</template>

<script>
	import Tab from "./base/Tab";
	
	export default {
		name: 'App',
		components: {
			Tab
		}
	}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
a {
	text-decoration: none;
}
ul,li {
	list-style: none;
	padding: 0;
}
input,button {
	/*去掉input和button默认样式，下面的appearance会自动加浏览器前缀*/
	appearance: none;
}
.content {
	position: fixed;
	top: 40px;
	bottom: 50px;
	width: 100%;
	overflow: auto;
}

/*动画*/
.fadeIn-enter {
    opacity: 0;
}
.fadeIn-enter-active {
    transition: all 0.3s linear;
}
.fadeIn-leave-active {
    transition: all 0.3s linear;
    opacity: 0;
}
</style>