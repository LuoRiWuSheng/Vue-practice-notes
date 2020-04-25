<template>
  <li :class="{completed: todo.done, editing: editing}" class="todo">
    <div class="view">
      <input type="checkbox" class="toggle" :checked="todo.done" @change="toggleTodo(todo)">
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo(todo)" />
    </div>

    <!-- 双击以后的编辑框 -->
    <input v-show="editing" v-focus="editing" type="text" :value="todo.text" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" @blur="doneEdit">
  </li>
</template>

<script>
export default {
  name: 'Todo',
  directives: {
    async focus (el, { value }, { context }) {
      if (value) {
        await context.$nextTick()
        el.focus()
      }
    }
  },
  props: {
    todo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    deleteTodo (todo) {
      this.$emit('deleteTodo', todo)
    },
    toggleTodo (todo) {
      this.$emit('toggleTodo', todo)
    },
    editTodo ({ todo, value }) {
      this.$emit('editTodo', { todo, value })
    },
    doneEdit (e) {
      const value = e.target.value.trim()
      const { todo } = this
      // 空值
      if (!value) {
        this.deleteTodo({
          todo
        })
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.text = this.todo.text
      this.editing = false
    }
  }
}
</script>
