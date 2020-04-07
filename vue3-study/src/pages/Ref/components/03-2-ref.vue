<template>
  <div>
    <h3>ref中创建的响应式数据在reactive中使用</h3>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
export default {
  setup () {
    // 使用ref创建一个响应式数据
    const count = ref(0)

    // 使用reactive创建
    const state = reactive({
      // 将ref作为属性传给reactive
      count
    })
    console.log(state.count)
    state.count++
    console.log(state.count)
    
    return {
      state
    }
  }
}
</script>

<style>
</style>