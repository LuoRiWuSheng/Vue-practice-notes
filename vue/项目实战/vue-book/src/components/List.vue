<template>
    <div>
        <MHeader>列表页</MHeader>
        <div class="content" ref="scroll" @scroll="loadMore">
            <ul>
                <router-link v-for="(book, index) in books" :key="index" :to="{name: 'detail', params: {bid: book.bookId}}" tag="li">
                    <img v-lazy="book.bookCover">
                    <div class="descipt">
                        <h4>{{book.bookName}}</h4>
                        <p>{{book.bookInfo}}</p>
                        <b>{{book.bookPrice}}</b>
                        <div class="btn-list">
                            <button @click.stop="remove(book.bookId)">删除</button>
                            <button @click.stop="add(book)">添加</button>
                        </div>
                    </div>
                </router-link>
            </ul>
            <!--<button @click="more">加载更多</button>-->
        </div>
    </div>
</template>

<script>
    import {getBooks, removeBook, pagination} from '@/api'
    import MHeader from '@/base/MHeader'
    import * as Types from '../store/mutationsType'

    export default {
        name: 'List',
        data () {
            return {
                books: [],
                offset: 0,
                hasMore: true, // 是否有更多数据
                isLoading: false // 是否正在加载,默认不是正在加载
            }
        },
        components: {
            MHeader
        },
        methods: {
            async getData() {
                // 没分页前
               //this.books = await getBooks()
                if(this.hasMore && !this.isLoading) {
                    this.isLoading = true
                    // 分页后
                    let {hasMore, books} = await pagination(this.offset)

                    this.books = [...books, ...this.books]
                    this.hasMore = hasMore
                    this.isLoading = false
                    this.offset = this.books.length // 尾部偏移量的偏移量 == 总书的长度
                }



            },
            async remove(id) {
                await removeBook(id) // 删除某一项
                this.books = this.books.filter(item=> item.bookId !== id)
            },
            more() {
                this.getData()
            },
            loadMore() {
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    // 获取DOM
                    // scrollTop--滚动的高度  clientHeight--元素在屏幕的可见区域  scrollHeight--元素自身总高度
                    let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll

                    if(scrollTop + clientHeight + 20 > scrollHeight) {
                        this.getData() // 加载更多
                    }
                } ,13) // 防抖，节流
            },
            add(book) {
                this.$store.commit(Types.ADD_CART,book)
            }
        },
        mounted() {
            // 获取要操作的DOM
            let scroll = this.$refs.scroll

            let top = scroll.offsetTop
            let start;
            let current;
            let distance;
            let isMove = false;

            let move = (e)=> {
                isMove = true;
                current = e.touches[0].pageY // 获取滚动的终止Y轴位置

                distance = current - start; // 求拉动的距离， 负数就表示手指向上移动，不要（我们前面有上拉加载）

                if(distance > 0) {
                    if(distance <= 200) {
                        scroll.style.top = top + distance + 'px';
                    } else {
                        distance = 200;
                        scroll.style.top = top + 200 + 'px';
                    }

                } else {
                    // 不在考虑范围内，就移除相应的事件
                    scroll.removeEventListener('touchmove', move)
                    scroll.removeEventListener('touchend', end)
                }
            }
            let end = (e)=> {
                if(!isMove) return
                isMove = true;

                clearInterval(this.timer2)

                this.timer2 = setInterval(()=>{

                    if(distance <= 0) {
                        distance = 0;
                        scroll.style.top = 40 + 'px';
                        clearInterval(this.timer2)
                        // 获取数据
                        this.books = [];
                        this.offset = 0;
                        this.getData();
                        return;
                    }
                    distance -= 1;

                    scroll.style.top = top + distance + 'px';

                } ,1)
            }

            scroll.addEventListener('touchstart', (e)=> {
                start = e.touches[0].pageY  // 手指点击的开始位置

                // 滚动条在最顶端的时候，或者盒子在最顶端的时候，才继续走
                if(scroll.scrollTop !== 0 || scroll.offsetTop != top) return;
                scroll.addEventListener('touchmove',move)
                scroll.addEventListener('touchend',end)

            })

        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="less">
    .content {
        ul {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            li {
                display: flex;
                width: inherit;
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid #CCC;
                img {
                    flex-shrink: 0;
                    width: 130px;
                    height: 140px;
                    margin-right: 20px;

                }
                .descipt {
                    width: calc(100% - 130px);
                }
                h4 {
                    font-size: 18px;
                    line-height: 25px;
                }
                p {
                    color: #2a2a2a;
                    line-height: 20px;
                }
                b {
                    color: #F00;
                }
                button {
                    display: block;
                    width: 60px;
                    height: 20px;
                    color: #FFF;
                    border: none;
                    border-radius: 5px;
                    background: crimson;
                }
            }
        }

        .btn-list {
          display: flex;
          justify-content: space-around;
        }
    }
</style>
