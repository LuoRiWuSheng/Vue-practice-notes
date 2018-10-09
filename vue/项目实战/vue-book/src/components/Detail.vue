<template>
    <div class="detail">
        <MHeader :back="true">{{bid}}详情页</MHeader>
        <div class="content">
            <ul>
                <li>
                    <label for="bookName">书名:</label>
                    <input type="text" v-model="book.bookName" id="bookName">
                </li>
                <li>
                    <label for="bookPrice">价格:</label>
                    <input type="text" v-model.number="book.bookPrice" id="bookPrice">
                </li>
                <li>
                    <label for="bookInfo">书的信息:</label>
                    <input type="text" v-model="book.bookInfo" id="bookInfo">
                </li>
            </ul>
            <button>确认修改</button>
        </div>
    </div>
</template>

<script>
    import MHeader from '@/base/MHeader'
    import {findOneBook} from '../api'

    export default {
        name: 'Detail',
        data() {
            return {
                book: []
            }
        },
        watch: {
            $route() {
                this.getData()
            }
        },
        computed: {
            bid() {
                return this.$route.params.bid // 获取路径中的bid
            }
        },
        components: {
            MHeader
        },
        methods: {
             async getData() {
                 // 通过id找到某一本具体的书的信息
                 this.book = await findOneBook(this.bid)
             }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped>
    .detail {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #FFF;
        z-index: 100;
    }
</style>
