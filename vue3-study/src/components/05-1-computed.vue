<template>
  <div>
    <h3>computed函数-只读属性</h3>
    <div>
      <p>refCount值-- {{ refCount }}</p>
      <p>computedCount--> {{ computedCount }}</p>
      <button @click="refCount += 1">加1</button>
      <div>点击加1， 上面的值永远比下面的值大1，因为下面的 computedCount是依赖于 refCount的值</div>
    </div>
    <div>
      <pre>
        computedCount.value = 9
        就会报错
        <div>
          Computed property was assigned to but it has no setter.
          计算属性被定义，但是没有setter，说明这个属性是只读属性，不可写
        </div>
      </pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
export default {
  setup () {
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
      add
    }
  }
}
</script>

<style>
</style>