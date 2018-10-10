<template>
  <div id="app">
      <!--需要缓存的-->
      <transition name="fadeIn">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
      </transition>

      <transition name="fadeIn">
          <!--不需要缓存的-->
          <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>


      <div class="tab">
          <Tab></Tab>
      </div>
  </div>
</template>

<script>
import Tab from '@/base/Tab'

export default {
  name: 'App',
    components: {
      Tab
    }
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    ul, li {
        list-style: none;
    }
    a {
        text-decoration: none;
    }
    input, button {
        appearance: none;
    }

    .content {
        position: fixed;
        top: 40px;
        bottom: 50px;
        width: 100%;
        overflow: auto;
    }

    .fadeIn-enter {
        opacity: 0;
    }
    .fadeIn-enter-active {
        transition: all .3s linear;
    }
    .fadeIn-leave-active {
        transition: all .3s linear;
        opacity: 0;
    }
</style>
