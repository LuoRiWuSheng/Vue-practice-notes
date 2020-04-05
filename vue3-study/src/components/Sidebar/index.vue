<template>
  <div class="nav-left">
    <h3 class="menu-title">目录</h3>
    <a-menu mode="inline" theme="dark">
      <template v-for="route in routes">
        <a-menu-item v-if="!route.children" :key="route.title">
          <router-link :to="route.path">
            <a-icon type="pie-chart"></a-icon>
            <span>{{ route.title }}</span></router-link>
        </a-menu-item>

        <a-sub-menu v-else :key="route.title">
          <span slot="title">{{ route.title }}</span>
          <template v-for="item in route.children">
            <a-menu-item :key="item.title">
              <router-link :to="item.path">
                <span>{{ item.title }}</span>
                </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import menu from './menu'
export default {
  data () {
    return {
      routes: menu
    }
  },
  mounted () {

  }
}
</script>

<style lang="less">
.nav-left {
  .menu-title {
    color: #fff;
    text-align: center;
  }
}
</style>
<style lang="stylus"></style>