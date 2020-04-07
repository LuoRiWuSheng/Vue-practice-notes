<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="22" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>watch</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="22" :offset="1">
        <a-card>
          <a-alert
            type="success"
            message="首先，watch是秉承vue2.x版本中的watch而来， 目的一样，监控数据,vue3中合并了vue2.x中的watch的配置项"
          ></a-alert>
          <div v-highlight>
            <pre>
              <code v-html="vue2WatchCode"></code>
            </pre>
          </div>
          <a-alert
            type="success"
            message="默认情况下，watch是惰性的，只有在监控的数据发生变化，才会执行回调, lazy为true就是延迟调用回调，第一次加载组件是不会调用回调"
          ></a-alert>
        </a-card>
        <a-card title="watch监控ref和reactive创建的响应式对象" style="margin-top: 20px; margin-bottom:20px;">
          <a-alert message="watch监控reactive创建的响应式对象，不能直接 watch(state.属性, 回调), 必须通过watch(()=>state.count, 回调)的方式"></a-alert>
          <a-alert message="watch监控reactive的属性，不能直接传递reactive创建的整个对象state，也不能在 watch(()=>直接返回state, 回调)，必须要写明state.XXX属性"></a-alert>
          <a-alert message="watch监控ref创建的， 直接 watch(nameRef, 回调)使用"></a-alert>
        </a-card>
        <a-card
          title="比较watchEffect与wacth的区别"
          style="margin-top:10px; margin-bottom: 10px;"
        >
          <a-alert
            type="error"
            message="watch比watchEffect默认情况下，都会执行回调，官网文档与源码是不一致的,2020-04-07记录； 文档说不会执行回调，源码是会执行"
          ></a-alert>
          <p>watch与watchEffect可选配置的默认值</p>
          <div v-highlight>
            <pre>
              <code v-html="watchAndWatchEffectOptionDefault"></code>
            </pre>
          </div>
          <a-alert
            type="warning"
            message="watch 更具体地说明什么状态应该触发监视程序重新运行；"
          ></a-alert>
          <a-alert
            type="warning"
            message="watch可以访问属性改变之前的值与当前更新的值，watchEffect不能"
          ></a-alert>
        </a-card>
        <a-card title="watch同时监控多个响应对象">
          <a-alert message="下面的代码中，需要注意 oldValArray这个，第一次是undefined,不能用官网文档提供的那样，undefined不能被解构，后面的值是可以的, 除非配置lazy:true, 那是可以解构的，因为第一次watch回调不执行"></a-alert>
          <a-alert message="vue3在2次值是同步更新的状态下，同步代码，不含setTimeout或者Promise，底层在多次值更新以后，才执行watch的回调，并不是更新一个值，就执行一次回调"></a-alert>
          <a-alert message="vue3中，当多个响应式属性，在异步的情况下更新，即使 setTimout时间是0， 也会多次触发watch回调，而不是合并触发"></a-alert>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, watch, reactive } from '@vue/composition-api'
export default {
  setup () {
    let vue2WatchCode = ref(null)
    vue2WatchCode.value = `
  // vue2.x中watch用法
  watch: {
    //  指定一个属性，传入一个回调函数
    name: function(newVal, oldVal) {
    }
  }
    `

    let watchAndWatchEffectOptionDefault = ref(null)
    watchAndWatchEffectOptionDefault.value = `
    lazy: false,
    deep: false,
    flush: 'post',
    `

    let state = reactive({ count: 0 })

    // 监控reactive创建的响应式数据，单个数据源
    watch(() => state.count, (count, prevCount) => {
      console.log(count, prevCount)
    })

    // 或者直接监控一个 ref创建的响应式对象
    let cc = ref("张三")
    watch(cc, (c, prevC) => {
      console.log("c当前值-->", c)
      console.log("c旧值-->", prevC)
    }, {
      // 标识，第一次组件加载，不会执行watch的回调
      lazy: true
    })
    console.log("===")
    // 同时监控多个值
    let fooRef = ref("foo")
    let barRef = ref("bar")
    watch([fooRef, barRef], ([foo, bar], oldValArray) => {
      console.log("foo-->", foo)
      console.log("bar-->", bar)
      console.log("旧值", oldValArray)
    })

    // 第一种情况，一次性更新2个值，那么watch回调会触发一次
    /* setTimeout(() => {
      fooRef.value = "foo--new"
      barRef.value = "bar--new"
    }, 1000); */


    // 第二种情况，分别更新2个值，watch会再触发2次
    /* setTimeout(() => {
      fooRef.value = "foo--new"
    }, 1000);

    setTimeout(() => {
      barRef.value = "bar--new"
    }, 1000); */

    // 第三种情况， 这种和第一种是一样的，watch初始化触发一次
    // 当属性值更新，触发一次，这里vue底层会将2次触发合并，等都更新完了，再一同触发watch回调
    /* fooRef.value = "foo--new"
    barRef.value = "bar--new" */
    return {
      vue2WatchCode,
      watchAndWatchEffectOptionDefault
    }

  }
}
</script>

<style>
.ant-alert {
  margin: 4px 0;
}
</style>