<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="23" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>主页</a-breadcrumb-item>
          <a-breadcrumb-item>computed函数-只读属性</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row style="margin-top: 20px; margin-bottom: 20px;">
      <a-col :span="23" :offset="1">
        <a-card>
          <p>refCount值-- {{ refCount }}</p>
          <p>computedCount--> {{ computedCount }}</p>
          <button @click="refCount += 1">加1</button>
          <div>
            点击加1， 上面的值永远比下面的值大1，因为下面的
            computedCount是依赖于 refCount的值
          </div>
        </a-card>
        <a-col>
          <div v-highlight>
            <pre>
        <code v-html="code"></code>
      </pre>
          </div>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
export default {
  setup () {
    let code = ref(null)
    code.value = `
  computedCount.value = 9
  就会报错
  
  Computed property was assigned to but it has no setter.
  计算属性被定义，但是没有setter，说明这个属性是只读属性，不可写
    `
    const refCount = ref(0)

    const computedCount = computed(() => refCount.value + 1)

    console.log(computedCount)

    let add = () => {
      computedCount.value++
    }
    // 报错 computedCount 是只读属性
    // computedCount.value = 10
    return {
      computedCount,
      refCount,
      add,
      code
    }
  }
}
</script>

<style>
</style>