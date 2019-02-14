<template>
    <section class="real-app">
        <input type="text"  autofocus placeholder="接下去要做什么" @keyup.enter="addTodo" class="add-input">
        <Item v-for="todo in filtedTodos" :key="todo.id" :todo="todo" @del="deleteTodo"/>
        <Tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAll="clearAllCompleted"></Tabs>
    </section>
</template>

<script>
import Item from "./item.vue"
import Tabs from "./tabs.vue"
let id = 0;

export default {
    data() {
        return {
            todos: [],
            filter: "all"
        }
    },
    methods: {
        addTodo(e) {
            if(e.target.value.trim() === "") {
                return
            }

            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false
            })
            e.target.value = ""
        },
        deleteTodo(id) {
            this.todos = this.todos.filter(item=> item.id !== id)
        },
        toggleFilter(state) {
            console.log(state)
            this.filter = state
        },
        clearAllCompleted() {
            this.todos = this.todos.filter(todo=> !todo.completed)
        }
    },
    computed: {
        filtedTodos() {
            if(this.filter === "all") {
                return this.todos
            }

            const completed = this.filter === "completed"
            return this.todos.filter(todo=> todo.completed === completed)
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

