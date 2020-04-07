<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="22" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item
            >ref操作DOM, ref拿到子组件的方法，响应式对象</a-breadcrumb-item
          >
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="22" :offset="1">
        <a-card title="ref操作DOM">
          <p ref="tipsRef">这段话的内容，点击下面的按钮，通过ref获取</p>
          <a-button @click="getDOM">获取DOM</a-button>
        </a-card>

         <a-card title="ref操作拿到子组件的内容">
         
          <a-button type="danger" @click="getSonObj">获取子组件的响应式对象</a-button>
          <a-button type='primary' @click="optSonMethod">调用子组件的方法</a-button>
          <hr>

          <div>
            <SonCom ref="sonRef"></SonCom>
          </div>
          <div>
            <ol>
              <li>子组件在setup中定义的方法，一定要return，暴露出来，这样父组件才能通过 ref能拿到</li>
              <li>ref创建的是一个响应式对象，具体要操作DOM元素，ref.value 拿到的就是DOM元素</li>
            </ol>
          </div>
        </a-card>
        
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import SonCom from './4-ref-son'

export default {
  setup () {
    const tipsRef = ref(null)
    const sonRef = ref(null)

    const getDOM = () => {
      tipsRef.value.style.color = "red"
    }
    
    // 拿到子组件的响应式对象
    const getSonObj = ()=> {
      console.log(sonRef.value)
      alert(sonRef.value.color)
    }

    // 拿到子组件的方法
    const optSonMethod = ()=> {
      sonRef.value.setColor()
    }

    return {
      tipsRef,
      getDOM,
      getSonObj,
      optSonMethod,
      sonRef
    }
  },
  components: {
    SonCom
  }
}
</script>

<style>
</style>