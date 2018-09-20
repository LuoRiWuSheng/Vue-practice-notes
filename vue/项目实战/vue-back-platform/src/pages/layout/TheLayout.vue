<template>
    <el-row class='page'>
        <el-col :span='24' class='page-header'>
            <the-header :open-nav='openNav' @toggle-open='toggleOpen'></the-header>
        </el-col>
        <!-- 主体内容 -->
        <el-col :span='24' class='page-main'>
            <the-sidebar class='page-sidebar' :open-nav='openNav'></the-sidebar>
            <section class='page-content' :class="{'page-content-hide-aside': !openNav}">
                <vue-scroll>
                    <the-main></the-main>
                    <the-footer></the-footer>
                </vue-scroll>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import TheLayoutHeader from './TheLayoutHeader'
import TheLayoutSidebar from './TheLayoutSidebar'
import TheLayoutFooter from './TheLayoutFooter'
import TheLayoutMain from './TheLayoutMain'

export default {
    name: 'TheLayout',
    data () {
        return {
            openNav: true
        }
    },
    methods: {
        toggleOpen () {
            this.openNav = !this.openNav
        }
    },
    components: {
        'the-header': TheLayoutHeader,
        'the-main': TheLayoutMain,
        'the-footer': TheLayoutFooter,
        'the-sidebar': TheLayoutSidebar
    }
}
</script>

<style scoped lang='scss'>
    .page {
        position: relative;
        height: 100%;
        width: 100%;
        .page-main {
            width: 100%;
            height: 100%;
            display: flex;
            // 右侧主体内容
            .page-content {
                position: absolute;
                left: 240px;
                // 一定要加 right: 0 不然右侧无法占满屏幕
                right: 0;
                top: 60px;
                text-align: left;
            }
            .page-content-hide-aside {
                left: 65px;
            }
        }
    }
</style>
