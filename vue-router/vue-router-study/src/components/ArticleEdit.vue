<template>
  <div>
    <div>
      <button @click='goBack'>返回列表页面</button>
      <button @click='goEdit'>新增--从编辑页面跳转到新增页面，路由钩子created和mounted是不会再执行的</button>
    </div>
    标题--{{title}}
    
    <form>
      <div>
        <label for="">标题：</label> <input type="text" v-model='articleTitle'>
        
      </div>
      <div>
        <label for="">创建时间</label> <input type="text" v-model='createTime'>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '编辑',
      articleTitle: '',
      createTime: ''
    }
  },
  created() {
    // 是否能获取到
    console.log('created');
    let {createTime, title} = this.$route.query
    console.log(createTime, title);
  },
  mounted() {
    console.log('mouted');
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    let {id }= to.params
    console.log("id", id);
    if(!id) {
      // 新增
      this.title = '新增'
    }
    next()
  },
  methods: {
    goBack() {
      this.$router.push('/article')
    },
    goEdit() {
      this.$router.push('/article/edit')
    }
  }
}
</script>

<style>

</style>