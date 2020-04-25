<template>
  <div :class="className" :style="{height, width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '../mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        /* title: {
          text: '雷达图'
        }, */
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['分配的预算', '额外预算', '实际预算'],
          after: 'center',
          bottom: '0'
        },
        radar: {
          radius: '65%',
          indicator: [
            { name: '美貌', max: 10000 },
            { name: '智慧', max: 20000 },
            { name: '口才', max: 20000 },
            { name: '情商', max: 20000 }
          ]
        },
        series: [
          {
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            type: 'radar',
            data: [
              {
                value: [4300, 10000, 1800, 3500],
                name: '分配的预算'
              },
              {
                value: [5000, 1400, 2800, 13000],
                name: '额外预算'
              },
              {
                value: [3100, 3400, 2400, 15000],
                name: '实际预算'
              }
            ],
            animationDuration: animationDuration
          }
        ]
      })
    }
  }
}
</script>
