<template>
  <div id="app">
      <router-view></router-view>
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
</style>
