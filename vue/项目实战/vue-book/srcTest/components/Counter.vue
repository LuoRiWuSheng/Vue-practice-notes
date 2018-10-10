<template>
    <div>
        <h3>计数器</h3>
        加：<button @click="decrement">-</button>
        <br>
        当前： <span>{{this.$store.state.count}}</span>
        <br>
        减：<button @click="increment">+</button>
    </div>
</template>

<script>
    export default {
        name: 'Counter',
        methods: {
            increment() {
                // 提交add 的mutation
                this.$store.commit('add', 12)
            },
            decrement() {
                this.$store.commit('minus')
            }
        }
    }
</script>

<style scoped>

</style>
