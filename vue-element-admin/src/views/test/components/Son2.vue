<template>
  <div>
    <button @click="getCount(2)">子组件调用父组件的方法</button>
    <div>{{ count }}</div>
  </div>
</template>

<script>
export default {
  name: 'Son2',
  props: {
    count: {
      type: Number,
      default: 0
    },
    getCount: {
      type: Function,
      required: true
    }
  }
}
</script>
