<template>
	<el-dialog title="图片" :visible.sync="visible" :center="true" :modal="false" :before-close="hidePanel">
	  	<img :src="picurl" class="big-pic">
	</el-dialog>
</template>

<script type="text/javascript">
	
	export default {
		name: 'bigPic',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			picurl: {
				type: String,
				default: ''
			}
		},
		methods: {
			hidePanel() {
	          	this.$emit('update:visible', false)
	      	},
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.big-pic {
		width: 100%;
		display: block;
		margin: 0 auto;
	}
</style>