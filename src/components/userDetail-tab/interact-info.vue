<template>
	<div v-loading="loading">
		<el-row :gutter="20">
		  	<el-col :span="10">
		  		<p>
		  			<label>关注：</label>
		  			<span>{{info.attetionNum}}</span>
		  		</p>
		  		<p>
		  			<label>粉丝：</label>
		  			<span>{{info.attetionedNum}}</span>
		  		</p>
		  		<p>
		  			<label>收到喜欢：</label>
		  			<span></span>
		  		</p>
		  	</el-col>
	  	</el-row>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'interactInfo',
		props: {
			userId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				loading: false,
				info: {}
			}
		},
		created() {
			this.getIndo()
		},
		methods: {
			getIndo() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/anchor/getAnchorInteraction',
					data: this.$qs.stringify({
						userId: this.userId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.info = result.data
						console.log(result)
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	p {
		padding: 12px 0;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #303030;
	}
</style>