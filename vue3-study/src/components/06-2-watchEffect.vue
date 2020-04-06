<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="23" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>watchEffect中操作DOM-onMounted</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="23" :offset="1" style="margin-top: 20px">
        <a-card title="watchEffect执行时机，取决于配置选项flush">
          <ol>
            <li>flush: "post" 默认选项</li>
            <li>flush: 'sync' 同步执行</li>
            <li>flush: "pre" 在组件的生命钩子函数updates之前执行</li>
          </ol>
          <p>
            如果我们希望watchEffect回调， 同步执行，那就传配置flush:
            "sync",如果希望在组件onUpdated钩子之前执行，flush就传 "pre"
          </p>
          <div v-highlight>
            <pre><code v-html="code"></code></pre>
          </div>
          <div>
            num--> {{ num }}
            <a-button @click="num += 1">更新num,查看log</a-button>
          </div>
        </a-card>
        <a-card title="watchEffect操作DOM" style="margin-top: 10px">
          <div id="box" ref="cc">我有一段话</div>
          <a-alert message="下面的onMounted钩子函数中演示了 怎么在生命周期钩子函数中访问DOM， 通过原生js的方式，通过ref的方式，都实现了DOM元素的获取，既然能获取，一定是可以进行其他DOM操作的"></a-alert>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, watchEffect, onMounted, onUpdated, onBeforeUpdate } from "@vue/composition-api"
export default {
  setup (context) {
    let code = ref(null)

    code = `
  console.log("start--")
  watchEffect(()=> {
    console.log("watchEffect--")
  }, {
    flush: "sync"
  })

  console.log("end--")

  // 打印顺序就是
  // start--》watchEffect--》end
`
    let num = ref(1)
    // 演示操作在onMounted钩子中操作DOM, ref中指定的null,并将这个ref return 然后template中使用 ref="同名的cc"
    // 这样就能拿到DOM元素的引用
    let cc = ref(null)

    console.log("start--")
    watchEffect(() => {
      console.log("watchEffect--")
      console.log(num.value)
    }, {
      flush: "pre"
    })

    onMounted(() => {
      console.log("onMounted--钩子")

      watchEffect(() => {
        // 在这里操作DOM
        console.log(document.querySelector("#box").innerHTML)
        console.log("cc-->", cc.value.innerHTML)
      })

    })

    onUpdated(() => {
      console.log("onUpdated")
    })

    onBeforeUpdate(() => {
      console.log("onBeforeUpdate")
    })
    console.log("end--")



    return {
      code,
      num,
      cc
    }
  }
}
</script>

<style>
</style>