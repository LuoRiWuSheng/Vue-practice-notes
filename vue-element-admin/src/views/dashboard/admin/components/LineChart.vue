<template>
  <div :class="className" :style="{height: height, width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '../mixins/resize'

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) return

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    // 初始化图表
    initChart () {
      // 这里的 this.$el 是当前组件的跟元素
      this.chart = echarts.init(this.$el, 'macarons')

      // 初始化数据
      this.setOptions(this.chartData)
    },
    setOptions ({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
          // 图表两边不留白
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        // 坐标系
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        // 提示框
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        // Y轴设置
        yAxis: {
          axisTick: {
            show: false
          }
        },
        // 图例
        legend: {
          data: ['期望值', '实际值']
        },
        series: [
          {
            name: '期望值', itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '实际值',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
