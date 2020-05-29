<template>
  <div>
    父组件
    <Son />
    <Son2 :count="count" :getCount="fatherAdd" />
    {{ count }}

    <div>
      <Son3 @changeToRed='changeColor'/>
      <p :style='{color}'>父组件中指定的颜色</p>
    </div>
  </div>
</template>

<script>
import Son from './components/son'
import Son2 from './components/Son2'
import Son3 from './components/Son3'

export default {
  components: {
    Son,
    Son2,
    Son3
  },
  data () {
    return {
      count: 0,
      color: '#00ff00'
    }
  },
  methods: {
    say () {
      console.log('调用父组件的say方法')
    },
    fatherAdd (n) {
      this.count = this.count + n
    },
    // 父组件的方法
    changeColor(color) {
      this.color = color
    }
  }
}
</script>
