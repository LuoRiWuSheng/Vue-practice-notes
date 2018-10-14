<template>
    <div>
        <MHeader>购物车</MHeader>
        <div class="content">
            <ul>
                <li v-for="(book, index) in cartList" :key="index">
                    <img :src="book.bookCover" alt="">
                    <div class="descipt">
                        <h4>{{book.bookName}}</h4>
                        <p>{{book.bookInfo}}</p>
                        <b>{{book.bookPrice}}</b>
                        <b>数量：{{book.bookCount}}</b>
                    </div>
                </li>
            </ul>
            <div>
                总共{{count}}本，总价：{{price}}
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex';
    import MHeader from '@/base/MHeader'

    export default {
        name: 'Collection',
        data() {
            return {
                collections: []
            }
        },
        computed: {
            ...mapGetters(['count']),
            ...mapState(['cartList']),
            price() {

                return this.cartList.reduce((prev, next)=> prev + (next.bookCount*next.bookPrice),0)
            }
        },
        components: {
            MHeader
        }
    }
</script>

<style scoped lang="less">
    .content {
        ul {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            li {
                display: flex;
                width: inherit;
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid #CCC;
                img {
                    flex-shrink: 0;
                    width: 130px;
                    height: 140px;
                    margin-right: 20px;

                }
                .descipt {
                    width: calc(100% - 130px);
                }
                h4 {
                    font-size: 18px;
                    line-height: 25px;
                }
                p {
                    color: #2a2a2a;
                    line-height: 20px;
                }
                b {
                    color: #F00;
                }
                button {
                    display: block;
                    width: 60px;
                    height: 20px;
                    color: #FFF;
                    border: none;
                    border-radius: 5px;
                    background: crimson;
                }
            }
        }
    }
</style>
