<template>
    <div class="detail">
        <MHeader :back="true">{{bid}}详情页</MHeader>
        <div class="content">
            <ul>
                <li>
                    <label for="bookName">书名:</label>
                    <input type="text" v-model="book.bookName" id="bookName">
                </li>
                <li>
                    <label for="bookPrice">价格:</label>
                    <input type="text" v-model.number="book.bookPrice" id="bookPrice">
                </li>
                <li>
                    <label for="bookInfo">书的信息:</label>
                    <input type="text" v-model="book.bookInfo" id="bookInfo">
                </li>
            </ul>
            <button @click="updata">确认修改</button>
        </div>
    </div>
</template>

<script>
    import MHeader from '@/base/MHeader'
    import {findOneBook, updateBook} from '../api'

    export default {
        name: 'Detail',
        data() {
            return {
                book: {}
            }
        },
        watch: {
            $route() {
                this.getData()
            }
        },
        computed: {
            bid() {
                return this.$route.params.bid // 获取路径中的bid
            }
        },
        components: {
            MHeader
        },
        methods: {
             async getData() {
                 // 通过id找到某一本具体的书的信息
                 this.book = await findOneBook(this.bid)

                 // 如果是空对象，就返回列表页
                 // 2种方式： 1、JSON.stringify(this.books) === '{}'
                 // 2、 this.books[0].bookId === undefined

                Object.keys(this.book).length > 0? void 0: this.$router.push("/list")
             },
              async updata() {
                  await updateBook(this.bid, this.book)
                  this.$router.push('/list')
              }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="less">
    .detail {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: #FFF;
          z-index: 100;

          ul {
              margin: 50px 10px 0 10px;

              label {
                  display: block;
                  font-size: 25px;
              }
              input {
                  margin: 10px 0;
                  height: 25px;
                  width: 100%;
              }
          }
          button {
              display: block;
              width: 100px;
              height: 30px;
              border: none;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
              border-radius: 10px;
              color: #FFF;
              background: #1833ff;
          }
      }
</style>
