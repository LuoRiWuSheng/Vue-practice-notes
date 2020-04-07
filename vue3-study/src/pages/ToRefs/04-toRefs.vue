<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="23" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>主页</a-breadcrumb-item>
          <a-breadcrumb-item
            >toRefs将reactive创建的响应式数据转成ref创建的响应式数据</a-breadcrumb-item
          >
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row style="margin-top: 20px; margin-bottom: 20px;">
      <a-col :span="24" :offset="1">
        <a-card>
          <p>count值--》 {{ count }}</p>
          <a-button @click="add">+1</a-button>
        </a-card>
      </a-col></a-row
    >
  </div>
</template>

<script>
import { toRefs, reactive } from '@vue/composition-api'

export default {
  setup () {
    // 使用reactive创建响应式对象
    const state = reactive({ name: "zs", count: 0 })

    console.log(state)

    // 定义处理count的一系列逻辑，这里的add在vue2中应该放在methods中
    const add = () => {
      state.count++
    }

    !((s) => {
      console.log("使用展开运算符，这个就不在具有响应式，就是普通对象了")
      console.log({ ...s })
      console.log("使用toRefs包裹reactive,转成ref响应式，展开的对象仍然是响应式的")
      console.log({ ...toRefs(s) })
    })(state)

    // setup中返回一个对象，供页面使用
    // 这个对象可以包含响应式的数据，也可以包含事件处理函数
    return {
      // 将state对象的每个属性，都变成 ref 形式的响应式数据
      ...toRefs(state),
      add
    }
  }
}
</script>

<style>
</style>