import {getStle, getStyle} from "../../config/mUtil"
import {imgBaseUrl, localapi, proapi} from "../../config/env.js"

// 指令
export const loadMore = {
    directives: {
        'load-more': { // 指令的名称
            bind: (el, binding)=> { // 指令的钩子函数，bind只在指令第一次绑定到元素时调用
                let windowHeight = window.screen.height
                let height;
                let setTop;
                let paddingBottom;
                let marginBottom;
                let requestFram;
                let oldScrollTop;
                let scrollEl;
                let heightEl;
                let scrollType = el.attributes.type && el.attributes.type.value
                let scrollReduce = 2;
                
                if(scrollType === 2) {
                    scrollEl = el
                    heightEl = el.children[0]
                } else {
                    scrollEl = document.body
                    heightEl = el
                }

                // 监听手指
                el.addEventListener("touchstart", ()=> {
                    let clientHeight = heightEl.clientHeight
                    if(scrollType === 2) {
                        height = clientHeight
                    }
                    setTop = el.offsetTop
                    paddingBottom = getStyle(el, "paddingBottom")
                    marginBottom = getStle(el, "marginBottom")
                }, false)

                el.addEventListener("touchmove", ()=> {
                    loadMore()
                }, false)

                el.addEventListener("touchend", ()=> {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd()
                }, false)

                const loadMore = ()=> {
                    if(scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
                        // 指令的绑定值--将这里的值暴露到使用指令的地方
                        binding.value()
                    }
                }

                const moveEnd = ()=> {
                    requestFram = requestAnimationFrame(()=> {
                        if(scrollEl.scrollTop != oldScrollTop) {
                            oldScrollTop = scrollEl.scrollTop
                            moveEnd()
                        } else {
                            cancelAnimationFrame(requestFram)
                            height = heightEl.clientHeight
                            loadMore()
                        }
                    })
                }
            }
        }
    }
}
export const getImgPath = {
    methods: {
        getImgPath(path) {
            let suffix;
            if(!path) {
                return "//elm.cangdu.org/img/default.jpg"
            }

            if(path.indexOf("jpeg") !== -1) {
                suffix = ".jpeg"
            } else {
                suffix = ".png"
            }

            let url = '/' + path.substr(0, 1) + "/" + path.substr(1,2) + "/" + path.substr(3) + suffix
            return 'https://fuss10.elemecdn.com' + url
        }
    }
}