<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="23" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>主页</a-breadcrumb-item>
          <a-breadcrumb-item>setup</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="23" offset="1" style="margin-top:20px">
        <a-card>
          <a-steps :current="currentStep">
            <a-step>
              <template slot="title">beforeCreate</template>
              <span slot="description">钩子</span>
            </a-step>
            <a-step>
              <template slot="title">setup</template>
            </a-step>
            <a-step>
              <template slot="title">created</template>
            </a-step>
          </a-steps>
        </a-card>
        <a-card>
          <a-alert
            message="vue3中，beforeCreate钩子和created钩子合并成一个，用setup代替"
          ></a-alert>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'
export default {
  // 定义从父组件传过来的参数类型
  props: {
    p1: String
  },
  /* 
    props就是形参，上面定义的 props属性中定义数据类型，一定要定义，下面的setup才能拿到
    context就是vue 2.x中的this
    this.$emit(XXXX)
    vue3 写法就是 context.emit()
  */
  setup (props, context) {
    const currentStep = ref(0)

    console.log('setup')
    console.log(props)
    console.log("Vue3中的this")
    console.log(context)

    let timerId = setInterval(() => {
      autoRun()
    }, 1500);

    const autoRun = () => {
      if (currentStep.value > 2) {
        currentStep.value = 0
        return
      }

      currentStep.value++
    }

    // 在组件销毁以后，清除定时器
    onUnmounted(() => {
      clearInterval(timerId)
    })

    return {
      currentStep
    }
  },
  beforeCreate () {
    console.log(`beforeCreate`)
  },
  created () {
    console.log(`created`)
    console.log(this)
  }
}
</script>

<style>
</style>