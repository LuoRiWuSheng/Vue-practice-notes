import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'
import role from './role'

const mocks = [
  ...user,
  ...role
]

// 使用mock， 请谨慎使用，因为他是重写了 XMLHttpRequest对象
// 将会导致很多第三方的包失效，他是不会有 XMLHttpRequset的process事件，也就不会监控到文件的上传下载
export function mockXHR () {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send

  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      // 携带认证信息
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }

    this.proxy_send(...arguments)
  }

  // 生成响应的函数，根据上面mocks这个导入的传入不同的模版
  function XHR2ExpressReqWrap (respond) {
    return function (options) {
      let result = null

      if (respond instanceof Function) {
        // 解构出拦截的属性
        let { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }

      return Mock.mock(result)
    }
  }

  for (const i in mocks) {
    // 支持正则拦截接口
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

export default mocks
