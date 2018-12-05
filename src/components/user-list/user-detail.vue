<template>
	<div class="children-view user-detail">
		<el-row>
		  	<el-col :span="24" class="title">用户详情</el-col>
		</el-row>

		<el-row class="basic-info" :gutter="20">
		  	<el-col :span="16">
		  		<div></div>
		  	</el-col>
		  	<el-col :span="8">
		  		<div></div>
		  	</el-col>
		</el-row>
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
	    top: 60px;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 100;
	    background-color: #EEF1F6;
	    padding: 20px;
	    overflow-y: auto;
	}
	.el-card {
		margin: 20px 0;
	}
</style>