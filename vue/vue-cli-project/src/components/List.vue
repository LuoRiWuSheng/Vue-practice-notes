<template>
	<div>
        <MHeader>列表页</MHeader>
        <div class="content" ref='scroll' @scroll="loadMore">  <!--它有滚动条，做滚动刷新，要监听他的scroll事件-->
            <ul>
                <router-link tag='li' v-for="(book,index) in books" :key="index"  :to='{name:"detail",params: {bid:book.bookId}}'>
                    <div>
                        <img v-lazy="book.bookCover" :alt="book.bookInfo">
                    </div>
                    <div>
                        <h4>{{book.bookName}}</h4>
                        <p>{{book.bookInfo}}</p>
                        <div class="price">{{"￥"+book.bookPrice}}</div>
                        <!-- 这里必须阻止冒泡，不然点击删除，事件会冒泡到父元素li上，触发跳转的行为 -->
                        <button @click.stop='remove(book.bookId)'>删除</button>
                    </div>
                </router-link>
            </ul>
            <!--
                 去掉点击时候，再加载，改为上拉加载，监听scroll事件，调用loadMore方法
                <div class="more"><button @click="more()">加载更多</button></div>
                -->
            <div class="more"><button ref="more">加载更多</button></div>
        </div>
    </div>
</template>

<script>
import MHeader from "@/base/MHeader"
import {pagination,removeBook} from '@/api'

	export default {
        created() {
            this.getBook();
        },
        mounted() {
            // 也可以在这里实现原生的下拉刷新
            /*this.$refs.scroll.addEventListener("scroll",()=> {
                this.more();
            });*/

            // 做下拉盒子的操作
            let scroll = this.$refs.scroll;  // 获取要拖拽的元素
            let top = scroll.offsetTop;
            //console.log(top);

            let distance = 0;

            scroll.addEventListener("touchstart",(e)=> { // 这里会存在this问题，所以都用箭头函数
                // 滚动条在最顶端时，并且当前盒子在顶端的时候,才继续走
                if(scroll.scrollTop != 0 || scroll.offsetTop != top) return;

                let start = e.touches[0].pageY; // 手指点击开始的垂直坐标
                //console.log(start);

                let moveHandle = (e)=> {
                    let currentY = e.touches[0].pageY;  // 手指移到某个点的垂直坐标

                    distance = currentY - start;    // 求在垂直方向拉动的距离，负的不要，负的说明手指往上滑，不是下拉

                    if(distance > 0) {
                        //console.log("差距-->",distance);
                        if(distance <= 100) {   // 如果大于100，就设定为100
                            scroll.style.top = distance + top + 'px';
                        } else {
                            distance = 100;
                            scroll.style.top = top + 100 + "px";
                        }
                       
                    } else {

                        // 往上移动，我们是不需要的，就移除touchmove,touchend事件
                        scroll.removeEventListener('touchmove',moveHandle,false);   // 注意，这里移除的事件，必须定义为有名称的函数，不能是匿名函数
                        scroll.removeEventListener('touchend',endHandle,false);
                    }
                }

                let endHandle = (e)=> {
                    clearInterval(this.moveTimer);
                    this.moveTimer = setInterval(()=> {
                        if(distance <= 0) {
                            clearInterval(this.moveTimer);
                            distance = 0;
                            scroll.style.top = 0 + top +  "px";
                            // 上拉刷新的时候，清空以前的数据
                            this.books = [];
                            this.offset = 0;
                            this.hasMore = true;
                            this.more();    // 获取数据

                            //console.log(1);
                            scroll.removeEventListener('touchmove',moveHandle,false);
                            scroll.removeEventListener('touchend',endHandle,false);
                            return;
                        }
                        distance -= 1;
                        scroll.style.top = top + distance +'px';
                       
                    },1)
                } 
                scroll.addEventListener("touchmove",moveHandle);
                scroll.addEventListener("touchend",endHandle);
            });        
        },
		data() {
			return {
                books: [],
                offset: 0,  // 代表的偏移量，也就是当前页
                hasMore: true,  // 代表是否有更多数据，没有，就不请求
                isLoading: false// 是否正在加载,默认没加载
			}
		},
		methods: {
            more() {
                this.getBook();
            },
			async getBook() {
                if(this.hasMore && !this.isLoading) {  // 如果有更多数据，就做ajax请求，获取
                    this.isLoading = true;
                    let {hasMore,books}  = await pagination(this.offset);
                    this.books = [...this.books,...books];  // 这里必须将 新书和之前加载过的书给拼接成一个新的数组，返给this.books;不然，加载新书，老的数据就被盖掉了
                    this.hasMore = hasMore;
                    this.offset = this.books.length; // 维护偏移量  就是目前总书的长度
                    this.isLoading = false; // 加载完毕
                }
            },
            async remove(id) {
                // delete删除，后台返回的是一个空对象
                await removeBook(id);

                // 删除前台的数据
                this.books = this.books.filter((item)=> {
                    return item.bookId !== id;
                });
            },
            loadMore() {
               
                // 滚动的高度，可视区的高度，总高
                // 触发scroll事件，可能触发n次， 先开一个定时器，下次触发loadMore事件的时候，清除掉上一次的定时器
                clearTimeout(this.timer);  // timer是挂载到 vue实例上了
                this.timer = setTimeout(()=> {  // 防抖，节流
                    let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
                    //console.log(scrollTop,clientHeight,scrollHeight);

                    if(scrollTop + clientHeight + 20 > scrollHeight) {
                        this.more();    //  获取更多
                    }
                },60);
               
            }
		},
		computed: {
			
		},
		components: {
            MHeader
        },
        watch: {
            hasMore(){
                this.$refs.more.innerText = "我是有底线的";
            }
        }
	}
</script>

<style scoped lang="less">
    .content {
        ul {
            padding: 10px 0;
            li {
                display: flex;
                border-bottom: 1px solid #F1F1F1;
                margin-bottom: 10px;
                img {
                    width: 120px;
                    height: 150px;
                }

                h4 {
                    font-size: 20px;
                    line-height: 35px;
                }
                p {
                    color: #2a2a2a;
                    line-height: 25px
                }
                .price {
                    margin-top: 13px;
                    font-size: 18px;
                    font-weight: 400;
                    color: #FF0000;
                }
                button {
                    display: block;
                    width: 60px;
                    height: 25px;
                    line-height: 25px;
                    background: orangered;
                    color: #FFF;
                    outline: none;
                    border: none;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
                    margin-top: 20px;
                    border-radius: 10px;
                }
            }
        }
        .more {
            width: 100%;
            margin: 0 auto;
           
            text-align: center;
            button {
                width: 100%;
                font-size: 16px;
                color: rgb(25, 181, 150);
                background: #cccccc;
                border: none;
                margin: 10px 0 20px 0;
                outline: none;
            }
        }
    
    }

</style>