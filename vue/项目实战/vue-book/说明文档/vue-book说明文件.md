## vue-book 书城

### 开始

>   由于最新的vue-cli拉取的模版和2.X不太一样，我们这个是基于2.X的项目结构开发，所以默认的拉取会是3.X的模板框架
>   想要继续使用2.X的模版，需要安装一个中间桥接插件   
>   关于vue-cli中3.X的创建项目的方式，参见官网，反正2.X与3.X除了模版有差异，使用cli的方式是一样的

```js
    npm install -g @vue/cli-init
    // `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
    vue init webpack vue-book
```

```js
    vue init webpack vue-book
```

截图效果

![startup.png](./startup.png)

阅读拉取的模版代码

**package.json**
npm run dev 做的事情是

```js
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
```
- 启动一个webpack-dev-server服务，但是我们的webpack是全局安装的，所以这里的使用的配置文件是 build/webpack.dev/conf.js

webpack.dev.conf.js文件中

- 合并了baseWebpackConfig中的配置
- 导入其他一些的配置

webpack.base.conf.js文件中

- 指定webpack打包器的入口，出口
- 指定别名，扩展文件名
- 指定解析规则，各种loader 如：css-loader,url-loader

在webstorm中，如果你使用了webpack配置的别名，并且省略.vue等文件后缀，是没有办法通过按住ctrl+点击文件名，快速跳转到指定文件的（看自己的使用习惯）

---
安装一下的插件

```js
    npm install bootstrap less less-loader axios vuex --save-dev
```

组织项目的目录结构

- api  统一放前端的请求接口
- mock 通过放后台的模拟数据
- base 基础组件
- components 页面级组件

引入阿里字体图标库，在index.html中，直接引入link






