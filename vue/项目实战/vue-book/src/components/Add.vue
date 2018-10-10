<template>
    <div class="add">
        <MHeader :back="true">添加</MHeader>
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
                <li>
                    <label for="bookCover">封面:</label>
                    <input type="text" v-model="book.bookCover" id="bookCover">
                </li>
            </ul>
            <button @click="add">新增</button>
        </div>
    </div>
</template>

<script>
import MHeader from '@/base/MHeader'
import {addBook} from '@/api'

export default {
    name: 'Add',
    data() {
      return {
            book: {
                bookCover: 'https://img11.360buyimg.com/n1/s200x200_jfs/t6109/168/755288832/337238/a9c402b3/592bf16bN060edd40.jpg'
            }
      }
    },
    methods: {
        async add() {
            await addBook(this.book)
            this.$router.push('/list')
        }
    },
    components: {
        MHeader
    }
}
</script>

<style scoped lang="less">
    .add {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #FFF;
        z-index: 100;

        ul {
            margin: 50px 10px 0 10px;

            label {
                display: block;
                font-size: 25px;
            }
            input {
                margin: 10px 0;
                height: 25px;
                width: 100%;
            }
        }
        button {
            display: block;
            width: 100px;
            height: 30px;
            border: none;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            color: #FFF;
            background: #1833ff;
        }
    }
</style>
