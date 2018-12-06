<template>
	<div>
		<el-row :gutter="20">
		  	<el-col :span="10">
		  		<p>
		  			<label>注册时间：</label>
		  			<span>2018-11-28 09:15:23</span>
		  		</p>
		  		<p>
		  			<label>最后登录时间：</label>
		  			<span>--</span>
		  		</p>
		  		<p>
		  			<label>最后登录端：</label>
		  			<span>--</span>
		  		</p>
		  		<p>
		  			<label>渠道：</label>
		  			<span>PC端</span>
		  		</p>
		  		<p>
		  			<label>业务归属：</label>
		  			<span>--</span>
		  		</p>
		  	</el-col>
		  	<el-col :span="10">
		  		<p>
		  			<label>注册IP：</label>
		  			<span>115.192.38.239</span>
		  		</p>
		  		<p>
		  			<label>最后登录IP：</label>
		  			<span>--</span>
		  		</p>
		  		<p>
		  			<label>历史登录次数：</label>
		  			<span>0</span>
		  		</p>
		  		<p>
		  			<label>来路：</label>
		  			<span>--</span>
		  		</p>
		  		<p>
		  			<label>推广归属：</label>
		  			<span>--</span>
		  		</p>
		  	</el-col>
	  	</el-row>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'ditchInfo'
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