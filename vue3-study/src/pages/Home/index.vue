<template>
  <div>
    <a-layout>
      <a-layout-sider class="app-left">
        <NavLeft></NavLeft>
      </a-layout-sider>
      <a-layout class="app-main">
        <AppMain></AppMain>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import NavLeft from '../../components/NavLeft'
import AppMain from '../../components/AppMain'

export default {
  components: {
    NavLeft,
    AppMain
  }
}
</script>

<style lang='less' scoped>
.app-left {
  height: 100vh;
  overflow-y: auto;
}
.app-main {
  height: 100vh;
  overflow-y: auto;
}
</style>