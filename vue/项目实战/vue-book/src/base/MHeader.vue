<template>
    <div class="header">
        <slot></slot>
        <i v-if="back" class="iconfont icon-fanhui1" @click="goback"></i>
    </div>
</template>

<script>
    export default {
        name: 'MHeader',
        props: {
            back: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            goback() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="less">
.header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    background: #ddd;
    overflow: hidden;
    i {
        position: absolute;
        left: 20px;
        top: 0px;
        font-size: 20px;
    }
}
</style>
