# vue-answer-game


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

### vue-cli 3.X 重写Vue-answer-game
- 创建项目

```
    vue create vue-answer-game
    cd vue-answer-game
    npm run serve
```

- 项目目录(补充基本的文件目录)

```
    |—— vue-answer-game
        |———— public
        |———— src
              |—— router 路由
              |—— static 静态文件css,image,js
              |—— store Vuex相关
              |—— components 组件
              |—— assets 没有用到（空）

```

- 安装依赖(vue-cli 3.X是没有帮我们安装vuex和vue-router的)

```
    npm install vuex vue-router --save
    npm install css-loader style-loader --save-dev
    npm install less less-loader --save-dev
```

- 在根目录下新建 vue.config.js 文件，对webpack进行配置

```
    
```