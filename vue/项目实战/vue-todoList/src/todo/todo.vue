<template>
    <section class="real-app">
        <input type="text" name="" autofocus placeholder="接下去要做什么" @keyup="addTodo" id="" class="add-input">
        <Item :todo="todo" />
        <Tabs :filter="filter"/>
    </section>
</template>

<script>
import Item from "./item.vue"
import Tabs from "./tabs.vue"

export default {
    data() {
        return {
            todo: {
                computed: false,
                content: "this is todo",
                filter: "all"
            }
        }
    },
    methods: {
        addTodo() {

        }
    },
    components: {
        Item,
        Tabs
    }
}
</script>

<style lang="stylus" scoped>

</style>

