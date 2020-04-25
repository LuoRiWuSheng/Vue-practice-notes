import { debounce } from '@/utils'
// mixin中的内容会和组件中的内容进行合并

export default {
  data () {
    return {
      // 左侧导航栏元素
      $_sidebarElm: null,
      // 监听的事件
      $_resizeHandler: null
    }
  },
  mounted () {
    // 防抖
    this.$_resizeHandler = debounce(() => {
      // 这里是mixin的，所以能够访问到使用处的所有内容，包括data
      if (this.chart) {
        // 当容器大小发生变化，手动调用echart实例的resize方法
        this.chart.resize()
      }
    }, 100)

    // 监听resize事件
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  beforeDestroy () {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  // 针对 keep-alive缓存的组件使用
  activated () {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  methods: {
    $_initResizeEvent () {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    // 在组件销毁之前，移除resize监听事件
    $_destroyResizeEvent () {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    // 监听到transitionend动画事件结束
    $_sidebarResizeHandler (e) {
      // 当触发transitionend事件的时候，event对象会有 哪个动画的样式被修改了，event.propertyName返回一个只读属性
      // 如果这个动画属性名是宽度，就说明左侧的导航栏一定是宽度发生了变化，我们就需要重新调整echart图表的宽度
      if (e.propertyName === 'width') {
        // 手动调用echart的重置容器的方法
        this.$_resizeHandler()
      }
    },
    // 监听左侧导航栏的 过渡事件，左侧导航栏会有收缩，展开动画，这就影响到图标库的容器宽度问题
    $_initSidebarResizeEvent () {
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]

      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    // 组件销毁，顺便销毁对动画事件的事件句柄函数
    $_destroySidebarResizeEvent () {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }

  }
}
