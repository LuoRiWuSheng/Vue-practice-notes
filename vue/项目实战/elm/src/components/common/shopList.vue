<template>
    <div class="shop-container">
        <ul v-load-more="loadMore" v-if="shopListArr.length" type="1">
            <router-link 
                v-for="item in shopListArr" :key="item.id"
                tag="li"
                :to="{
                    path: 'shop', 
                    query: {
                        geohash,
                        id: item.id
                    }
                }"
                class="shop-li"
                >
            
                <section>
                    <img :src="imgBaseUrl + item.image_path">
                </section>
                <hgroup class="shop-rigth">
                    <header class="shop-detail-header">
                        <h4 :class="item.is_premium ? 'premium': ''" class="shop-title  ellipsis">
                            {{item.name}}
                        </h4>
                    </header>
                    <ul class="shop-detail-ul">
                        <li v-for="item_sub in item.supports" :key="item_sub.id" class="supports">{{item_sub.icon_name}}</li>
                    </ul>
                    
                    <!-- 评分 -->
                    <h5 class="rating-order-num">
                        <section class="rating-order-num-right">
                            <rating-star :rating="item.rating"></rating-star>
                            <span class="rating-num">{{item.rating}}</span>
                        </section>
                        <section class="order-section">
                            月售{{item.recent_order_num}}单
                        </section>
                        <section class="rating-order-num-right">
                            <span class="delivery-style delivery-left" v-if="item.delivery_mode">
                                {{item.delivery_mode.text}}
                            </span>
                            <span class="delivery-style delivery-right" v-if="zhunshi(item.supports)">
                                准时达
                            </span>
                        </section>
                    </h5>
                    <h5 class="free-distance">
                        <p class="free">
                            ￥{{item.float_minimum_order_amount}}起送
                            <span class="segmentation"></span>
                            {{item.piecewise_agent_fee.tips}}
                        </p>
                        <p class="distance-time">
                            <span v-if="Number(item.distance)">{{item.distance>1000 ? (item.distance/1000).toFixed(2)+"km":(item.distance+"m")}}
                                <span class="segmentation"></span>
                            </span>
                            <span v-else>
                                {{item.distance}}
                            </span>
                            <span class="segementation">
                            </span>
                            <span class="order-time">
                                {{item.order_lead_time}}
                            </span>
                        </p>
                    </h5>
                </hgroup>
            </router-link>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex"
import {shopList} from "../../service/getData"
import {imgBaseUrl} from "../../config/env"
import {showBack, animate} from "../../config/mUtil"
import {loadMore, getItemPath} from "./mixin"
import loading from "./loading"
import ratingStar from "./ratingStar"

export default {
    name: "shopList",
    props: [
        "geohash",
        "restaurantCategoryId",
        "restaurantCategoryIds",
        "sortByType",
        "deliveryMode",
        "supportIds",
        "confirmSelect"
    ],
    data() {
        return {
            offset: 0, // 批次加载店铺列表，每次加载20个, limit=20
            shopListArr: [], // 店铺列表数据
            preventRepeatRequest: false, // 到达底部加载数据,防止重复加载
            showBackStatus: false, // 显示返回顶部按钮
            showLoading: true, // 显示加载动画
            touchend: false, //没有更多数据
            imgBaseUrl,
        }
    },
    computed: {
        ...mapState([
            "latitude", "longitude"
        ])
    },
    components: {
        loading,
        ratingStar
    },
    mounted() {
        this.initData()
    },
    methods: {
        async initData() {
            // 获取数据--shopList是一个接口
            let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId)
            this.shopListArr = [...res]

            if(res.length < 20) {
                this.touchend = true
            }

            this.hideLoading()
            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                this.showBackStatus = true
            })
        },
        //开发环境与编译环境loading隐藏方式不同
        hideLoading() {
            this.showLoading = false
        },
        async loadMore() {
            if(this.touchend) { // 到底部了，不再加载数据
                return
            }

            // 防止重复提交数据
            if(this.preventRepeatRequest) {
                return
            }

            this.showLoading = true
            this.preventRepeatRequest = true

            // 数据的定位加20
            this.offset += 20
            let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId)
            // 将原有的数据和现在请求到的20条数据进行合并
            this.shopListArr = [...this.shopListArr, ...res]

            // 当这次请求到的数据小于20条的时候，说明服务端再没有多余的数据
            if(res.length < 20) {
                this.touchend = true
                return
            }

            // 可以继续重复下拉请求
            this.preventRepeatRequest = false
        },
        backTop() {
            animate(document.body, {'scrollTop': '0'}, 400, 'easy-out')
        },
        zhunshi() {

        }
    }
}
</script>

<style lang="scss" scoped>

</style>


