<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 移动端显示 -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handelClickOutside"
    />

    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />

    <!-- 右侧主体内容 -->
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
import { mapState } from 'vuex'
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    RightPanel,
    AppMain,
    Navbar,
    Settings,
    Sidebar
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: !this.sidebar.opened,
        withoutAnimation: !this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handelClickOutside () {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

// 手机端
.drawer-bg {
  position: absolute;
  top: 0;
  height: 100%;
  background: #000;
  opacity: 0.3;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - #{$sideBarWidth});
  z-index: 9;
  transition: width 0.9s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}
</style>
