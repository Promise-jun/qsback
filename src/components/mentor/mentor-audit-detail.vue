<template>
	<div class="children-view user-detail" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">导师审核</el-col>
		</el-row>

		<el-row class="basic-info" :gutter="20">
		  	<el-col :span="16">
		  		<el-card>
		  			<el-row :gutter="20" class="module">
					  	<el-col :span="8">
					  		<div class="user-head">
					  			<img :src="baseInfo.photoUrl">
					  		</div>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>昵称：</label>
					  			<span>{{baseInfo.nickName}}</span>
					  		</p>
					  		<p>
					  			<label>用户号：</label>
					  			<span>{{baseInfo.userCode}}</span>
					  		</p>
					  		<p>
					  			<label>手机号：</label>
					  			<span>{{baseInfo.phone}}</span>
					  		</p>
					  		<p>
					  			<label>性别：</label>
					  			<span v-if="baseInfo.userSex == 0">未知</span>
					  			<span v-if="baseInfo.userSex == 1">男</span>
					  			<span v-if="baseInfo.userSex == 2">女</span>
					  		</p>
					  		<p>
					  			<label>身高：</label>
					  			<span>{{baseInfo.userHeight}}cm</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>姓名：</label>
					  			<span>{{baseInfo.realName}}</span>
					  		</p>
					  		<p>
					  			<label>身份证：</label>
					  			<span>{{baseInfo.materialNumberl}}</span>
					  		</p>
					  		<p>
					  			<label>所在地：</label>
					  			<span>{{baseInfo.city}}</span>
					  		</p>
					  		<p>
					  			<label>年龄：</label>
					  			<span>{{baseInfo.userAge}}</span>
					  		</p>
					  		<p>
					  			<label>生日：</label>
					  			<span>{{baseInfo.birthday | dateformat('YYYY-MM-DD')}}</span>
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
					  			<span></span>
					  		</p>
					  		<p>
					  			<label>微信号：</label>
					  			<span>{{baseInfo.wechat}}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>类型：</label>
					  			<span></span>
					  		</p>
					  		<p>
					  			<label>推荐人：</label>
					  			<span>{{baseInfo.referee}}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>
					  			<label>如何了解到我们：</label>
					  			<span>{{baseInfo.knowChannel}}</span>
					  		</p>
					  		<p>
					  			<label>绑定：</label>
					  			<span></span>
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
					  			<span>{{baseInfo.graduateInstitutions}}</span>
					  		</p>
					  		<p>
					  			<label>学历：</label>
					  			<span>{{baseInfo.education}}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>专业：</label>
					  			<span>{{baseInfo.major}}}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="24">
					  		<p class="pic-box">
					  			<label>学历证书：</label>
					  			<ul>
					  				<li @click="showBigPic(baseInfo.educationUrl)">
					  					<img :src="baseInfo.educationUrl" alt="">
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
					<el-row v-for="item in trainList" :key="item.educationId">
						<el-col :span="12">
							<p>
					  			<label>开始时间：</label>
					  			<span>{{item.startDate | dateformat('YYYY-MM-DD')}}</span>
					  		</p>
						</el-col>
						<el-col :span="12">
							<p>
					  			<label>结束时间：</label>
					  			<span>{{item.endDate | dateformat('YYYY-MM-DD')}}</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>受训内容：</label>
					  			<span>{{item.content}}</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p class="pic-box">
					  			<label>学历证书：</label>
					  			<ul>
					  				<li @click="showBigPic(item.educationPictureUrl)">
					  					<img :src="item.educationPictureUrl" alt="">
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
					  			<span v-if="baseInfo.workType == 0">兼职</span>
					  			<span v-else-if="baseInfo.workType == 1">全职</span>
					  		</p>
						</el-col>
						<el-col :span="6">
							<p>
					  			<label>从业时间：</label>
					  			<span>{{baseInfo.workTm | dateformat('YYYY-MM-DD')}}</span>
					  		</p>
						</el-col>
						<el-col :span="6">
							<p>
					  			<label>咨询风格：</label>
					  			<span></span>
					  		</p>
						</el-col>
						<el-col :span="6">
							<p>
					  			<label>累计个案（小时）：</label>
					  			<span>{{baseInfo.cumulativeLength}}</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>擅长类型：</label>
					  			<!-- <el-tag>亲子关系</el-tag> -->
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>专业背景：</label>
					  			<span>{{baseInfo.professionalBackground}}</span>
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
					    <span>资质信息列表</span>
					</div>
					<el-row v-for="item in aptitudeList" :key="item.materialId">
						<el-col :span="12">
							<p>
					  			<label>资质认证：</label>
					  			<span>{{item.represent}}</span>
					  		</p>
						</el-col>
						<el-col :span="12">
							<p>
					  			<label>资质编号：</label>
					  			<span>{{item.materialNumber}}</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p class="pic-box">
					  			<label>资质证书：</label>
					  			<ul>
					  				<li @click="showBigPic(item.materialUrl)">
					  					<img :src="item.materialUrl" alt="">
					  				</li>
					  			</ul>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<div v-if="auditingInfo.status == 0">
			<el-button type="primary" @click="auditingSuccess">审核通过</el-button>
			<el-button type="danger" @click="auditingRefuse">拒绝审核</el-button>
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
				loading: false,
				imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg',
				picList: [
					{
						url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg'
					},
					{
						url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=377934783,1794723300&fm=27&gp=0.jpg'
					}
				],
				baseInfo: {}, //基本信息
				aptitudeList: [], //资质列表
				trainList: [], //受训背景
				auditingInfo: {
					consultantApplyId: '',
					status: '0', //1:审核通过, 2:审核不通过
					reason: ''
				},
				bigPicVisible: false,
				bigPicUrl: ''
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/apply/findApplyDetail',
					data: this.$qs.stringify({
						consultantApplyId: this.$route.query.consultantApplyId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
			        	this.baseInfo = result.data
			        	this.getAptitude(result.data.userId)
			        	this.getTrain(result.data.userId)
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
			},
			// 获取资质列表
		    getAptitude(userId) {
	    		this.$axios({
	    			method: 'post',
	    			url: '/system/merchant/material/findByUserId',
	    			data: this.$qs.stringify({
	    				userId: userId,
	    				materialType: 0
	    			})
	    		}).then(res => {
	    			let result = res.data
	    			if (result.code == 200) {
	    				this.aptitudeList = result.data
	    			} else {
	    				this.$message.error(result.msg);
	    			}
	    		}).catch(err => {
	    			console.log(err)
	    		})
		    },
		    //获取受训背景列表
		    getTrain(userId) { 
	    		this.$axios({
	    			method: 'post',
	    			url: '/system/merchant/education/findByUserId',
	    			data: this.$qs.stringify({
	    				userId: userId
	    			})
	    		}).then(res => {
	    			let result = res.data 
	    			if (result.code == 200) {
	    				this.trainList = result.data
	    			} else {
	    				this.$message.error(result.msg);
	    			}
	    		}).catch(err => {
	    			console.log(err)
	    		})
		    },
		    //审核通过
			auditingSuccess() {
				this.$confirm('是否确定通过审核？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.auditingInfo.consultantApplyId = this.$route.query.consultantApplyId
					this.auditingInfo.status = '1'
					this.auditingInfo.reason = ''
		          	this.submitInfo()
		        }).catch(() => {
		        	    
		        });
			},
			//拒绝审核
			auditingRefuse() {
				this.$prompt('请输入拒绝理由', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		        }).then(({ value }) => {
		          	if (!value || value == '') {
		          		this.$message.error('拒绝理由不能为空哦');
		          		return
		          	}
		          	this.auditingInfo.consultantApplyId = this.$route.query.consultantApplyId
					this.auditingInfo.status = '2'
					this.auditingInfo.reason = value
	          		this.submitInfo()
		        }).catch(() => {
		              
		        });
			},
			// 提交信息
			submitInfo() {
				this.$axios({
					method: 'post',
					url: '/system/consultant/apply/examine',
					data: this.$qs.stringify(this.auditingInfo)
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.$message({
				            type: 'success',
				            message: '操作成功!'
				        });
				        this.$router.replace({
				        	path: '/mentor/audit'
				        })
					} else {
						this.$message.error(result.msg);
					}
				})
			},
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