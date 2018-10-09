<template>
    <swiper :options="swiperOption" class="swiper">
        <swiper-slide v-for="(slide, index) in swiperSildes" :key="index">
            <img :src="slide" alt="">
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    export default {
        name: 'carousel',
        props: ['swiperSildes'],
        data () {
            return {
                swiperOption: {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'progressbar'
                    },
                    grabCursor: true, // 鼠标移动到滑到组件，会变成手掌图标
                    loop: true, // 开启循环
                    autoplay: true, // 开启自动切换
                }
            }
        }
    }
</script>

<style scoped>
    img {
        width: 100%;
        height: 200px;
    }
</style>
