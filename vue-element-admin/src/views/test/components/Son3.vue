<template>
  <div>
    当前的颜色{{color}}
    <div>
      <button @click='toRed'>红色</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['color'],
  methods: {
    toRed() {
      this.$emit('changeToRed', '#ff0000')
    }
  }
}
</script>
