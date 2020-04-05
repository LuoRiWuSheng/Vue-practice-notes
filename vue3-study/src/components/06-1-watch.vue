<template>
  <div>
    <h3> watch 监控 ref创建的响应式数据</h3>
    <ol>
      <li>watch第一个参数是你要监控的对象-属性， 参数2是一个回调(变化后的值currentCount， 变化之前的值-prevCount)=></li>
      <li>watch默认会执行一次，什么都不操作的情况下，那么此时的prevCount就是undefined </li>
      <li>如果我们在watch的回调中，再次设置监控的属性 count, 那么 watch的回调函数会再执行一次</li>
      <li>如果我们不想要watch在组件第一次加载的时候，就执行一次回调，那么 watch(属性， ()=> {...}, {lazy: true}) 设置第三个参数lazy: true即可</li>
    </ol>
    <div>
      <p>count--> {{count}}</p>
      <button @click="add">+1</button>
    </div>
  </div>
</template>

<script>
import {ref, watch} from '@vue/composition-api'
export default {
  setup() {
    let count = ref(0)
    let age = ref(18)

    // watch 监控 ref创建的响应式数据
    watch(count,(currentCount, prevCount)=> {
      console.log(count.value)
      console.log("当前的count值--》", currentCount)
      console.log("count没发生变化的值，前一个值", prevCount)

      // 监控count的值
      if(currentCount>2) {
        alert("当前教师人数已经满了"+ currentCount)
        count.value = 2
      }
    }, {
      lazy: true
    })

    const add = ()=> {
      count.value++
    }

    return {
      count,
      add
    }
  }
}
</script>

<style>

</style>