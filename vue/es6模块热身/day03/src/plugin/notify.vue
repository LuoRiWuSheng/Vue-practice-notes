<template>
	<div class="notify">
		{{value}}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: ""
			}
		}
	}
</script>

<style scoped>
	.notify {
		width: 100px;
		height: 40px;
		background: rgba(0,0,0,0.5);
		border-radius: 10px;
		color: #FFF;
		text-align: center;
		line-height: 40px;
	}
</style>