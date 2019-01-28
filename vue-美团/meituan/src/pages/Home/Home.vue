<template>
    <div class="home">
        home页面
        <!-- 导航 -->
        <Daohang></Daohang>
        <!-- 轮播 -->
        <Lunbo></Lunbo>
        <!-- 栏目 -->
        <Lanmu></Lanmu>
        <!-- 广告 -->
        <Ad></Ad>
        <!-- 商品 -->
        <Shop></Shop>
        <div class="mb56"></div>
    </div>
    
</template>

<script>
import Daohang from "./Daohang"
import Lunbo from "./Lunbo"
import Lanmu from "./Lanmu"
import Ad from "./Ad"
import Shop from "./Shop"

export default {
    components: {
        Daohang,
        Lunbo,
        Lanmu,
        Ad,
        Shop
    }
}
</script>

<style scoped>
.mb56 {
    margin-bottom: .56rem;
}
.home {
    height: 640px;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
}
</style>


