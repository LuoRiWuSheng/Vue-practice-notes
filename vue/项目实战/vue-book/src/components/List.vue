<template>
    <div>
        <MHeader>列表页</MHeader>
        <div class="content">
            <ul>
                <router-link v-for="(book, index) in books" :key="index" :to="{name: 'detail', params: {bid: book.bookId}}" tag="li">
                    <img :src="book.bookCover" alt="">
                    <div>
                        <h4>{{book.bookName}}</h4>
                        <p>{{book.bookInfo}}</p>
                        <b>{{book.bookPrice}}</b>
                        <button @click.stop="remove(book.bookId)">删除</button>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getBooks, removeBook} from '@/api'
    import MHeader from '@/base/MHeader'
    export default {
        name: 'List',
        data () {
            return {
                books: []
            }
        },
        components: {
            MHeader
        },
        methods: {
            async getData() {
               this.books = await getBooks()
            },
            async remove(id) {
                await removeBook(id) // 删除某一项
                this.books = this.books.filter(item=> item.bookId !== id)
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="less">
    .content {
        ul {
            padding: 10px;

            li {
                display: flex;
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid #CCC;
                img {
                    flex-shrink: 0;
                    width: 130px;
                    height: 140px;
                    margin-right: 20px;

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
    }
</style>
