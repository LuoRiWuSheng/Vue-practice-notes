<template>
    <div class="footer">
        <router-link to="/home">
            <i class="iconfont icon-69"></i>首页
        </router-link>
        <router-link to="/list">
            <i class="iconfont icon-liebiao"></i>列表
        </router-link>
        <router-link to="/collection">
            <i class="iconfont icon-shoucang"></i>收藏
        </router-link>
        <router-link to="/add">
            <i class="iconfont icon-add"></i>新增
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'Tab'
    }
</script>
<!--
    flex 布局
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
            justify-content: center; // 垂直居中
            align-items: center; // 水平居中
            flex: 1;
            color: yellowgreen;
        }
        a.router-link-active {
            color: #f90;
        }
    }
</style>
