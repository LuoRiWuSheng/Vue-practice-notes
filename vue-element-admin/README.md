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