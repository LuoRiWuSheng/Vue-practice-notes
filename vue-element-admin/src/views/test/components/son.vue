<template>
  <div>
    <button @click="handel">点击</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  methods: {
    handel () {
      // 直接调用父组件的方法
      this.$parent.say()
    }
  }
}
</script>
