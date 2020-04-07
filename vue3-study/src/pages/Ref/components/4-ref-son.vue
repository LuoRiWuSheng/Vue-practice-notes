<template>
  <div>
    <h3>我是子组件</h3>
    <p :style="{color}">{{color}}</p>
    <hr>
  </div>
</template>

<script>
import {ref} from '@vue/composition-api'
export default {
  setup() {
    const color = ref("red")

    const setColor = ()=> {
      color.value = "green"
    }

    return {
      color,
      setColor
    }
  }
}
</script>

<style>

</style>