<template>
	<div>
		<el-row :gutter="20">
		  	<el-col :span="10">
		  		<p>
		  			<label>关注：</label>
		  			<span>0</span>
		  		</p>
		  		<p>
		  			<label>粉丝：</label>
		  			<span>10</span>
		  		</p>
		  		<p>
		  			<label>收到喜欢：</label>
		  			<span>3</span>
		  		</p>
		  	</el-col>
	  	</el-row>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'interactInfo'
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