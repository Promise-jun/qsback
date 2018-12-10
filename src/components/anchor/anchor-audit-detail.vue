<template>
	<div class="children-view user-detail">
		<el-row>
		  	<el-col :span="24" class="title">主播审核</el-col>
		</el-row>

		<el-row class="basic-info" :gutter="20">
		  	<el-col :span="16">
		  		<el-card>
		  			<el-row :gutter="20" class="module">
					  	<el-col :span="8">
					  		<div class="user-head">
					  			<img :src="imageUrl">
					  		</div>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>昵称：</label>
					  			<span>情说12039026</span>
					  		</p>
					  		<p>
					  			<label>用户名：</label>
					  			<span>1039203029</span>
					  		</p>
					  		<p>
					  			<label>用户ID：</label>
					  			<span>2019</span>
					  		</p>
					  		<p>
					  			<label>手机号：</label>
					  			<span>12949020391</span>
					  		</p>
					  		<p>
					  			<label>性别：</label>
					  			<span>-</span>
					  		</p>
					  		<p>
					  			<label>身高：</label>
					  			<span>180cm</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>姓名：</label>
					  			<span>-</span>
					  		</p>
					  		<p>
					  			<label>身份证：</label>
					  			<span>330721199206022414</span>
					  		</p>
					  		<p>
					  			<label>所在地：</label>
					  			<span>浙江-杭州</span>
					  		</p>
					  		<p>
					  			<label>年龄：</label>
					  			<span>26岁</span>
					  		</p>
					  		<p>
					  			<label>生日：</label>
					  			<span>2018-01-26</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-card>
				  	<div slot="header" class="clearfix">
					    <span>其他信息</span>
					</div>
					<el-row :gutter="10" class="module audit-other-info">
					  	<el-col :span="12">
					  		<p>
					  			<label>相册：</label>
					  			<span>8</span>
					  		</p>
					  		<p>
					  			<label>绑定：</label>
					  			<span>
					  				--
					  			</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>类型：</label>
					  			<span>注册用户</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>个人信息</span>
		  	</div>
		  	<el-row>
		  		<el-col :span="8">
		  			<p>
			  			<label>职业：</label>
			  			<span>设计师</span>
			  		</p>
			  		<p>
			  			<label>节目数量：</label>
			  			<span>2</span>
			  		</p>
		  		</el-col>
		  		<el-col :span="8">
		  			<p>
			  			<label>兴趣爱好：</label>
			  			<span>--</span>
			  		</p>
			  		<p>
			  			<label>收到喜欢：</label>
			  			<span>20</span>
			  		</p>
		  		</el-col>
		  		<el-col :span="8">
		  			<p>
			  			<label>情感状态：</label>
			  			<span>保密</span>
			  		</p>
			  		<p>
			  			<label>是否推荐：</label>
			  			<span>推荐</span>
			  		</p>
		  		</el-col>
		  		<el-col :span="24">
		  			<p>
			  			<label>个人简介：</label>
			  			<span>我是一名业务主播，我喜欢打游戏，看电影，泡剧，你喜欢我就pick我啊！我是一名业务主播，我喜欢打游戏，看电影，泡剧，你喜欢我就pick我啊！</span>
			  		</p>
		  		</el-col>
		  	</el-row>
		</el-card>
		
		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>实名认证</span>
		  	</div>
		  	<el-row>
		  		<el-col :span="8">
		  			<p>
			  			<label>姓名：</label>
			  			<span>哈哈哈</span>
			  		</p>
		  		</el-col>
		  		<el-col :span="8">
		  			<p>
			  			<label>身份证：</label>
			  			<span>33039432842934882348</span>
			  		</p>
		  		</el-col>
		  		<el-col :span="8">
		  			<p>
			  			<label>提交时间：</label>
			  			<span>2019-01-01 10:12:23</span>
			  		</p>
		  		</el-col>
		  	</el-row>
		</el-card>

		<div>
			<el-button type="primary">审核通过</el-button>
			<el-button type="danger">拒绝审核</el-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'anchorAuditDetail',
		data() {
			return {
				imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg',
			}
		}
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
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
	.box-card {
		& p {
			padding: 8px 0;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: #303030;
		}
	}
</style>