<template>
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input type="checkbox" class="toggle" v-model="todo.completed">
        <label >{{todo.content}}</label>
        <button class="destory" @click="deleteTodo"></button>
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

<style lang="stylus" scoped>
    .todo-item
        position relative
        background: #FFF
        font-size 24px
        border-bottom 1px solid rgba(0,0,0,0.6)
        &:hover 
            .destory:after {
                content: "x"
            }
        label {
            display block
            line-height 1.2
            padding 15px 60px 15px 15px
            margin-left 45px
            white-space pre-line
            word-break break-all
            transition color 0.4s
        }
        &.completed {
            label {
                color: #d9d9d9
                text-decoration line-through
            }
        }
    .toggle {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin: auto 0;
        border: none;
        appearance: none;
        outline: none;
        padding-left: 5px;
        cursor: pointer;
        &:after {
            content:  url('../asserts/images/round.svg')
        }
        &:checked:after {
            content: url('../asserts/images/done.svg')
        }
    }
    /*通过伪类形成 x 这个符号，然后在下面这里给上颜色*/
    .destory {
        position absolute
        top 0
        right: 10px
        width 40px
        height 40px
        margin auto 0
        font-size 30px
        color #CC9a9a
        margin-bottom: 11px
        transition: color 0.2s ease-out;
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }
</style>
