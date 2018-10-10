<template>
    <div>
        <MHeader>首页</MHeader>
       <div class="content">
          <Loading v-if="loading">
                疯狂加载中
          </Loading>
           <template v-else>
               <Swiper :swiperSildes="sliders"></Swiper>
               <div class="container">
                   <h3>热门图书</h3>
                   <ul>
                       <li v-for="(hot, index) in hotBooks" :key="index">
                           <img :src="hot.bookCover" :alt="hot.bookInfo">
                           <b>{{hot.bookName}}</b>
                       </li>
                   </ul>
               </div>
           </template>
       </div>
    </div>
</template>

<script>
    import MHeader from '@/base/MHeader'
    import Swiper from '@/base/Swiper'
    import Loading from '@/base/Loading'
    import {getSliders, getHotBook, getAll} from '../api'

    export default {
        name: 'Home',
        data () {
            return {
                sliders: [],
                hotBooks: [],
                loading: true
            }
        },
        components: {
            MHeader,
            Swiper,
            Loading
        },
        created() {
            /*this.getSwiper() // 获取轮播图
            this.getHotBook() // 获取热门图书*/

            this.getData()
        },
        methods: {
            async getSwiper() {
                // 解构赋值 + 取别名
                //let {data:sliders} = await getSliders()

                // 将获取到的数据赋值给sliders
                this.sliders = await getSliders()
            },

            async getHotBook() {

                this.hotBooks = await getHotBook()
            },

            async getData() {
                // 使用Promise.all 获取所有数据
                [this.sliders, this.hotBooks] = await getAll()

                // 轮播图和热门图书已经获取完成
                this.loading = false
            }
        }
    }
</script>

<style scoped lang="less">
    .container {
        width: 90%;
        margin: 0 auto;
        h3 {
            color: #555;
            padding: 5px 0;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li {
                width: 50%;
                padding: 0 10px 12px 0;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                text-align: center;
                img {
                    width: 100%;
                }
            }

        }
    }
</style>
