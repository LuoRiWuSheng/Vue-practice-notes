<template>
  <section class="todoapp">
    <div class="header">
      <input type="text" class="new-todo" autocomplete="off" placeholder="todo list" @keyup.enter="addTodo">
    </div>

    <div v-show="todos.length" class="main">
      <input id="toggle-all" type="checkbox" class="toggle-all" :checked="allChecked" @change="toggleAll({done: !allChecked})">
      <label for="toggle-all" />
      <ul class="todo-list">
        <Todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo" @toggleTodo="toggleTodo" @editTodo="editTodo" @deleteTodo="deleteTodo" />
      </ul>
    </div>

    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for='(val, key) in filters' :key='key'>
          <a :class='{selected: visibility === key}' @click.prevent='visibility = key'>{{key | capitalize}}</a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script>
import Todo from './Todo'

// 这里的是作为属性使用，无法访问到实例的this
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  complted: todos => todos.filter(todo => todo.done)
}

const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]

const STORAGE_KEY = 'todos'

export default {
  name: 'TodoList',
  components: {
    Todo
  },
  filters: {
    // n是当前的值， w是pluralize过滤器传的参数 item
    pluralize (n, w) {
      return n === 1 ? w : w + 's'
    },
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data () {
    return {
      visibility: 'all',
      filters,
      todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
    }
  },
  computed: {
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    // 剩余多少没做完
    remaining () {
      return this.todos.filter(todo => todo.done).length
    }
  },
  methods: {
    setLocalStorage () {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    // 新增
    addTodo (e) {
      const text = e.target.value

      if (text && text.trim()) {
        this.todos.push({
          text,
          done: false
        })

        this.setLocalStorage()

        e.target.value = ''
      }
    },
    toggleAll ({ done }) {
      this.todos = this.todos.map((p) => {
        p.done = done
        return p
      })
      this.setLocalStorage()
    },
    // 切换，这里val是一个引用，所以，直接改值，就不需要遍历整个todos
    toggleTodo (val) {
      val.done = !val.done
      this.setLocalStorage()
    },
    editTodo ({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
    },
    deleteTodo (todo) {
      this.todos = this.todos.filter(p => p.text !== todo.text)
      this.setLocalStorage()
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
