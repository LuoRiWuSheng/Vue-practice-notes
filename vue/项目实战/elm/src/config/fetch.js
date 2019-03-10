import { baseUrl} from "./env"

export default async(url = "", data = {}, type = "GET", method = "fetch") => {
    type = type.toUpperCase()
    url = baseUrl + url

    if(type === "GET") {
        let dataStr = ""  // 拼接请求字符串 http://api/getShops?id=xxx&page=XXX&count=XXX

        Object.keys(data).forEach(key=> {
            dataStr += key + "=" + data[key] + "&"
        })

        if(dataStr !== "") {
            // 因为上面在做遍历拼接参数，末尾多了一个 & 
            dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"))
            url = url + "?" +dataStr
        }
    }

    if(window.fetch && method === "fetch") { // 在支持Fetch的情况下
    
        // fetch 请求头的设置
        let requestConfig = {
            // 这个关键字是实现了跨域发送cookie的关键
            credentials: "include",
            method: type,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            // 该模式，表示是可以跨域访问资源的
            mode: "cors",
            cache: "force-cache"
        }

        if(type === "POST") {
            Object.defineProperty(requestConfig, "body", {
                valeu: JSON.stringify(data)
            })
        }

        try {
            const response = await fetch(url, requestConfig)
            const responseJson = await response.json()
            return responseJson
        } catch(e) {
            throw new Error(e)
        }
    } else { // 不支持 fetch的情况下，使用Promise
        
        return new Promise((resolve, reject)=> {
            let requestObject

            if(window.XMLHttpRequest) {
                requestObject = new XMLHttpRequest()
            } else { // 兼容IE
                //requestObject = new ActiveXObject("Microsoft.XMLHTTP")
            }

            let sendData = ""

            if(type === "POST") {
                sendData = JSON.stringify(data)
            }
            // 打开链接
            requestObject.open(type, url, true)
            // 设置请求头
            requestObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            // 发送请求数据
            requestObject.send(sendData)

            // 监听响应
            requestObject.onreadystatechange = ()=> {
                if(requestObject.readyState === 4) {
                    if(requestObject.status === 200) {
                        let obj = requestObject.response

                        if(typeof obj === "object") {
                            obj = JSON.parse(obj)
                        }

                        // 将结果放到Proise中
                        resolve(obj)
                    } else { // 其他的HTTP状态码，统一进入 reject中
                        reject(requestObject)
                    }
                }
            }
        })
    }
}
