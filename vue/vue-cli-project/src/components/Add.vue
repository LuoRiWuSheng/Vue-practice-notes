<template>
    <div>
        <MHeader>新增图书</MHeader>

        <ul class="content">
            <li>
                <label for="bookName">书的名称</label>
                <input type="text" id="bookName" v-model="book.bookName">
            </li>
            <li>
                <label for="bookInfo">书的信息</label>
                <input type="text" id="bookInfo" v-model="book.bookInfo">
            </li>
            <li>
                <label for="bookPrice">书的价格</label>
                <input type="text" id="bookPrice" v-model.number="book.bookPrice">
            </li>
            <li>
                <label for="bookCover">书的封面</label>
                <input type="text" id="bookCover" v-model="book.bookCover">
            </li>
            <li>
                <button @click="add">添加</button>
            </li>
        </ul>

    </div>

</template>

<script>
import MHeader from "@/base/MHeader";
import { addBook } from "@/api";

export default {
    data() {
        return {
            book: {}
        };
    },
    methods: {
        async add() {
            await addBook(this.book);
            this.$router.push("/list");
        }
    },
    computed: {},
    components: {
        MHeader
    }
};
</script>

<style scoped lang='less'>
.content {
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
            border: 1px solid #ccc;
        }

        button {
            display: block;
            width: 80px;
            height: 25px;
            line-height: 25px;
            background: rgb(96, 174, 247);
            color: #fff;
            outline: none;
            border: none;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
            margin-top: 20px;
            border-radius: 6px;
        }
    }
}
</style>