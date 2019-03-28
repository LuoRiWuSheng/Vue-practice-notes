# elm

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 安装的包

```
    // 安装生产环境依赖
    npm i vue-router -S  等价于 npm i vue-router --save
    // 解决移动端点击延迟事件的问题
    npm i fastclick -S
    
    // 因为css是语法糖是 scss
    npm i  sass-loader --save-dev

    // 安装sass-loader后 npm run serve 报错
   // Module build failed (from ./node_modules/sass-loader/lib/loader.js):
    //Error: Cannot find module 'node-sass'
```

### 开发顺序

1. 指定路由 router

2. 开发Home.vue
    2.1. 用到头部组件，开发 header-top组件
    2.2 需要使用 Vuex  安装 vuex,并且组织 store/index.js 写入状态管理
    3.1 在开发到 svg 使用use标签的时候，这个标签其实是一个克隆标签 [use深度克隆](http://know.webhek.com/svg/svg-symbol.html)
    3.2 我用的vue版本是 2.6.6 因此，vue的API有一些改动： 插槽的变动，基本语法糖需要适当的修改

3. 开发城市列表 city.vue

4. 开发首页站点 msite.vue
    - 使用swiper插件

```
npm install vue-awesome-swiper --save

// 在组件中引入
<script>
    import Vue from "vue"
    import VueAwesomeSwiper from "vue-awesome-swiper"

    // 导入css
    import 'swiper/dist/css/swiper.css'
    // 注册组件
    Vue.use(VUeAwesomeSwiper)

    export default {

    }
</script>

```
    - 使用vuex，存储获取到的数据，使用 mutation-types 存储commit常量名称，借助编辑器的友好提示
    - 在调用commit的时候，使用...mapMutation直接将需要用到的方法拿到，并与methods中的其他方法合并
    - 在组件中调用 methods中映射到的mutations时，如果需要智能提示，最要引入 下面这样

```
import * as Types from "../../store/mutation-types"

// 在组件中使用

this[Types.ADD](传入载荷/参数)

// 等价于下面
this.$store.commit([Types.ADD], 载荷/参数)
```

