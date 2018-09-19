<template>
    <aside class="sildebar" :class="{'sidebar-hide': !openNav}">
        <vue-scroll>
            <el-menu :default-active="$route.path" class='slidebar-menu' :collapse="!openNav" @select="menuSelect" :collapse-transition="false">
                <template v-for="(level1, index1) in $router.options.routes" v-if='level1.menu'>
                    <!-- 一级菜单 -->
                    <el-menu-item :index='index1.children[0].path' :key="index1">
                        <i :class="leval1.children[0].icon"> 
                        </i>
                         <span slot="title">
                            {{leval1.children[0].name}}
                        </span>
                    </el-menu-item>

                    <el-submenu :index="index1++" v-if="leval1.children.length > 1" :key="index1++">
                        <template slot="title">
                            <i :class="leveal1.icon"></i>
                            <span></span>
                        </template>

                    </el-submenu>
                </template>

            </el-menu>
        </vue-scroll>
    </aside>
</template>
