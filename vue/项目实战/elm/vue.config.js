// const path = require("path")
// const debug = process.env.NODE_ENV !== "production"


// module.exports = {
//     productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
//     configureWebpack: config=> { // webpack配置，值位对象时会合并配置，为方法时会改写配置
//         if(debug) { // 开发环境配置
//             config.devtool = 'cheap-module-eval-source-map'
//         } else { // 生产环境配置

//         }

//         Object.assign(config, { // 开发生产环境共同的配置
//             resolve: {
//                 alias: {
//                     "@": path.resolve(__dirname, "./src"),
//                     "@C": path.resolve(__dirname, "./src/components"),
//                     //'vue$': 'vue/dist/vue.esm.js'
//                 }
//             }
//         })
//         console.log("地址-->", path.resolve(__dirname, "/src"))
//     }
// }

