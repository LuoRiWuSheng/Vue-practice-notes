<template>
  <div>
    <h3>ref创建响应式数据</h3>
    <div>
      <p>ref创建的响应式数据，只能在setup函数中使用</p>
      <p>想要在template中使用，需要返回ref创建的对象</p>
      <p>.value中访问值的方式，只能在setup中使用，在template中直接使用对象，会自动给我们拎出数据</p>
    </div>
    <div>
      <p>count值 {{count}}</p>
      <p>name值--》 {{name}}</p>
    </div>
    <div><button @click="count+=1">+1</button></div>
  </div>
</template>

<script>
import {ref} from '@vue/composition-api'

export default {
  setup() {
    const count = ref(0)
    const name = ref("张三")
    console.log(count)  

    // 访问值，在setup内部，需要使用.value
    count.value ++

    return {
      count,
      name
    }
  } 
}
</script>

<style>

</style>