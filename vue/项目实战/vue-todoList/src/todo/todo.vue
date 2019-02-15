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
            // 子组件Tab将它的状态["all", "active", "completed"] 告诉父组件，父组件通过 动态属性的方式传递给子组件
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
.real-app {
    width 600px;
    margin 0 auto
    box-shadow 0 0 5px #666

    .add-input {
        width inherit
        margin 0;
        padding 16px 16px 16px 36px;
        font-size 24px
        font-weight inherit
        font-family inherit
        line-height 1.4em
        border none
        color inherit
        box-sizing border-box
        box-shadow inset 0 -2px 1px rgba(0,0,0,0.03)
    }
}
</style>

