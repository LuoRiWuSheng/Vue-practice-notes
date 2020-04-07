<template>
  <div>
    <hr>
    <h3>孙子组件</h3>
    <h3 :style="{color}">{{color}}</h3>
    <hr>
  </div>
</template>

<script>
import {inject} from '@vue/composition-api'
export default {
  setup() {
    let color = inject("color")

    return {
      color
    }
  }
}
</script>

<style>

</style>