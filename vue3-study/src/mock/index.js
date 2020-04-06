import Mock from 'mockjs'
 Mock.mock(/\/api\/getName/, "get", {
  "name": "我是从模拟数据中获取的名字-尼古拉斯凯奇"
})