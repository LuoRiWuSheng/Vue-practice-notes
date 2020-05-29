<template>
  <div>
 
      <h3>文章列表</h3>
      <div>
        <button @click='create'>新增</button>
      </div>
      <table>
        <tr>
          <td>序号</td>
          <td>名称</td>
          <td>创建时间</td>
        </tr>
        <tr v-for="item in list" :key='item.id'>
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.createTime}}</td>
          <td><button @click='edit(item)'>编辑</button></td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true,
      list: [
        {
          id: 1,
          title: 'vue从入门到实战',
          createTime: '2019-10-22'
        },
        {
          id: 2,
          title: 'vue-router',
          createTime: '2020-10-22'
        },
        {
          id: 3,
          title: 'vue从入门到实战',
          createTime: '2019-5-22'
        }
      ]
    }
  },
  methods: {
    create () {
      this.$router.push('/article/create')
    },
    edit (item) {
      this.$router.push({ path: '/article/edit', query: item})
    }
  }
}
</script>
