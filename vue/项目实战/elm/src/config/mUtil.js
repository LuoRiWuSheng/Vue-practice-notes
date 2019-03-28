/**
 * 工具类方法
 */
/**
 * 存储 localStorage
 */
 export const setStore = (name, content)=> {
    if(!name) throw new Error("存储localStorage未指定key")
    if(typeof content !== "string") {
        content = JSON.stringify(content)
    }

    window.localStorage.setItem(name, content)
 }

 /**
  * 获取localStorage
  */
export const getStore = name => {
    if(!name) throw new Error("获取localStorage没有传递name")

    return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name=> {
    if(!name) throw new Error("删除localStorage未指明具体的key")

    window.localStorage.removeItem(name)
}

/**
 * 获取非行间样式
 */
export const getStyle = (element, attr, NumberMode = "int")=> {
    let target;
    // scrollTop获取的方式不同，它是不能直接通过style访问的，只有document.body才能用
    if(attr === "scrollTop") {
        target = element.scrollTop
    } else if(element.currentStyle) {
        target = element.currentStyle[attr]
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr]
    }
    // 在获取属性为 opactiy的时候，需要获取小数， parseFloat
    return NumberMode == "float" ? parseFloat(target) : parseInt(target)
}

/**
 * 页面到达底部,加载更多
 */
export const loadMore = (element, callback)=> {
    let windowHeight = window.screen.height;
    let height;
    let setTop;
    let paddingBottom;
    let marginBottom;
    let requestFram;
    let oldScrollTop;


    document.body.addEventListener("scroll", ()=> {
        loadMore()
    }, false)

    element.addEventListener("touchstart", ()=> {
        oldScrollTop = document.body.scrollTop
        moveEnd()
        // 加入passive: true是为了告诉浏览器，你可以执行你的默认行为，我不会阻止；这个防止卡顿
    }, {passive: true})

    const moveEnd = ()=> {
        requestFram = requestAnimationFrame(()=> {
            if(document.body.scrollTop !== oldScrollTop) {
                oldScrollTop = document.body.scrollTop

                loadMore()
                moveEnd()
            } else {
                cancelAnimationFrame(requestFram)
            }
        })
    }
}

export const showBack = () => {

}

export const animate = ()=> {

}