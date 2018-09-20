<template>
    <aside class='sildebar' :class="{'sidebar-hide': !openNav}">
        <vue-scroll>
            <el-menu :default-active='$route.path' class='sildebar-menu' :collapse='!openNav' @select='menuSelect' :collapse-transition='false'>
                <template v-for='(level1, index1) in $router.options.routes' v-if='level1.menu'>
                    <!-- 一级菜单 -->
                    <el-menu-item :index='level1.children[0].path' :key='index1' v-if='level1.children.length === 1 && permissions.includes(level1.children[0].path)'>
                        <i :class='level1.children[0].icon'></i>
                        <span slot='title'>{{level1.children[0].name}}</span>
                    </el-menu-item>
                    <!-- 二级菜单 -->
                    <el-submenu :index="index1+''" v-if='level1.children.length > 1' :key="index1+''">
                        <template slot='title'>
                            <i :class='level1.icon'></i>
                            <span> {{level1.name}}</span>
                        </template>
                        <template v-for='(level2, index2) in level1.children'>
                            <el-menu-item :key="index1+'-'+index2" v-if='!level2.children && permissions.includes(level2.path)' :index='level2.path'>
                                {{level2.name}}
                            </el-menu-item>
                            <!-- 三级菜单 -->
                            <el-submenu :index="index1+'-'+index2" v-if='level2.children' :key="index1+'-'+index2">
                                <template slot='title'>
                                    <i :class='level2.icon'></i>
                                    {{level2.name}}
                                </template>
                                <el-menu-item v-for='(level3, index3) in level2.children' :key="index1+'-'+index2+'-'+index3" :index='level3.path' v-if='permissions.includes(level3.path)'>
                                    {{level3.name}}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </vue-scroll>
    </aside>
</template>

<script>
export default {
    name: 'TheLayoutSidebar',
    props: ['openNav'],
    data () {
        let user_info =
            JSON.parse(sessionStorage.getItem('user-info')).permissions || []
        let permissions = []

        user_info.forEach(p => {
            permissions.push(p.path)
        })
        return {
            permissions
        }
    },
    methods: {
        menuSelect (index) {
            this.$router.push(index)
        }
    }
}
</script>

<style scoped lang='scss'>
.sildebar {
    width: 240px;
    height: 100%;
    border-right: 1px solid #e6e6e6;
    .sildebar-menu {
        border: none;
    }
}
.sidebar-hide {
    width: 65px;
}
</style>
