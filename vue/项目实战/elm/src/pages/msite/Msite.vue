<template>
    <div>
        <!-- 头部组件 -->
        <head-top signin-up="msite">
            <router-link :to="'/search/geohash'" class="link-search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="8" cy="8" r="7" stroke="#FFF" stroke-width="1" fill="none">
                    </circle>
                    <line x1="14" y1="14" x2="20" y2="20" style="stroke:#FFF; stroke-width: 2"></line>
                </svg>
            </router-link>

            <router-link to="/home" slot="msite-title" class="msite-title">
                <!-- 标题 -->
                <span class="title-text ellipsis">{{msiteTitle}}</span>
            </router-link>
        </head-top>

        <nav class="msite-nav">
            <template>
                <swiper :options="swiperOption" class="swiper-container">
                    <swiper-slide v-for="(item, index) in foodTypes" :key="index" class="food-types-container">
                        <router-link v-for="foodItem in item" :key="foodItem.id" class="link-to-food"
                            :to="{path: '/food', 
                            query: {
                                geohash,
                                title: foodItem.title,
                                restaurant_category_id: getCategeoryId(foodItem.link)
                            }}"
                        >

                        <figure>
                            <img :src="imgBaseUrl + foodItem.image_url" :alt="item.title">
                            <figcaption>{{foodItem.title}}</figcaption>
                        </figure>
                        </router-link>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </template>


            <!-- <div class="swiper-container" v-if="foodTypes.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide food-types-container" v-for="(item, index) in foodTypes" :key="index">
                        <router-link v-for="foodItem in item" :key="foodItem.id" class="link-to-food"
                            :to="{path: '/food', 
                                query: {
                                    geohash, 
                                    title: foodItem.title, 
                                    restaurant_category_id: getCategeoryId(foodItem.link)
                                }
                            }" >
                            <figure>
                                <img :src="imgBaseUrl+ foodItem.image_url">
                                <figcaption >{{foodItem.title}}</figcaption>
                            </figure>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <img src="../../images/fl.svg" class="fl-back animation-opacity" v-else> -->
        </nav>

        <div class="shop-list-container">
            <header class="shop-header">
                <svg class="shop-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
                </svg>
                <span class="shop-header-title">附近商家</span>
            </header>

            <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
        </div>

        <foot-guid></foot-guid>
    </div>
</template>

<script>
import Vue from "vue"
import {mapMutations} from "vuex"
import {imgBaseUrl} from "../../config/env.js"
import headTop from "../../components/header/Header"
import footGuid from "../../components/footer/footGuid"
import shopList from "../../components/common/shopList"
import {msiteAddress, msiteFoodTypes, cityGuess} from "../../service/getData"
import * as Types from "../../store/mutation-types"
import VueAwesomeSwiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

export default {
    name: "Msite",
    data() {
        return {
            geohash: '', // city页面传过来的地理位置hash
            foodTypes: [], // 食品分类列表
            msiteTitle: '请选择地址...', // msite头部标题
            hasGetData: false, // 是否已经获取到地理位置的数据，获取到后，再获取商铺列表数据
            imgBaseUrl: 'https://fuss10.elemecdn.com', // 图片域名地址
            swiperOption: { // 滑动组件的配置项
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    async beforeMount() {
        if(!this.$route.query.geohash) {
            const address = await cityGuess()
            this.geohash = address.latitude + "," + address.longitude
        } else {
            this.geohash = this.$route.query.geohash
        }

        // 保存geohash到vuex仓库
        //this.$store.commit(Types.SAVE_GEOHASH, this.geohash) -- 下面是2种方式，下面的是直接映射成 这行代码
        this[Types.SAVE_GEOHASH](this.geohash)

        // 获取位置信息
        let res = await msiteAddress(this.geohash)
        // 酒店名称
        this.msiteTitle = res.name
        // 记录当前经纬度
        this[Types.RECORD_ADDRESS](res)

        this.hasGetData = true
    },
    mounted() {
        // 获取导航食品列表
        msiteFoodTypes(this.geohash).then(res => {
            let resLength = res.length
            let resArr = [...res] // 返回一个新数组
            let foodArr = []

            for(let i=0, j=0; i< resLength; i+=8, j++) {
                foodArr[j] = resArr.slice(0, 8)
            }

            this.foodTypes = foodArr
        })
    },
    methods: {
        ...mapMutations([
            'RECORD_ADDRESS', 'SAVE_GEOHASH'
        ]),
        getCategeoryId(url) { // 解析 url地址
            let urlData = decodeURIComponent(url.split("=")[1].replace('&target_name', ""))
            if(/restaurant_category_id/gi.test(urlData)) {
                //console.log(JSON.parse(urlData))
                //console.log(JSON.parse(urlData).restaurant_category_id.id)
                // id有的有，有的没有
                return JSON.parse(urlData).restaurant_category_id.id
            }
            
           return ''
        }
    },
    components: {
        headTop,
        footGuid,
        shopList
    }
}
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";
    .link-search {
        left: .8rem;
        @include wh(.9rem, .9rem);
        @include ct;
    }
    // 标题
    .msite-title {
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;

        .title-text {
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
    }
    // 
    .msite-nav {
        height: 10.6rem;
        padding-top: 2.1rem;
        background: #fff;
        border-bottom: 0.025rem solid $bc;

        .swiper-container {
            @include wh(100%, auto);
            padding-bottom: 0.6rem;

            .swiper-pagination {
                bottom: 0;
            }
        }

        // .fl-back {
        //     @include wh(100%, 100%)
        // }

        .food-types-container {
            display: flex;
            flex-wrap: wrap;

            .link-to-food {
                width: 25%;
                @include fj(center);
                padding: 0.3rem 0rem;

                figure {
                    img {
                        margin-bottom: 0.3rem;
                        @include wh(1.8rem, 1.8rem);
                    }

                    figcaption {
                        text-align: center;
                        @include sc(0.55rem, #666);
                    }
                }
            }
        } 
    }

    // 商户列表
    .shop-list-container {
        margin-top: 0.4rem;
        border-top: 0.025rem solid $bc;
        background: #fff;
        .shop-header {
            .shop-icon {
                fill: #999;
                margin-left: 0.6rem;
                vertical-align: middle;
                @include wh(0.6rem, 0.6rem);
            }
            .shop-header-title {
                color: #999;
                @include font(0.55rem, 1.6rem);
            }
        }

    }
</style>

