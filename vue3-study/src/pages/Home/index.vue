<template>
  <div>
    <a-layout>
      <a-layout-sider class="app-left">
        <Sidebar></Sidebar>
      </a-layout-sider>
      <a-layout class="app-main">
        <AppMain></AppMain>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar'
import AppMain from '../../components/AppMain'

export default {
  components: {
    Sidebar,
    AppMain
  }
}
</script>

<style lang='less' scoped>
.app-left {
  height: 100vh;
}
</style>