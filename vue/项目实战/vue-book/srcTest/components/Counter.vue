<template>
    <div>
        <h3>计数器</h3>
        加：<button @click="decrement">-</button>
        <br>
        当前： <span>{{this.$store.state.count}}</span>
        <br>
        减：<button @click="increment">+</button>

        {{$store.getters.val}}
    </div>
</template>

<script>
    import * as Types from '../store/mutationsType.js'
    export default {
        name: 'Counter',
        methods: {
            increment() {
                // 提交add 的mutation
                this.$store.commit(Types.INCREMENT)
            },
            decrement() {
                this.$store.commit(Types.DECREMENT)
            }
        }
    }
</script>

<style scoped>

</style>
