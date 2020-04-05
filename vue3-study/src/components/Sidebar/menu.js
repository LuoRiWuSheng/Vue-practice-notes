export default [
  {
    "path": "/",
    "title": "首页"
  },
  {
    "path": "/reactive",
    "title": "reactive"
  },
  {
    "path": "/ref",
    "title": "ref",
    "children": [
      {
        "path": "1",
        "title": "ref创建响应式数据"
      },
      {
        "path": "2",
        "title": "ref中创建的响应式数据在reactive中使用"
      },
      {
        "path": "/3",
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
        "path": "1",
        "title": "setup中使用computed函数"
      },
      {
        "path": "2",
        "title": "setup中使用computed函数-创建可读可写的计算属性"
      }
    ]
  },
  {
    "path": "/watch",
    "title": "监听数据变化watch与watchEffect",
    "children": [
      {
        "path": "1",
        "title": "watch"
      },
      {
        "path": "/2",
        "title": "watchEffect"
      }
    ]
  }
]