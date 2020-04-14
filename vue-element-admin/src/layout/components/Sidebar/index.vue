<template>
  <div :class="'has-logo': showLogo">
    <logo v-if="showLogo" :collapse="isCollapse"></logo>
    <el-scrollbar wrap-class='scrollbar-wrapper'>
      <el-menu 
        :default-active='activeMenu'
        :collapse='isCollapse'
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import "@/styles/varaibles.scss";

export default {

}
</script>

<style>

</style>