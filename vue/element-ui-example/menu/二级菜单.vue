<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="0">父级菜单-0</el-menu-item>
    <el-submenu index="1">
      <span slot="title" index="1">父级菜单-1</span>
      <el-menu-item index="1-1">子菜单-1</el-menu-item>
      <el-menu-item index="1-2">子菜单-2</el-menu-item>
      <el-menu-item index="1-3">子菜单-3</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <span slot="title" index="2-1">父级菜单-2</span>
      <el-menu-item index="2-2">子菜单-1</el-menu-item>
      <el-menu-item index="2-3">子菜单-2</el-menu-item>
      <el-submenu index="2-4">
        <span slot="title">子菜单-3</span>
        <el-menu-item index="2-4-1">三级子菜单-1</el-menu-item>
        <el-menu-item index="2-4-2">三级子菜单-2</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>