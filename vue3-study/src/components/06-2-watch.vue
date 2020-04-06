<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="22" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>watch 监控 ref创建的响应式数据</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="23" :offset="1" style="margin-top:20px">
        <a-card title="watch">
          <ol>
            <li>
              watch第一个参数是你要监控的对象-属性，
              参数2是一个回调(变化后的值currentCount， 变化之前的值-prevCount)=>
            </li>
            <li>
              watch默认会执行一次，什么都不操作的情况下，那么此时的prevCount就是undefined
            </li>
            <li>
              如果我们在watch的回调中，再次设置监控的属性 count, 那么
              watch的回调函数会再执行一次
              <a-alert message="看代码中的 watch(count, ()=> {}) 回调执行情况">
              </a-alert>
            </li>
            <li>
              如果我们不想要watch在组件第一次加载的时候，就执行一次回调，那么
              watch(属性， ()=> {...}, {lazy: true}) 设置第三个参数lazy:
              true即可
              <a-alert message="看代码中对num的监控，增加了 lazy: true， 则第一次组件加载的时候，不会执行 watch的回调函数"></a-alert>
            </li>
            <li>
              当num或者count在增加，值大于2，也就是从3开始，回调会执行2次，为什么？
              <ol>
                <li>num或者count值大于等于3以后， 第一次打印是 add函数，触发我们的属性更新，然后触发watch的回调</li>
                <li>第二次打印是，if(num.value>2)中对 num.value=2 又一次赋值，从而触发watch的回调</li>
              </ol>
            </li>
          </ol>
          <div>
            <p>count--> {{ count }}</p>
            <a-button @click="add">count +1</a-button>
            <a-alert message="当count大于2，我们又重新给count赋值，所以，回调函数又会重新执行一次"></a-alert>
          </div>
          <div>
            <p>num--> {{num}}</p>
            <a-button @click="addNum">num +1</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
export default {
  setup () {
    let count = ref(0)
    let age = ref(18)

    // watch 监控 ref创建的响应式数据
    watch(count, (currentCount, prevCount) => {
      console.log(count.value)
      console.log("当前的count值--》", currentCount)
      console.log("count没发生变化的值，前一个值", prevCount)


      // 监控count的值
      if (currentCount > 2) {
        alert("当前教师人数已经满了" + currentCount)
        // 在 watch中又给监控的属性赋值，就会出现这个回调函数再次执行一次
        count.value = 2
      }
    })

    let num = ref(0)
    watch(num, (current, prev) => {
      console.log("num-->currentValue-->", current)
      console.log("num-->prevValue-->", prev)
  
      if(num.value > 2) {
        num.value = 2
      }
    }, {
      lazy: true
    })

    const addNum = ()=> {
      num.value++
    }

    const add = () => {
      count.value++
    }

    return {
      count,
      add,
      num,
      addNum
    }
  }
}
</script>