<template>
  <section class="app-main">
    <!-- 定义过渡动画 -->
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <!-- 这里添加key 目的是让相同组件，不同应用场景，都能触发组件的重新渲染，使之能触发created和mounted钩子 -->
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  computed: {
    cachedViews () {
      return true
      // return this.$route.state.tagsView.cachedViews
    },
    key () {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.fullPath
    }
  }
}
</script>

<style lang='scss' scoped>
.app-main {
  position: relative;
  width: 100%;
  // navbar高度是50px
  min-height: calc(100vh - 50px);
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50;
}

.hasTagsView {
  .app-main {
    // 84 = navbar高度 + tags -view = 50 + 34
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// 修复cssbug 在打开el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>