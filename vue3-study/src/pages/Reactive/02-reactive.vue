<template>
  <div>
    <h3>reactive创建响应式数据</h3>
    <p>count值--》 {{ count }}</p>
    <button @click="count += 1">+1</button>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  setup () {
    // 创建一个响应式的数据， 类似于 vue2中的data
    const state = reactive({ count: 0 })
    console.log(state)
    state.count++
    console.log(state)
    // 要在 template中使用响应式对象，就返回state
    return state
  }
}
</script>

<style>
</style>