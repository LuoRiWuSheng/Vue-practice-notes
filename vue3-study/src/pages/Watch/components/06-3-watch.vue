<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="22" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>在 watch 中清除无效的异步任务</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="22" :offset="1">
        <a-card>
          <a-input v-model="userNameRef"></a-input>
          <div>
            下面就直接做了防抖操作，在最后一次异步任务之后才会执行清除操作，之前的一堆无效的异步任务都不管
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {ref, watch} from "@vue/composition-api"
export default {
  setup() {
    let userNameRef = ref("")

    const asyncPrint = val => {
      // 延时 2 秒后打印
      return setTimeout(()=> {
        console.log(val)
      }, 2000)
    }

    // 监控
    watch(userNameRef, (newVal, oldVal, onCleanup)=> {
      // 执行异步任务
      const timerId = asyncPrint(newVal)
      onCleanup(()=> {
        clearTimeout(timerId)
      })
    }, {
      // 第一次watch回调不执行
      lazy: true
    })

    return {
      userNameRef
    }
  }
}
</script>

<style>
</style>