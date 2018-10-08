<template>
    <div>
        <!--3、使用组件-->
        <MHeader :back="false"></MHeader>
        <!-- 轮播图 -->
        <div class="content">
            <Loading v-if="loading"></Loading>    
            <template v-else>
                <Swiper :swiperSlides="sliders"></Swiper>

                <div class="hotbook">
                    <h3>热门图书</h3>
                    <ul class="clearfix">
                        <li v-for="(book,index) in hotBooks" :key="index">
                            <img :src="book.bookCover" :alt="book.bookInfo" />
                            <div>{{"￥"+book.bookPrice}}</div>
                            <p>{{book.bookName}}</p>
                        </li>
                    </ul>
                </div>
            </template>

            

        </div>
    </div>
</template>

<script>
require("swiper/dist/css/swiper.css");
// 或者 import "swiper/dist/css/swiper.css"
// 1、引入组件
import MHeader from "@/base/MHeader";
import Swiper from "@/base/Swiper";
import Loading from "@/base/Loading";


import { getAll } from "@/api/index.js";

export default {
    created() {
       this.getDate()
    },
    data() {
        return {
            sliders: [],
            hotBooks: [],
            loading: true
        };
    },
    methods: {
        async getDate() {
            // 为啥下面可以直接解构赋值，是因为在index.js中增加了拦截器，ajax返回后的数据在那一层直接处理了，到这里只拿到data数据，xhr对象都被拦截了
            let [sliders,hotBooks] = await getAll();

            this.sliders = sliders;
            this.hotBooks = hotBooks;

            // 轮播图和热门图书已经获取完成
            this.loading = false;
        }
    },
    computed: {},
    components: {
        // 2、 注册组件
        MHeader,
        Swiper,
        Loading
    }
};
</script>

<style scoped lang='less'>
/*热门图书*/
.hotbook {
    width: 100%;
    h3 {
        width: 78px;
        padding-bottom: 10px;
        margin-left: 20px;
        margin-bottom: 10px;
        border-bottom: 3px solid #0000ff;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        text-align: center;
        overflow: hidden;

        li {
            width: 50%;

            div {
                text-align: left;
                margin-left: 20px;
                color: #ff0000;
                font-weight: 700;
            }
            p {
                width: 100%;
                text-align: left;
                margin-left: 20px;

                img {
                    width: 100%;
                }
            }
        }
    }
}
.clearfix::after {
    clear: both;
    content: "";
    height: 0;
    visibility: hidden;
}
.clearfix {
    zoom: 1;
}
</style>