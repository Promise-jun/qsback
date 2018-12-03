<template>
	<div class="children-view">
		<el-row>
		  	<el-col :span="12">
		  		<span class="title">用户详情</span>
		  	</el-col>
  			<el-col :span="12" style="text-align: right;">
  				<el-button>禁言用户</el-button>
  				<el-button>禁用用户</el-button>
  			</el-col>
		</el-row>

		<el-card class="box-card">
			
		</el-card>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'userDetail'
	}
</script>

<style type="text/css" lang="scss" scoped>
	.children-view {
		position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 100;
	    background-color: #fff;
	    padding: 20px;
	    overflow-y: auto;
	}
	.title {
		font-size: 24px;
		color: #409EFF;
		line-height: 40px;
	}
	.el-card {
		margin: 20px 0;
	}
</style>