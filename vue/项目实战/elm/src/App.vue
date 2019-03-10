<template>
  <div>
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>  
        <transition name="router-fade" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <svgIcon></svgIcon>
  </div>
</template>

<script>
import svgIcon from "./components/common/svg"

export default {
  name: 'app',
  components: {
      svgIcon
  }
}
</script>

<style lang="scss">
    @import "./style/common";
    // 过渡动画的 name
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
</style>
