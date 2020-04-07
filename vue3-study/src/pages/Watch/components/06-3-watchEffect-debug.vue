<template>
  <div>
    <a-row class="top-breadcrumb">
      <a-col :span="23" :offset="1">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>debug watchEffect</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-row>
      <a-col
        :span="23"
        :offset="1"
        style="margin-top: 20px;margin-bottom: 20px"
      >
        <a-card title="watchEffect的onTrack 与onTrigger选项--废弃">
          <ol>
            <li>2020-4-7 从官方源码仓库看到，onTrack与onTrigger配置，已经被移除，并不能生效</li>
          </ol>

          <p>count--> {{ count }}</p>
          <a-button @click="count += 1">count++</a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, watchEffect } from "@vue/composition-api"
export default {
  setup () {
    let count = ref(0)

    watchEffect(
      () => { console.log(count.value) },
      {
        onTrigger (e) {
          console.log(e)
          debugger
        }
      }
    )

    return {
      count
    }
  }
}
</script>

<style>
</style>