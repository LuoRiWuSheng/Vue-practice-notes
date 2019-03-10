<template>
    <div id="head-top">
        <slot name="logo" class="logo"></slot>
        <slot name="search"></slot>
        <section class="header-goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <!-- 创建一个三角形的折线 12，18这是一个坐标，空格隔开，第二个坐标是4,9
                    style就是写css的样式
                    fill 表示无填充
                    stroke表示线条的颜色
                    stroke-width: 表示边框(线条)宽度
                 -->
                <polyline points="12,18 4,9 12,0" style="fill: none;stroke:rgb(255, 255, 255); stroke-width: 2" />
            </svg>
        </section>
        <!-- 登录注册 -->
        <router-link :to="userInfo? '/profile':'/login'" v-if="signinUp" class="head-login">
            <svg class="user-avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user">
                </use>
            </svg>
            <span class="login-span" v-else>登录|注册</span>
        </router-link>

        <section class="title-head ellipsis" v-if="headTitle">
            <span class="title-text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <!-- 切换城市 -->
        <slot name="changeCity"></slot>
        <slot name="changeLogin"></slot>
    </div>
</template>

<script>

import {mapState, mapActions} from "vuex"

export default {
    name: "Header",
    props: [
        "signinUp",
        "goBack",
        "headTitle"
    ],
    data() {
        return {
          
        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    mounted() {
       

        // 获取用户信息--action返回的是一个Promise对象
        this.getUserInfo().then((d)=> {
            console.log(`用户信息 ${d}`)
        }).catch(e=> {
            console.log(`header.vue中获取用户信息错误--》${e}`)
        })
       
    },
    methods: {
        // 异步的方式获取用户信息
        ...mapActions(['getUserInfo']),
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";

#head-top {
    position: fixed;
    left: 0;
    top: 0;
    background: $blue;
    z-index: 100;
    //@include wh(100%, 1.95rem);
    width: 100%;
    height: 1.95rem;
    text-align: center;

    .header-goback {
        left: 0.4rem;
        @include wh(0.6rem, 1rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    // 登录注册
    .head-login {
        right: 0.55rem;
        font-size: 0.65rem;
        color: #FFF;
        // 上下居中
        @include ct;

        .login-span {
            color: #FFF;
        }
        .user-avatar {
            fill: #FFF;
            @include wh(0.8rem, 0.8rem)
        }
    }

    // 标题
    .title-head {
        @include center;
        width: 50%;
        color: #FFF;
        text-align: center;

        .title-text {
            @include sc(0.8rem, #FFF);
            text-align: inherit;
            font-weight: bold;
        }
    }
}
</style>

