### 手把手敲vue-elementui-admin


### 查缺补漏

1. [CSS3属性-webkit-font-smoothing字体抗锯齿渲染](https://www.cnblogs.com/moqiutao/archive/2016/03/18/5291881.html)

> 非标准属性

2. 在单页应用中，怎么在scss和js中共用变量，达到代码的可维护性
> 还是借助webpack打包，需要修改webpack配置，才能让一份变量文件能够在sass和js中使用

![how-to-share-variables-between-js-and-sass](https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass)

安装包
```js
npm install sass-loader node-sass webpack --save-dev
```

配置webpack
webpack.config.js 中需要配置
```js
module.export = {
  module: {
    rules: [
      {
        test: /\*.css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
}
```

在vue-cli3 生成的脚手架中不需要配置vue.config.js文件，默认支持

定义 variables.scss文件

```scss
$menuBg:#304156;

:export {
  menuBg: $menuBg;
}
```
> 只需要借助 :export 关键字即可

在单页应用中使用
test.vue
```
<template>
  <div :class="'background': variables.menuBg"></div>
</template>

<script>
import variables from '@/styles/variables.scss'
</script>
```

3. 借助webpack一次性导入多个模块

require.context(路径, 是否遍历子目录true/false, 匹配的模式)

store/index.js
```js
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


```

4. svg图标的使用，一次性导入多个svg
- src/icons/index.js 包含对 require.context的使用
- src/components/SvgIcon/index.vue 封装了一个通用的组件
- src/icons/index.js 注册一个全局组件
- main.js 中引入 icons/index.js
- SVG sprite loader解析svg文件-需要配置vue.config.js

5. css中不常见但是还能看见的一些属性 @supports 

```
@supports (-webkit-mask: none) and (not (cater-color: red)) {
  .login-container .el-input input {
    color: red;
  }
}
```

> 如果你的浏览器支持-webkit-mask属性，但是 不支持cater-color属性， 就是用下面的样式

![css中不常见但是还能看见的一些属性](https://blog.csdn.net/weixin_41229588/article/details/90929429)

6. $nextTick使用
> 常见的就是状态更新以后，聚焦input
> 见 src/views/login/index.vue中

src/view/dashboard/admin/components/TodoList/todo.vue

```js
<input v-focus="editing"/>

export default {
  directives: {
    // 这里可以直接使用 async...await的方式来写我们的 nextTick，和我们直接传入一个 回调函数，是一样的效果
    async focus (el, { value }, { context }) {
      if (value) {
        await context.$nextTick()
        el.focus()
      }
    }
  },
}
```


7. 将mock结合webpack-dev-serve使用，让前端请求的接口被webpack中起的express服务捕获
> 需要修改 vue.config.js中的 devServer: {before: require('./mock/mock-server.js')}

- 避免前端mock数据，mock数据是没有办法在network中进行调试的
- 避免mockjs因为重写XMLHttpRequest接口，导致其他的依赖XMLHttpRequest不能正常使用的问题
- 一键切换webpack的mock和真是的后台地址

**出现的疑问**

1. 为什么 mock/mock-server.js 中需要引入 require('@babel/register') 
> 对代码进行转换，不知道为什么这里必须要require， 如果注释，不报错，mock-serve也起不来服务

```js
yarn add @babel/core @babel/register -S
```

8. vue.config.js中配置全局环境

在项目根目录下面新建
.env.production
.env.development
.env.staging

三个文件，三个文件表示不同的环境被载入不同的全局变量

9. vue-cli3中配置wepack别名的2种方式

1、使用 configureWebpack
vue.config.js
```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, "src"),
        "layout": path.join(__dirname, 'src/layout')
      }
    }
  }
}

```

2. 使用webpack链式调用
vue.config.js
```js
module.exports = {
  chainWebpack: config=> {

    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('layout', path.join(__dirname, 'src/layout'))
  }
}
```

10. 简单的深拷贝

> utils/index.js 中的 deepClone

11. babel.cofnig.js修改成?

```js
module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset'
    '@vue/app'
  ]
}
```

11. 登录，获取到token，就根据token去获取用户的信息

login.vue里面写了登录的逻辑，以及dispatch 调token的接口

拿到登录信息以后，login.vue会进行 router.push 这个时候，就会触发 vue-rouer 的路由守卫导航 router.beforeEach

路由守卫导航在 main.js中引入了 permission.js

router.beforeEach会进行相关的判断，是否有token, 以及对token的存储，存储到cookie中

在获取到token以后，就调获取用的接口，拿到用户接口，就去遍历角色，动态生成路由表

然后再更新vuex中的路由表

再让用户 next 进入下一个路由

12. echart图表， 重置，监听resize事件
> src/views/dashboard/admin/mixins/resize.js

13. 监听到动画结束事件transitionend， 并根据event对象，获取动画变化的属性名 event.propertyName ,然后做相应的echart图表重置宽度的工作
> src/views/dashboard/admin/mixins/resize.js

*event.propertyName*

14. vue中 activated声明周期钩子的使用

> src/views/dashboard/admin/mixins/resize.js

![activated](https://cn.vuejs.org/v2/api/#activated)

15. 在图表库中， 因为要不断的重设图标容器的宽度，达到自适应的效果，如果频繁缩放页面，则必须使用防抖函数

相关代码使用出处
> src/utils/index.js/debounce
> src/views/dashborad/admin/components/LineChat.vue

16. 一次性加载所有的全局过滤器

main.js

```js
// 引入全局的过滤器
import * as filters from './filters'

console.log(filters)
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
```

filters/index.js
```js
// 导出时间转换函数
export { parseTime, formatTime } from '../utils'
import { isNumer } from '../utils'

/**
 * 10000 --> "10,000"
 * @param {Number} num
 */
export function toThousandFilter (num) {
  if (!isNumer(num)) {
    throw new Error('非数字类型')
  }

  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

```

17. 组件中的data返回的属性，使用函数定义
src/views/dashboard/admin/components/TodoList/index.vue
```js
// 这里的是作为属性使用，无法访问到实例的this， 
const filter = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  complted: todos => todos.filter(todo => todo.done)
}

export default {
  data() {
    return {
      todos: [.....],
      // 将all, active, complted作为属性注册
      filter
    }
  }
}
```

[官网API-data讲解](https://cn.vuejs.org/v2/api/#data)

18. 如果我们需要对列表项（或者更直接的描述为数据）， 反复过滤呈现，那么我们不要直接去更改 我们data对象中的 originList 数据源，我们应该去操作一个临时的，具有响应式的数据对象

```js
// 在组件中，循环展示，使用 filterList作为数据源
<ul>
  <li v-for='(item, index) in filterList' :key='index'>{{item.text}}</li>
</ul>


const filter = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  complted: todos => todos.filter(todo => todo.done)
}
export default {
  data() {
    return {
      visibility: 'all',
      filter,
      // 这里的数据，我们是不会去做任何操作的
      todos: [源数据]
    }
  },
  computed: {
    filteredTodos() {
      // 条件的更改，我们就更改 filter中的回调函数，然后，上面的v-for 会触发对应视图的更新
     return filters[this.visibility](this.todos)
    }
  }
}
```

这样做的好处是, 我们对源数据，是不会有任何更改，在不同的操作中，我们随时可以重置我们的数据源










