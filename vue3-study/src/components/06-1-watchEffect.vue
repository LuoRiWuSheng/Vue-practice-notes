<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="23" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>watchEffect-监听只读数据源</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="23" offset="1" style="margin-top:20px">
        <a-card title="watchEffect">
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
                <li>
                  watchEffect重新执行,
                  当回调中的数据发生变化，watchEffect回调函数会重新执行，然后
                  onInvalidate回调也会重新执行
                </li>
                <li>
                  组件被卸载，或者主动调用watchEffect返回的清除函数，onInvalidate回调会执行
                </li>
              </ol>
            </li>
            <li>
              在watchEffect中的回调中注册一个
              onInvalidate回调，而不是在watchEffect的回调中返回一个回调函数，是因为，返回值对异步错误的处理比较重要；
              <p>
                比较常见场景是，我们在副作用函数(指watchEffect回调)中获取异步数据
              </p>
              <a-alert message="注意下面的 name示例demo"></a-alert>
            </li>
            <li>
              watchEffect中的 onInvalidate回调执行时机：
              <ol>
                <li>
                  watchEffect回调第一次触发，是不会让onInvalidate回调执行的，也就是说
                  当watchEffect回调第二次及以后触发，会先去执行
                  onInvalidate回调函数，再执行 watchEffect回调函数
                </li>
              </ol>
            </li>
            <li>
              <a-alert message="watchEffect监控状态的时候，不要将你的状态加上时间戳，否则，watchEffect(回调f1) 的f1将永远执行，将资源耗净"></a-alert>
              <a-alert message="watchEffect中慎用（不要用）setTimeout,效果跟上面的死循环一样，除非 setTiemout更新的状态n次中都一样，没变化，那么vue就不会再更新"></a-alert>

              <div v-highlight>
                <pre><code v-html="code"></code></pre>
              </div>
            </li>
            <li> watchEffect回调第一次执行的时间是在vue声明周期钩子的mounted之前执行，如果想要在watchEffect中访问DOM，template refs等操作，就需要将watchEffect放到生命周期函数onMounted(()=> {回调中}) </li>
          </ol>

          <div>
            <p>count---> {{ count }}</p>
            <a-button @click="add">count +1</a-button>
            <a-button @click="stopWatchEffect"
              >主动停止watchEffect监听</a-button
            >
          </div>
          <a-button>按钮</a-button>
          <div>
            <a-divider></a-divider>
            <div>注意下面的name变化</div>
            <p>name---> {{ name }}</p>
            <a-alert
              type="warning"
              message="我在2秒以后，会发生变化，通过调用接口更新name"
            ></a-alert>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, reactive, watchEffect, toRefs, onMounted } from "@vue/composition-api"

export default {
  setup () {
    let code = ref(null)
    code.value = `
let count = ref(0)

watchEffect(()=> {
  这里就无限循环
  count.value = count.value + new Date().getTime()
  console.log('无限循环')
})
    `

    let fetchData = () => {
      return axios("/api/getName").then(res => {
        return res.data
      })
    }

     

    // 创建一个响应式对象
    const state = reactive({ count: 0 })
    let name = ref("zs")

    // console.log(state)

    let stop = watchEffect(async function f1 (onInvalidate) {
      // 监控 reactive创建的响应式对象的变化
      console.log("执行-watchEffect回调")
      console.log("count-->", state.count)
      console.log("name-->", name.value)
      console.log("")
      let res = await fetchData()
      name.value = res.name

      console.warn("-------------------------------")
      onInvalidate(function f2 () {
        console.log("")
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

    // 更新 state.name 看 watchEffect的回调还会不会触发
    setTimeout(function f3 () {
      console.warn("---setTimoue触发值的更新---")
      name.value = "我在3秒以后更新了数据"
    }, 0);

    return {
      ...toRefs(state),
      add,
      stopWatchEffect,
      name,
      code
    }
  }
}
</script>
