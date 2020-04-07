<template>
  <div>
    <h3>新的ref会覆盖旧的ref</h3>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'

export default {
  setup () {
    // 第一创建
    const c1 = ref(0)

    // 创建reative
    const state = reactive({
      c1
    })

    // 再使用ref创建一个
    const c2 = ref(10)

    // 使用c2去覆盖c1
    state.c1 = c2

    console.log(state.c1)

    state.c1++

    console.log("reactive中的c1-->",state.c1)

    console.log("c1-->", c1.value)
    console.log("这里的ref中的c2与reactive中的c1是一起变化的")
    console.log("c2-->", c2.value)
  }
}
</script>

<style>
</style>