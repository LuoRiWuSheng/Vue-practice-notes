<template>
	<div>
		foo界面 <br>
		{{$route.params.p}}
	</div>
</template>

<script>
	export default {
		name: 'Foo',
		data () {
			return {
				msg: 1
			}
		}
	}
</script>