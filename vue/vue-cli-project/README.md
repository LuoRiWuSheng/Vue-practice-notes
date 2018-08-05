## 项目中用到Less

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
### 需要安装的

```js
	npm install less less-loader axios vuex bootstrap
```

- mock 模拟数据
- api 代表的是所有的接口
- base 代表基础组件
- components 页面级组件

### 热门图书的功能

- 先写服务端，确保数据能够正常返回给前端
- 去前端的api目录，增加方法，实现获取数据
- 在哪个组件中应用这个API,考虑，如果是一个可以复用的组件（基础组件），在使用该组件的父级中调用获取数据的接口，将数据通过props传递给具体的组件；如果该组件不需要复用，可以直接在组件中调用接口
- 1.写一个基础组件，首先得创建一个.vue文件
- 2.在需要使用这个组件的父级中引用该组件，import
- 3.在组件中注册这个组件 components: {XXXX}
- 4.以标签的形式引用 <XXX\><XXX/\>

### 列表页的功能

### 路由元信息

>   在router/index.js中定义路由[元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)
>   可以做页面的缓存，$route.meta.字段


### 下拉刷新
- 默认每次给5条信息，前端告诉后台要从第几条给我
- /page?offset=5   比如从5条开始，5-10  ，假设 pageSize=5
- 后台还要告诉前端是否有更多的数据，hasMore:true/false

>   下拉刷新，可以使用github上的插件 [vue-pull-to](https://github.com/stackjie/vue-pull-to) 或者 [vue-pull-to-refresh](https://github.com/bajian/vue-pull-to-refresh)

### 图片懒加载

>   使用插件 [vue-lazyload](https://github.com/hilongjw/vue-lazyload)

### 代码分割 coding spit

>   以前导入组件，是直接把所有的组件都导入，这样的问题是，会一次性加载所有的组件，有些页面，我们可能还没进去，但是组件已经打包到main.js中了

router/index.js

```js
import Home from "@/components/Home"
import List from "@/components/List"
import Detail from "@/components/Detail"
import Add from "@/components/Add"
import Collection from "@/components/Collection"

// 下面就是配置路由
```
当改为coding split 时,移除掉上面的内容

router/index.js 中
```js
 {
    path: '/home',
    name: 'home',
    component: () => import ('@/components/Home'),
    meta: {
        keepAlive: true
    }
}
```

### 打包上线

- npm run build 
    - 会运行 build/build.js
        - build.js使用了 webpack.prod.conf生产环境下的配置
        








For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
