<template>
  <div>
    <h3>watchEffect-监听只读数据源</h3>
    <div>
      <ol>
        <li>
          在组件的setup（）函数或生命周期挂钩期间调用watchEffect，watchEffect的回调会被执行；
          watchEffect在组件销毁unmounted声明周期的时候，自动销毁
        </li>
        <li>
          watchEffect在定义的时候，会返回一个停止监控的回调函数，只要我们自己指定这个函数，watchEffect将被销毁
          const stop= watchEffect(()=>{....})
        </li>
        <li>
          watchEffect函数会有一个onInvalidate参数，这个是一个回调，在下面2种情况下会被调用
          <ol>
            <li>watchEffect重新执行</li>
            <li>组件被卸载，或者主动调用watchEffect返回的清除函数，onInvalidate回调会执行</li>
          </ol>
        </li>
      </ol>
    </div>
    <div>
      <p>count---> {{ count }}</p>
      <button @click="add">+1</button>
      <button @click="stopWatchEffect">主动停止watchEffect监听</button>
    </div>
    <a-button>按钮</a-button>
  </div>
</template>

<script>

import { ref, reactive, watchEffect, toRefs } from "@vue/composition-api"

export default {
  setup () {
    // 创建一个响应式对象
    const state = reactive({ count: 0, name: "sz" })
    console.log(state)

    let stop = watchEffect((onInvalidate) => {
      // 监控 reactive创建的响应式对象的变化
      console.log("执行-watchEffect回调")
      console.log(state.count)

      onInvalidate(() => {
        console.log("onInvalidate--- 在watchEffect回调之前执行")
      })
    })



    // 改变数据源 state对象中的count, 将会触发观察者对象依赖的 copy.count对象
    const add = () => {
      state.count++
    }

    const stopWatchEffect = () => {
      // 如何停止watchEffect, 执行 stop以后，下面state发送改变，watchEffect回调不再执行
      stop()
    }

    return {
      ...toRefs(state),
      add,
      stopWatchEffect
    }
  }
}
</script>

<style>
</style>