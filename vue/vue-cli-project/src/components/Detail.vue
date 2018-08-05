<template>
	<div class="detail">
        <MHeader :back="true">
            详情页
        </MHeader>
        <ul class="bookList">
            <li>
                <label for="bookName">书的名称</label>
                <input type="text" id="bookName" v-model="book.bookName">
            </li>
             <li>
                <label for="bookInfo">书的信息</label>
                <input type="text" id="bookInfo" v-model="book.bookInfo">
            </li>
             <li>
                <label for="bookPrice">书的信息</label>
                <input type="text" id="bookPrice" v-model.number="book.bookPrice">
            </li>
            <li>
                <button @click="update">确认修改</button>
            </li>
        </ul>
	</div>
</template>

<script>
import MHeader from '@/base/MHeader'
import {findOneBook,updateBook} from '@/api'

	export default {
        created() { // 页面一加载，需要根据List页面传过来的bid去查询书的信息
            this.getData();
        },
		data() {
			return {
				book: {}
			}
        },
        watch: {
            $route() { // 只要路径变化，重新获取数据
                this.getData();
            }  
        },
		methods: {
            async getData() {
                 this.book = await findOneBook(this.bid);
              

                // 检测一个对象是否为空  如果查到的bid不存在，后台返回一个 空对象{}
                /**
                 * 1.  JSON.stringify(this.book) === "{}"
                 * 2.   Object.keys(this.book).length>0 将一个对象转成数组，然后看其length是否大于0
                 * 3.   特定的条件下，你知道后台的这个对象会返回什么key，可以通过查找这个key是否存在，来判断对象是否为空 this.book.bookId 如果存在bookId，说明有数据，对象不为空
                 */
                Object.keys(this.book).length > 0? void 0: this.$router.push('/list');
            },
            async update() {    // 点击修改图书信息
                await updateBook(this.bid,this.book);

                this.$router.push("/list");
            }
		},
		computed: {
			bid() {
                // 将路径参数的bid映射到bid
                return this.$route.params.bid;
            }
          
		},
		components: {
            MHeader
        }
    }
    /*put请求有点特殊
    1、它先要把修改的数据通过 url告诉后台 修改的是哪一条数据 /book?id=1
    2、告诉后台，修改的数据是什么，这个就需要放到请求体中  {bookName: "修改后的内容"}
    */
</script>


<style scoped lang="less">
    /*遮住下面的tab功能，详情页是没有这个的*/ 
    .detail {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      
        background: #FFF;
        z-index: 10;

        .bookList {
            position: absolute;
            left: 0;
            top: 40px;
            margin: 50px 10px 0 10px;
            li {
                margin-bottom: 10px;

                label {
                    font-size: 25px;
                }
                input {
                    width: 100%;
                    height: 25px;
                    font-size: 25px;
                    outline: none;
                    -webkit-appearance: none;
                    border: 1px solid #CCC;
                }

                button {
                    display: block;
                    width: 80px;
                    height: 25px;
                    line-height: 25px;
                    background: rgb(96, 174, 247);
                    color: #FFF;
                    outline: none;
                    border: none;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
                    margin-top: 20px;
                    border-radius: 6px;
                }
            }
           
        }
    }

</style>