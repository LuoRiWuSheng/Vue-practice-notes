<template>
  <div class='dashboard-editor-container'>
    <github-corner class='github-corner'></github-corner>

    <panel-group @handleSetLineChartData='handleSetLineChartData'></panel-group>

  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from './components/PanelGroup'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    // 组件通讯
    handleSetLineChartData(type) {
    }
  }
}
</script>

<style>

</style>