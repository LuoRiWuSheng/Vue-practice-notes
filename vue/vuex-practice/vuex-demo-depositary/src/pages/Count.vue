<template>
	<div>
		<h3>加减</h3>
		<hr />
		<div>{{count}}--直接在双括号中使用-->{{$store.state.count}}</div>
		<div>通过 mapState获取--》 {{count2}}</div>
		<div>通过 getters获取--> {{$store.getters.count3}}</div>
		<div>同样 mapGetters只是对 getters的一个简化操作 -->{{count4}}----直接通过$store去获取，可以写入computed中，一种获取数据的方式，{{$store.getters.count3}}</div>
		<div>
			<button @click="$store.commit('add')">+</button>
			<button @click="subtraction">-</button>
			<button @click="reduce(12)">直接使用recue做减法</button>
		</div>
		<h4>通过3种方式修改并且获取vuex中的数据</h4>
		<ol>
			<li>通过计算属性 computed获取vuex中的数据 this.$route.state.count</li>
			<li>直接在双括号中使用 $route.state.count获取</li>
			<li>通过导入 mapState获取</li>
			<li>通过定义 getters，对state中的数据进行缓存，通过this.$store.getters.count3获取</li>
		</ol>
		<hr />
		<h3>修改vuex仓库中的state数据的方式</h3>
		<ol>
			<li>直接在 @click上面 通过 @click="$sote.commit('add')" 就行，注意单双引号</li>
			<li>通过在methos中定义方法，实质和第一种一样的，直接将方法都归类到methos中</li>
			<li>通过 mapMutations的方式进行修改，且方法名称和mutations.js中定义的保持一致，支持payload载荷传参</li>
		</ol>
		<hr />
		<h3>Actions异步的方式去修改store中的state数据</h3>
		{{count}}
		<div><button @click="$store.dispatch('addAction')">减去150--通过调用$store.dispatch分发</button>
			<button @click="$store.dispatch('addAction2')">减50-通过调用$store.dispatch分发</button>
			<button @click="addAction2">通过mapActions进行调用--减50</button>
		</div>
	</div>
	
	
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
	export default {
		name: "Count",
		data() {
			return {
				
			}
		},
		methods: {
			// 这种是重新定义个方法名称，方法中去调用reduce这个mutations
			subtraction() {
				this.$store.commit("reduce", 10)
			},
			// 对象的解构，是为了和methods中的自定义方法合并到一起
			...mapMutations(["reduce"]),
			// 下面可以重命名 reduce，再调用
			// ...mapMutations({ownReduce: 'reduce'})
			
			...mapActions(["addAction", "addAction2"])
			// ...mapActions({add2: "addAction2"}) // 更改名称
		},
		computed: {
			// 在这里定义个属性，名字随便，返回的是 store仓库中的count就行
			count() {
				// this是必须要的
				return this.$store.state.count
			},
			// 通过这种对象展开的方式，将我们不需要的 属性（即普通的coputed）与 vuex中的属性进行混合，能够在同一个computed对象中共存
			...mapState({
				count2: state => state.count,
			}),
			...mapGetters({
				count4: "count3"
			
			})
		},
		
		components: {}
	}
</script>

<style scoped>
</style>