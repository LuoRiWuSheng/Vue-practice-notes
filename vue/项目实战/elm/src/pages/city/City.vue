<template>
    <div class="city-container">
        <HeadTop :head-title="cityName" go-back="true">
            <router-link to="/home" slot="changeCity" class="change-city">切换城市</router-link>
        </HeadTop>
        <form v-on:submit.prevent class="city-form">
            <div>
                <input type="search" name="city" placeholder="请输入学校、商务楼、地址" class="city-input input-style" required v-model="inputValue">
            </div>
            <div>
                <input type="submit" name="submit" class="city-submit input-style" @click="postPois" value="提交">
            </div>
        </form>
        <!-- 这里不是组件，是原生header标签 -->
        <header v-if="historyTitle" class="pois-search-history">
            搜索历史
        </header>
        <!-- 搜索的历史列表 -->
        <ul class="position-list">
            <li v-for="(item, index) in placeList" :key="index" @click="nextPage(index, item.geohash)">
                <h4 class="position-name ellipsis">{{item.name}}</h4>
                <p class="position-address ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <!-- 页脚 -->
        <footer v-if="historyTitle && placeList.length" class="clear-all-history" @click="clearAll">
            清空所有
        </footer>
        <div class="search-none-place" v-if="placeNone">很抱歉!无搜索结果</div>
    </div>
</template>


<script>
import HeadTop from "../../components/header/Header"
import {currentCity, searchPlace} from "../../service/getData"
import {getStore, setStore, removeStore} from "../../config/mUtil"

export default {
    name: "city",
  
    data() {
        return {
            inputValue: "", // 搜索栏地址
            cityid: "", // 当前城市id
            cityName: "", // 当前城市名称
            placeList: [], // 搜索城市列表
            placeHistory: [], // 历史搜索记录
            historyTitle: true, // 默认显示历史搜索头部header， 点击搜索后隐藏
            placeNone: false // 搜索无结果，显示提示信息
            
        }
    },
    mounted() {
        // 通过获取路由参数，获取城市id
        this.cityid = this.$route.params.cityid;

        // 获取当前城市名称
        currentCity(this.cityid).then(res=> {
            this.cityName = res.name
        })

        this.initData()
    },
    components: {
        HeadTop
    },
    methods: {
        initData() {
            // 获取搜索历史记录
            if(getStore("placeHistory")) {
                this.placeList = JSON.parse(getStore("placeHistory"))
                return
            }
            // 本地存储中没有之前搜索的历史记录
            this.placeList = []
        },
        // 发送input中的搜索信息
        postPois() {
            if(this.inputValue) {
                searchPlace(this.cityid, this.inputValue).then(res=> {
                    this.historyTitle = false
                    this.placeList = res
                    this.placeNone = res.length? false: true
                })
            }
        },
        /**
         * 搜索出来的地名，点击，判断之前是不是点过，点过，直接将 该地名的（地理坐标）发送到下一个页面
         * 没有点击过，就存储到localstorage中，并跳转
         * {String} geohash 地理位置 '22.96791,113.72416'
         */
        nextPage(index, geohash) {

            let history = getStore("placeHistory")
            // 选中的那个地址
            let choosePlace = this.placeList[index]

            if(history){ // 之前有历史记录
                let checkRepeat = false
                this.placeHistory = JSON.parse(history)
                this.placeHistory.forEach(item=> {
                    if(item.geohash === geohash) {
                        checkRepeat = true
                    }
                })

                if(!checkRepeat) {  // 之前点击搜索的历史记录，就存储到localstorage中
                    this.placeHistory.push(choosePlace)
                }
            } else { // 之前就没有点击具体的某一项的地址，那就没有历史记录
                this.placeHistory.push(choosePlace)
            }

            // 将数据存储到localStorage中
            setStore("placeHistory", this.placeHistory)
            // 将路由跳转到商品页面
            this.$router.push({path: "/msite", query: {geohash}})
        },
        // 清空所有的搜索历史
        clearAll() {
            removeStore("placeHistory")
            this.initData()
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "src/style/mixin";

    .city-container {
        padding-top: 2.35rem;
    }
    .change-city {
        right: 0.4rem;
        @include sc(0.6rem, #FFF);
        @include ct;
    }
    .city-form {
        background: #FFF;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-top: 0.4rem;

        div {
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input-style {
                @include wh(100%, 1.4rem);
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
            }
            .city-input {
                border: 1px solid $bc;
                padding: 0 0.3rem;
                @include sc(0.65rem, #333);
            }
            .city-submit {
                @include sc(0.65rem, #FFF);
                background: $blue;
            }
        }
    }
    // 搜索历史
    .pois-search-history {
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: 0.5rem;
        @include font(0.475rem, #FFF);
    }
    .position-list {
        background: #FFF;
        border-bottom: 1px solid $bc;

        li {
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid $bc;

            .position-name {
                margin: 0 auto 0.35rem;
                width: 90%;
                @include sc(0.65rem, #333);
            }
            .position-address {
                width: 90%;
                margin: 0 auto 0.35rem;
                @include sc(0.45rem, #999);
            }
        }
    }
    // 清空所有
    .clear-all-history {
        @include sc(0.7rem, #666);
        text-align: center;
        line-height: 2rem;
        background: #FFF;
    }
    .search-none-place {
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background: #FFF;
        text-indent: 0.5rem;

    }
</style>

