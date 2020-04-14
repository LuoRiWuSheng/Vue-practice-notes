<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handelClickOutside"
    />
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 面包屑导航 -->
        <navbar />
        <!-- tags快捷标签 -->
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar } from './components'

export default {
  name: 'layout',
  components: {
    RightPanel,
    AppMain,
    Navbar,
    Settings,
    Sidebar
  },
  data () {
    return {
      device: "",
      sidebar: {
        opened: true
      },
      needTagsView: true,
      classObj: {

      },
      fixedHeader: "",
      showSettings: true
    }
  },
  methods: {
    handelClickOutside () {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
</style>