<template>
	<div class="children-view user-detail">
		<el-row>
		  	<el-col :span="24" class="title">导师审核</el-col>
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
					  			<label>微信号：</label>
					  			<span>wolegejun</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>类型：</label>
					  			<span>注册用户</span>
					  		</p>
					  		<p>
					  			<label>推荐人：</label>
					  			<span>周一林</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>
					  			<label>如何了解到我们：</label>
					  			<span>微信朋友圈</span>
					  		</p>
					  		<p>
					  			<label>绑定：</label>
					  			<span>
					  				--
					  			</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="12">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
					    <span>实名认证</span>
					</div>
		  			<el-row :gutter="10">
					  	<el-col :span="12">
					  		<p>
					  			<label>姓名：</label>
					  			<span>黄思哦</span>
					  		</p>
					  		<p>
					  			<label>证件类型：</label>
					  			<span>大陆身份证</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>提交时间：</label>
					  			<span>2018-09-01 18:39:30</span>
					  		</p>
					  		<p>
					  			<label>证件号：</label>
					  			<span>201930249039038001</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="24">
					  		<p class="pic-box">
					  			<label>证件照片：</label>
					  			<ul>
					  				<li v-for="item in picList" @click="showBigPic(item.url)">
					  					<img :src="item.url" alt="">
					  				</li>
					  			</ul>
					  		</p>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		  	<el-col :span="12">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
					    <span>学习经历</span>
					</div>
					<el-row :gutter="10">
					  	<el-col :span="12">
					  		<p>
					  			<label>毕业学校：</label>
					  			<span>浙江大学</span>
					  		</p>
					  		<p>
					  			<label>学历：</label>
					  			<span>博士</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>专业：</label>
					  			<span>心理学</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="24">
					  		<p class="pic-box">
					  			<label>学历证书：</label>
					  			<ul>
					  				<li v-for="item in picList" @click="showBigPic(item.url)">
					  					<img :src="item.url" alt="">
					  				</li>
					  			</ul>
					  		</p>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
					    <span>培训经历</span>
					</div>
					<el-row>
						<el-col :span="12">
							<p>
					  			<label>开始时间：</label>
					  			<span>2010-10-10</span>
					  		</p>
						</el-col>
						<el-col :span="12">
							<p>
					  			<label>结束时间：</label>
					  			<span>2011-05-01</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>受训内容：</label>
					  			<span>就是开始懒风哈啊我们下面走走期间傲娇去洪洞哦啊减肥</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p class="pic-box">
					  			<label>学历证书：</label>
					  			<ul>
					  				<li v-for="item in picList" @click="showBigPic(item.url)">
					  					<img :src="item.url" alt="">
					  				</li>
					  			</ul>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
					    <span>咨询师介绍</span>
					</div>
					<el-row>
						<el-col :span="6">
							<p>
					  			<label>职业背景：</label>
					  			<span>全职</span>
					  		</p>
						</el-col>
						<el-col :span="6">
							<p>
					  			<label>从业时间：</label>
					  			<span>2010-10-01</span>
					  		</p>
						</el-col>
						<el-col :span="6">
							<p>
					  			<label>咨询风格：</label>
					  			<span>耐心，和谐，热诚</span>
					  		</p>
						</el-col>
						<el-col :span="6">
							<p>
					  			<label>累计个案（小时）：</label>
					  			<span>300</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>擅长类型：</label>
					  			<el-tag>亲子关系</el-tag>
					  			<el-tag>职场关系</el-tag>
					  			<el-tag>婚姻恋爱</el-tag>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>专业背景：</label>
					  			<span>国家心理咨询师培训师，企业EAP咨询师</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>个人简介：</label>
					  			<span>你好，我是你风里来雨里去的守护者，很高兴帮助您</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>经验介绍：</label>
					  			<span>国家二级咨询师，2010年从事班学习</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p class="pic-box">
					  			<label>资质证书：</label>
					  			<ul>
					  				<li v-for="item in picList" @click="showBigPic(item.url)">
					  					<img :src="item.url" alt="">
					  				</li>
					  			</ul>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
					    <span>资质信息列表（共2条）</span>
					</div>
					<el-row>
						<el-col :span="12">
							<p>
					  			<label>资质认证：</label>
					  			<span>国家二级心理咨询师</span>
					  		</p>
						</el-col>
						<el-col :span="12">
							<p>
					  			<label>资质编号：</label>
					  			<span>203929939001093901</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p class="pic-box">
					  			<label>资质证书：</label>
					  			<ul>
					  				<li v-for="item in picList" @click="showBigPic(item.url)">
					  					<img :src="item.url" alt="">
					  				</li>
					  			</ul>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<div>
			<el-button type="primary">审核通过</el-button>
			<el-button type="danger">拒绝审核</el-button>
		</div>
			
		<big-pic :visible.sync="bigPicVisible" :picurl="bigPicUrl"></big-pic>
	</div>
</template>

<script type="text/javascript">
	import BigPic from 'base/big-pic/big-pic' //查看大图
	
	export default {
		name: 'mentorAuditDetail',
		data() {
			return {
				imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg',
				picList: [
					{
						url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg'
					},
					{
						url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=377934783,1794723300&fm=27&gp=0.jpg'
					}
				],
				bigPicVisible: false,
				bigPicUrl: ''
			}
		},
		methods: {
			showBigPic(picUrl) {
				this.bigPicUrl = picUrl
				this.bigPicVisible = true
			}
		},
		components: {
			BigPic
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
		margin: 0;
		& p {
			padding: 8px 0;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: #303030;
		}
	}
</style>