let http = require('http')
let fs = require('fs')
let url = require('url')

let sliders = require('./sliders')

// 轮播图 url请求地址: /sliders
let server = http.createServer((req, res)=> {
    // 跨域头
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/

    // true 把query转化成对象
    let {pathname, query} = url.parse(req.url, true)

    if(pathname === '/sliders') {
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        // 这里需要使用字符串或者Buffer的形式返回数据，或者不返回任何数据，使用其他类型，就会报错
        // First argument must be a string or Buffer at ServerResponse.end(string/Buffer)
        return res.end(JSON.stringify(sliders))
    }

    // 热门图书
    if (pathname === '/hot') {
        read(function(books) {
            let hot = books.reverse().slice(0,6) // 倒叙，返回5本书
            res.setHeader('Content-Type', 'application/json;charset=utf8')
            res.end(JSON.stringify(hot))

        })
        return
    }

    if (pathname === '/book') { // 对书的增删改查
        let id = parseInt(query.id) // 取出的是字符串
        // 根据请求的方法，判断做什么操作
        switch (req.method) {
            case "GET":
                if (!isNaN(id)) { // 查询一个
                   read((books)=> {

                       let book = books.find(item=> item.bookId === id)
                        if(!book) {
                            book = {}
                        }
                       res.setHeader('Content-Type','application/json;charset=utf8')
                       res.end(JSON.stringify(book))
                   })
                } else { // 获取所有图书
                    read((books)=> {
                        res.setHeader('Content-Type','application/json;charset=utf8')
                        res.end(JSON.stringify(books.reverse()))
                    })
                }
                break;
            case "POST":

                break;
            case "DELETE":
                read((books)=> {
                    let resultBook = books.filter(item=> item.bookId !== id)

                    write(resultBook, function() {
                        res.end(JSON.stringify({})) // 删除返回空对象
                    })
                })
                break;
            case "PUT":
                break;
        }
        return
    }
})

server.listen(3001)


// 读取书籍
function read(cb) {
    fs.readFile('./books.json', 'utf8', function(err, data) {
        if (err || data.length === 0) {
            cb([]) // 如果文件有错误或者没有内容，就返回空数组
        } else {
            // 将读出来的内容转化成json对象
            cb(JSON.parse(data))
        }
    })
}
/*read(function(books) {
    console.log(books)
})*/
function write(data, cb) {
    fs.writeFile('./books.json', JSON.stringify(data, null, 4), cb)
}
/*write({}, function() {
    console.log('写入成功')
})*/
