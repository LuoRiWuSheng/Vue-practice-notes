## 慕课网-TodoList 开发

涉及内容

- webpack + vue

>   在package.json中配置的webpack运行脚本是跑的本地webpack，而不是全局的，避免版本不一致导致不能run

> 针对文件的处理

**css类型**

>   安装 vue-style-loader css-loader

**图片文件类型**

>   安装 url-loader ，而url-loader依赖file-loader  所以 安装顺序是 npm i file-loader url-loader

**webpack-dev-server**

**html-webpack-plugin**


**cross-env**

为了解决不同平台下，设置的环境变量的方式不同，使用cross-env包，统一

安装的packages

npm i postcss-loader autoprefixer  babel-cli babel-preset-env  babel-core babel-plugin-transform-vue-jsx --save-dev

针对jsx的文件使用babel-loader进行编译， 在webapck.config.js中配置


在项目根目录创建
    postcss.config.js
    .babelic