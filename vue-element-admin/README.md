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

