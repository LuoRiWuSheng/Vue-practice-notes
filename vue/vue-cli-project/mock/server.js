let http = require('http')
let path = require('path')
let url = require('url')
let fs = require('fs')

// 获取轮播图，sliders
let sliders = require('./sliders')

let pageSize = 5; // 每页显示5个


// 创建服务
http.createServer((req, res) => {
    // 解决跨域问题
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") { //让options请求快速返回 
        return res.end('200');
    }

    // url.parse 中的参数 true把前端传过来的query转成对象
    let { pathname, query } = url.parse(req.url, true);
    console.log('-------------');
    console.log(pathname, query);
    console.log('-------------');
    if (pathname === '/page') {
        let offset = parseInt(query.offset) || 0;
        //console.log(offset);

        read(books => {
            // 每次偏移量，在基础上增加5个  0-5，5-10，10-15
            let result = books.reverse().slice(offset, offset + pageSize);
            let hasMore = true;
            if (books.length <= offset + pageSize) { // 没有数据了
                hasMore = false;
            }
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify({ hasMore: hasMore, books: result }));

            /* 模拟网络差的情况
            setTimeout(() => {
                res.end(JSON.stringify({ hasMore: hasMore, books: result }));
            }, 2000);*/
        });
        return;
    }

    if (pathname === '/sliders') {
        res.setHeader('Content-Type', 'application/json;charset=utf8');
        return res.end(JSON.stringify(sliders));
    }

    if (pathname === "/hot") {

        console.log("热点图书");
        read((books) => {
            let hot = books.reverse().slice(0, 5);
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            setTimeout(() => {
                res.end(JSON.stringify(hot));
            }, 1000);
        });
        return;
    }

    if (pathname === '/book') { // 对书的CURD

        let id = parseInt(query.id); // 取出的是字符串

        switch (req.method) { // ?id=1
            case 'GET':

                if (!isNaN(id)) { // 查询一个
                    read((books) => {
                        // find是ES6提供的新方法，找到了就返回，没找到，就返回undefined
                        let book = books.find((value, index, arrSelf) => {
                            return value.bookId === id;
                        });
                        if (!book) { // book如果没找到，没有，就返回空
                            book = {};
                        }

                        //res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(book));

                    });
                } else { // 获取所有图书
                    read((books) => {
                        res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(books.reverse()));
                    });
                }
                break;
            case 'POST':
                let str = "";
                req.on("data", chunk => {
                    str += chunk;
                });
                req.on("end", () => {
                    let book = JSON.parse(str);

                    read((books) => {
                        // 想将所有的数据读出来，然后赋值id，如果有books数据，那就在最后一个递增，没有数据，那就是1
                        book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;

                        books.push(book); // 将数据放到books中，books是内存中
                        write(books, () => { // 将所有的书，写入 
                            res.setHeader('Content-Type', 'application/json;charset=utf8');
                            res.end(JSON.stringify({})); // 其实添加的这里，你返回什么无所谓，前台也不一定要，一般可能会返回{state:0,success:"新增成功"}
                        })
                    });
                });
                break;
            case 'DELETE':
                read((books) => {
                    books = books.filter((item) => {
                        return item.bookId !== id;
                    });

                    write(books, () => {

                        res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify({})); // 删除返回空对象，前端拿到也没意义
                    });

                });

                break;
            case 'PUT':
                if (id) { // 上面已经获取了要修改的id
                    let str = '';

                    req.on('data', (chunk) => {
                        str += chunk;
                    });

                    req.on('end', () => {
                        let book = JSON.parse(str);

                        read((books) => {
                            books = books.map((item) => {
                                if (item.bookId === id) { // 找到id相同的那一本书，用新的替换老的
                                    return book;
                                }
                                return item; // 其他没修改的，原样返回，如果这里没有返回，则前台拿到的书只有1本了
                            });
                            // 如果没写入文件，那么上面的数据就是在内存中
                            write(books, () => { // 将数据写会json中
                                res.setHeader('Content-Type', 'application/json;charset=utf8');
                                res.end(JSON.stringify(book));
                            });
                        });

                    })
                }
                break;
        }
        return;
    }

    /*fs.stat("." + pathname, (err, stats) => {
        console.log("." + pathname);
        if (err) {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 404;
            res.end("111文件找不到", "utf8");
            return;
        }

        if (stats.isDirectory()) {
            console.log("是目录");
            let p = path.join('.' + pathname, 'index.html');
            fs.createReadStream(p).pipe(res);
            return;
        } else {
            fs.createReadStream("." + pathname).pipe(res);
            return;
        }

    })*/



}).listen(8011, () => {
    console.log("正在监听8011 port");
});


function read(callback) {
    // fs.readFile是异步的，所以，想要拿到读取文件的结果，实现的方式有多种
    // 1、 promise
    // 2、 read中传递一个callback,读取完成后，执行callback就可以
    // ...

    fs.readFile('./book.json', 'utf8', function(err, data) {
        if (err || data.length === 0) {
            console.log("读取图书出错");
            return callback([]); // 如果有错误，或者书为空
        }

        let res = JSON.parse(data); // 将读出来的数据（字符串）转换成对象
        callback(res);
    });
}

/*read((books)=> {
    // books 代表所有的图书
    console.log(books);
    
})*/

// 修改，添加，删除，都会调用write方法
function write(data, callback) {
    fs.writeFile('./book.json', JSON.stringify(data), (err, d) => {
        if (err) {
            return "错误";
        }

        callback(d);
    })
}
/*
    测试调用
write({}, (data) => {
    console.log('写出成功');
})*;*/