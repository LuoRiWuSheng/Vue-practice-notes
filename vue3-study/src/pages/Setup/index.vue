<template>
  <div>
    <ul>
      <li>beforeCreate---> setup---> created 钩子执行的顺序</li>
    </ul>
  </div>
</template>

<script>
export default {
  // 定义从父组件传过来的参数类型
  props: {
    p1: String
  },
  /* 
    props就是形参，上面定义的 props属性中定义数据类型，一定要定义，下面的setup才能拿到
    context就是vue 2.x中的this
    this.$emit(XXXX)
    vue3 写法就是 context.emit()
  */
  setup (props, context) {
    console.log('setup')
    console.log(props)
    console.log("Vue3中的this")
    console.log(context)
  },
  beforeCreate () {
    console.log(`beforeCreate`)
  },
  created () {
    console.log(`created`)
    console.log(this)
  }
}
</script>

<style>
</style>