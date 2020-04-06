import Hljs from 'highlight.js';
// 引入主题-在node_modules/hightlight下面找，非常多的主题
import "highlight.js/styles/dark.css"

let Highlight = {};
Highlight.install = function (Vue) {
  // 自定义指令 v-highlight
  Vue.directive("highlight", {
    // 被绑定元素插入父节点时调用
    inserted: function (el) {
      let blocks = el.querySelectorAll('pre code');
      for (let i = 0; i < blocks.length; i++) {
        Hljs.highlightBlock(blocks[i]);
      }
    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: function (el) {
      let blocks = el.querySelectorAll('pre code');
      for (let i = 0; i < blocks.length; i++) {
        Hljs.highlightBlock(blocks[i]);
      }
    }
  })
}

export default Highlight


