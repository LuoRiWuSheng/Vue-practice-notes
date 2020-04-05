<template>
  <div>
    <h3>computed可读可写属性</h3>
    <div>
      <p>count-->{{count}}</p>
      <p>age--> {{age}}</p>
      <button @click="add">+1</button>
    </div>
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
    const add = ()=> {
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