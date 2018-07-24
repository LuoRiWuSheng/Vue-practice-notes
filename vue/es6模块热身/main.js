// 如果是第三方模块，不要要加 ./
// 如果是文件模块，就是自己写的模块，就要加 ./
// 如果a.js中的是一个一个的export 下面就需要使用{a} 将a.js中的内容解构赋值到main.js中的a ；由于es6的对象中，key和value一样，可以只写一个
//console.log(a);// 这里也能打印，但是写代码是不会这样写的
//import {a} from './a.js';

//console.log(a);
// node中导如一个模块写法  let a = reuqire("./a");

// 在main.js中不能再声明a这个名称，import有声明功能;具有变量提升的效果

// 上面导入的时候，如果有100个从a.js中的导出，上面写法--解构赋值得用100下，麻烦

// 第二种方式，下面的b就是一个对象

import * as b from "./a.js";
import * as bModule from "./b.js";
console.log(b.a);
b.f();
