// mock-server保留了mockjs模拟数据的能力，又能够让模拟的数据在network中查看到
// chokidar 监控文件变化
const chokidar = require('chokidar')
const bodyParser = require('body-parser')
// 终端样式库
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')

const mockDir = path.join(process.cwd(), 'mock')

console.log(chalk.bgBlue("mockDir-->", mockDir))

// 注册接口路由--在main.js和vue.config.js都需要修改，保证项目在启动的时候，mock也启动
// 这里的app 是webpack内置的express的实例， app = express()
function registerRoutes (app) {
  let mockLastIndex

  console.log(chalk.red('---加载所有的模拟接口--'))
  // 所有的模拟接口
  const { default: mocks } = require('./index')

  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })

  console.log(chalk.red('app._router.stack.length-->', app._router.stack.length))

  for (const mock of mocksForServer) {
    //  这里就是 app.get(url, (req, res)=> {....})
    app[mock.type](mock.url, mock.response)
    // 这里不懂
    mockLastIndex = app._router.stack.length
  }

  const mockRoutesLength = Object.keys(mocksForServer).length
  console.log( chalk.red("mockStartIndex-->",mockLastIndex - mockRoutesLength))
  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

// 卸载路由
function unregisterRoutes () {
  console.log(chalk.red('require.cache-->', require.cache))
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      // 因为有文件的更改，之前mock目录下的文件在加载的时候，都在缓存中了，新文件想要生效，需要先删除更改过的文件缓存
      delete require.cache[require.resolve(i)]
    }
  })
}

// 遍历，将mock/index.js中导出的mock数据模版在这里使用 app.get('url地址', (req, res)=> {res.json({返回})})
const responseFake = (url, type = 'get', respond) => {
  return {
    // 这里动态切换 生产和开发环境地址前缀
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type,
    // 这里的 req, res是 express的请求对象和响应对象
    response (req, res) {
      console.log(chalk.bgGreenBright.blue("接口被调用--》", req.path))
      // 这里的respond在mockjs中，可能是一个函数，可能是一个对象
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

// 因为webpack内置了express，所以这里的app，实际是express的实例对象
module.exports = app => {
  console.log(chalk.bgBlue("启动mock-server"))
  // es6 polyfill
  require('@babel/register')

  // 正常的 express使用中间件，解析参数
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  let mockRoutesLength = mockRoutes.mockRoutesLength
  let mockStartIndex = mockRoutes.mockStartIndex

  // 监控mock目录，当有新文件，新路由增加，重启mock 服务
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    // ignoreInitial是否对新增文件或者文件夹发送 事件
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // 当检测到mock目录发生变化，先移除路由
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // 清除路由缓存
        unregisterRoutes()

        // 重新注册路由
        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server 热加载启动成功!  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}