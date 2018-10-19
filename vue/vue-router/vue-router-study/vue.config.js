// Vue-cli 3.X 需要自己创建配置文件

/**
	vue.config.js 应该导出一个配置对象  是对象，而非其他的类型

	要配置webpack中的具体项，按照下面的方式去做就可以，参数名称去找webpack官网对照着修改
*/
const path = require('path')

module.exports = {
	// 修改webpack基本的配置，直接定义webpack的配置对象即可
	configureWebpack: {
			resolve: {
						// 配置别名
						alias: {
								'@': path.resolve(__dirname, './src')
						}		
			}
	}
}

