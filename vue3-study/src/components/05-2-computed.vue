<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="23" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>主页</a-breadcrumb-item>
          <a-breadcrumb-item>computed可读可写属性</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row style="margin-top: 20px; margin-bottom: 20px;">
      <a-col :span="23" :offset="1">
        <a-card>
          <p>count-->{{ count }}</p>
          <p>age--> {{ age }}</p>
          <a-button @click="add">+1</a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'

export default {
  setup () {
    let count = ref(0)

    let age = computed({
      get () {
        return count.value + 1
      },
      set (v) {
        console.log(v)
        count.value = v + 10
      }
    })
    console.log(age)
    const add = () => {
      count.value++
    }

    return {
      count,
      age,
      add
    }
  }
}
</script>

<style>
</style>