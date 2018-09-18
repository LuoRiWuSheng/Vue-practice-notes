<template>
    <div class='hello'>
        <h1>{{ msg }}</h1>
        <h2>开始</h2>
        <el-button @click='login'>登录</el-button>
    </div>
</template>

<script>
import { requestLogin } from '@/api/user'

export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        login () {
            requestLogin({ name: 'zhangs1212' }).then(data => {
                console.log(data)
                this.$alert(data)
            })
        }
    }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
