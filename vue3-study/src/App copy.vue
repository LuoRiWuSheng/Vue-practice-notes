<template>
  <div id="app">
   <ul>
     <li>
       <router-link to="/">setup</router-link>
     </li>
     <li>
       <router-link to="/reactive">reactive</router-link>
     </li>
     <li>
       <h4>ref</h4>
       <ol>
         <li><router-link to='/ref1'>ref创建响应式数据</router-link></li>
         <li><router-link to="/ref2">ref中创建的响应式数据在reactive中使用</router-link></li>
         <li><router-link to="/ref3">新ref创建的响应式会覆盖旧创建的ref响应式对象</router-link></li>
       </ol>
     </li>
     <li>
       <router-link to='/torefs'>toRefs</router-link>
     </li>
     <li>
       <h4>setup</h4>
       <ol>
         <li><router-link to='/computed'>setup中使用computed函数</router-link></li>
         <li><router-link to="/computed2" >setup中使用computed函数-创建可读可写的计算属性</router-link></li>
       </ol>
     </li>
     <li>
       <h4>监听数据变化watch与watchEffect</h4>
       <ol>
         <li><router-link to="/watchEffect-1">watchEffect 监听只读数据</router-link></li>
         <li><router-link to="/watch1">watch</router-link></li>
         <li></li>
         <li></li>
       </ol>
     </li>
   </ul>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App'
}
</script>

