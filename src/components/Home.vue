<template>
	<div>
		<el-button type=primary @click="btn">退出</el-button>
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	},
	methods: {
		btn () {
			window.sessionStorage.clear()
			this.$router.push('/login')
		}
	}
}
</script>

<style>
</style>