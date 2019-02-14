<template>
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input type="checkbox" name="" class="toggle" v-model="todo.completed">
        <label for="">{{todo.content}}</label>
        <button class="destory" @click="deleteTodo">X</button>
        </div>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteTodo() {
            this.$emit("del", this.todo.id)
        }
    }
}
</script>
