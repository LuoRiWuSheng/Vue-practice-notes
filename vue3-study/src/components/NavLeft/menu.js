export default [
  {
    "path": "/",
    "title": "首页"
  },
  {
    "path": "/setup",
    "title": "setup"
  },
  {
    "path": "/reactive",
    "title": "reactive"
  },
  {
    "title": "ref",
    "children": [
      {
        "path": "/ref/1",
        "title": "ref创建响应式数据"
      },
      {
        "path": "/ref/2",
        "title": "ref中创建的响应式数据在reactive中使用"
      },
      {
        "path": "/ref/3",
        "title": "新ref创建的响应式会覆盖旧创建的ref响应式对象"
      }
    ]
  },
  {
    "path": "/torefs",
    "title": "toRefs"
  },
  {
    "path": "/computed",
    "title": "computed",
    "children": [
      {
        "path": "/computed/1",
        "title": "setup中使用omputed函数"
      },
      {
        "path": "/computed/2",
        "title": "setup中使用computed函数-创建可读可写的计算属性"
      }
    ]
  },
  {
    "path": "/watch",
    "title": "监听数据变化watch与watchEffect",
    "children": [
      {
        "path": "/watch/1",
        "title": "watch"
      },
      {
        "path": "/watch/2",
        "title": "watchEffect"
      },
      {
        "path": "/watch/3",
        "title": "watchEffect中操作DOM"
      }
    ]
  }
]