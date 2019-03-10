<template>
    <div>
        <!-- 登录注册 标题 -->
        <!-- 下面传递的是Boolean 需要使用 v-bind:go-back="false 不然它会当成字符串的false" -->
        <Header signin-up='home' v-bind:go-back="false">
            <template  v-slot:logo>
                <span class="head-logo" @click="reload">ele.me</span>
            </template>
        </Header>
       <!-- 城市定位 -->
        <nav class="city-nav">
            <div class="city-tip">
                <span>当前定位城市:</span>
                <span>定位不准时,请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/'+ guessCityId" class="guess-city">
                <span>{{guessCity}}</span>
                <svg class="arrow-right"  width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link>
        </nav>

        <!-- 热门城市 -->
        <section id="hot-city-container"> 
            <h4 class="city-title">热门城市</h4>
            <ul class="city-list clear">
                <router-link tag="li" v-for="item in hotCity" :to="'/city/'+item.id" :key="item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>

        <section class="group-city-container">
            <ul class="letter-classify">
                <!-- sortgroupcity是一个对象 {A: [], B: []....} -->
                <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter-classify-li">
                    <h4 class="city-title">
                        {{key}}
                        <span v-if="index === 0">(按字母排序)</span>
                    </h4>
                    <ul class="groupcity-name-container city-list clear">
                        <router-link tag="li" v-for="item in value" :to="'/city/'+item.id" :key="item.id" class="ellipsis">{{item.name}}</router-link>
                    </ul>
                </li>
            </ul>
        </section>

       
    </div>
</template>


<script>
import Header from "../../components/header/Header.vue"
import {cityGuss, hotCities, groupCity} from "../../service/getData"

export default {
    name: "home",
    data() {
        return {
            guessCity: "", // 当前城市
            guessCityId: "", // 当前城市id
            hotCity: [], // 热门城市列表
            groupCity: {} // 所有城市列表
        }
    },
    components: {
        Header
    },
    mounted() { // ajax获取数据
        // 获取当前城市
        cityGuss().then(res=> {
            this.guessCity = res.name;
            this.guessCityId = res.id;
        })

        // 获取热门城市
        hotCities().then(res=> {
            this.hotCity = res
        })

        // 获取所有城市列表 按照首字母A-Z分类
        groupCity().then(res=> {
            this.groupCity = res
        })
    },
    computed: {
        // 将获取的数据按照A-Z字母开头排序
        sortgroupcity() {
            let sortObj = {}
           
            for(let i=65; i<=95; i++) {
                if(this.groupCity[String.fromCharCode(i)]) {
                    // String.fromCharCode(i) 是生成A-Z的字符串，A-Z的unicode对应的65-95之间
                    sortObj[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)];
                }
            }
           
            return sortObj
        }
    },
    methods: {
        // 点击图标 刷新页面
        reload() {
            window.location.reload();
        }
        
    }
}
</script>


<style lang="scss" scoped>
    @import "../../style/mixin";
    // logo
    .head-logo {
        left: 0.4rem;
        font-weight: 400;
        // 宽高
        @include wh(2.3rem, 0.9rem);
        // 字体大小和颜色
        @include sc(0.7rem, #FFF);
        // 定位 上下居中
        @include ct;
    }
    .city-nav {
        // 因为头部使用了固定定位，脱离文档流，所以这里要顶上头部的height
        padding-top: 2.35rem;
        border-top: 1px solid $bc;
        background: #FFF;
        margin-bottom: 0.4rem;

        .city-tip {
            // flex布局
            @include fj;
            line-height: 1.45rem;
            padding: 0 0.45rem;

            span:nth-of-type(1) {
                @include sc(0.55rem, #666)
            }
            span:nth-of-type(2) {
                font-weight: 900;
                @include sc(0.475rem, #9f9f9f)
            }
        }
        // 猜测可能在的城市
        .guess-city {
            @include fj;
            align-items: center;
            height: 1.8rem;
            padding: 0 0.45rem;
            border-top: 1px solid $bc;
            border-bottom: 2px solid $bc;
            @include font(0.75rem, 1.8rem);

            span {
                color: $blue;
            }

            // svg画的箭头
            .arrow-right {
                @include wh(0.6rem, 0.6rem);
                fill: #999;
              
            }
        }
    }

    // 热门城市
    #hot-city-container {
        background: #FFF;
        margin-bottom: 0.4rem;
        
       

        
    }
    .city-list  {
        li{
            float: left;
            text-align: center;
            color: $blue;
            border-bottom: 0.025rem solid $bc;
            border-right: 0.025rem solid $bc;
            @include wh(25%, 1.75rem);
            @include font(0.6rem, 1.75rem);
        }
        li:nth-of-type(4n){
            border-right: none;
        }
    }
    .city-title {
        color: #666;
        font-weight: 400;
        text-indent: 0.45rem;
        border-top: 2px solid $bc;
        border-bottom: 1px solid $bc;
        @include font(0.55rem, 1.45rem, "Helvetica Neue");
        span {
            @include sc(0.475rem, #999);
        }
    }
    // 城市列表 A-Z
    .letter-classify-li {
        margin-bottom: 0.4rem;
        background: #FFF;
        border-bottom: 1px solid $bc;

        .groupcity-name-container {
            li {
                color: #666;
            }
        }
    }
</style>