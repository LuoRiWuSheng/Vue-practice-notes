webpackJsonp([2],{"27T7":function(e,t){},IHPB:function(e,t,o){"use strict";t.__esModule=!0;var n,r=o("kfHR"),a=(n=r)&&n.__esModule?n:{default:n};t.default=function(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return(0,a.default)(e)}},kfHR:function(e,t,o){e.exports={default:o("qQfv"),__esModule:!0}},kksE:function(e,t,o){"use strict";var n=o("lIiZ"),r=o("go9Q");e.exports=function(e,t,o){t in e?n.f(e,t,r(0,o)):e[t]=o}},qQfv:function(e,t,o){o("IsPG"),o("yrDz"),e.exports=o("AKd3").Array.from},tcnj:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("lC5x"),r=o.n(n),a=o("IHPB"),s=o.n(a),i=o("J0Oq"),c=o.n(i),u=o("gyMJ"),f={name:"List",data:function(){return{books:[],offset:0,hasMore:!0,isLoading:!1}},components:{MHeader:o("UeVD").a},methods:{getData:function(){var e=this;return c()(r.a.mark(function t(){var o,n,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.hasMore||e.isLoading){t.next=11;break}return e.isLoading=!0,t.next=4,Object(u.f)(e.offset);case 4:o=t.sent,n=o.hasMore,a=o.books,e.books=[].concat(s()(a),s()(e.books)),e.hasMore=n,e.isLoading=!1,e.offset=e.books.length;case 11:case"end":return t.stop()}},t,e)}))()},remove:function(e){var t=this;return c()(r.a.mark(function o(){return r.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(u.g)(e);case 2:t.books=t.books.filter(function(t){return t.bookId!==e});case 3:case"end":return o.stop()}},o,t)}))()},more:function(){this.getData()},loadMore:function(){var e=this;clearTimeout(this.timer),this.timer=setTimeout(function(){var t=e.$refs.scroll;t.scrollTop+t.clientHeight+20>t.scrollHeight&&e.getData()},13)}},mounted:function(){var e=this,t=this.$refs.scroll,o=t.offsetTop,n=void 0,r=void 0,a=void 0,s=function e(s){r=s.touches[0].pageY,(a=r-n)>0?a<=200?t.style.top=o+a+"px":(a=200,t.style.top=o+200+"px"):(t.removeEventListener("touchmove",e),t.removeEventListener("touchend",i))},i=function(n){clearInterval(e.timer2),e.timer2=setInterval(function(){if(a<=0)return a=0,t.style.top="40px",clearInterval(e.timer2),e.books=[],e.offset=0,void e.getData();a-=1,t.style.top=o+a+"px"},1)};t.addEventListener("touchstart",function(e){n=e.touches[0].pageY,0===t.scrollTop&&t.offsetTop==o&&(t.addEventListener("touchmove",s),t.addEventListener("touchend",i))})},created:function(){this.getData()}},l={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("MHeader",[e._v("列表页")]),e._v(" "),o("div",{ref:"scroll",staticClass:"content",on:{scroll:e.loadMore}},[o("ul",e._l(e.books,function(t,n){return o("router-link",{key:n,attrs:{to:{name:"detail",params:{bid:t.bookId}},tag:"li"}},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.bookCover,expression:"book.bookCover"}]}),e._v(" "),o("div",[o("h4",[e._v(e._s(t.bookName))]),e._v(" "),o("p",[e._v(e._s(t.bookInfo))]),e._v(" "),o("b",[e._v(e._s(t.bookPrice))]),e._v(" "),o("button",{on:{click:function(o){o.stopPropagation(),e.remove(t.bookId)}}},[e._v("删除")])])])}))])],1)},staticRenderFns:[]};var v=o("C7Lr")(f,l,!1,function(e){o("27T7")},"data-v-4fecc38e",null);t.default=v.exports},yrDz:function(e,t,o){"use strict";var n=o("WwGG"),r=o("FITv"),a=o("OXaN"),s=o("kDTw"),i=o("V2W7"),c=o("CFGK"),u=o("kksE"),f=o("YW8S");r(r.S+r.F*!o("75+0")(function(e){Array.from(e)}),"Array",{from:function(e){var t,o,r,l,v=a(e),d="function"==typeof this?this:Array,h=arguments.length,p=h>1?arguments[1]:void 0,k=void 0!==p,m=0,b=f(v);if(k&&(p=n(p,h>2?arguments[2]:void 0,2)),void 0==b||d==Array&&i(b))for(o=new d(t=c(v.length));t>m;m++)u(o,m,k?p(v[m],m):v[m]);else for(l=b.call(v),o=new d;!(r=l.next()).done;m++)u(o,m,k?s(l,p,[r.value,m],!0):r.value);return o.length=m,o}})}});
//# sourceMappingURL=2.388836de0c441095d733.js.map