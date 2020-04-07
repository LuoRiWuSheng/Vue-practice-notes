<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="22" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>Provide, inject达到跨组件传参</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <h2>父组件</h2>
        <a-button @click="c='red'">红</a-button>
        <a-button @click="c='yellow'">黄</a-button>
        <a-button @click="c='green'">绿</a-button>
        <hr />
        <son></son>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, provide } from '@vue/composition-api'
import son from '@/pages/Provide/son'
export default {
  setup () {
    const c = ref("red")
    provide("color", c)

    return {
      c
    }
  },
  components: {
    son
  }
}
</script>

<style>
</style>