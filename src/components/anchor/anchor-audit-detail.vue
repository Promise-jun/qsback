<template>
	<div class="children-view user-detail" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">主播审核</el-col>
		</el-row>

		<el-row class="basic-info" :gutter="20">
		  	<el-col :span="16">
		  		<el-card>
		  			<el-row :gutter="20" class="module">
					  	<el-col :span="8">
					  		<div class="user-head">
					  			<img :src="baseInfo.userImage">
					  		</div>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>昵称：</label>
					  			<span>{{baseInfo.userNickname}}</span>
					  		</p>
					  		<p>
					  			<label>用户ID：</label>
					  			<span>{{baseInfo.userId}}</span>
					  		</p>
					  		<p>
					  			<label>手机号：</label>
					  			<span>{{anchorInfo.anchorPhone}}</span>
					  		</p>
					  		<p>
					  			<label>性别：</label>
					  			<span>{{baseInfo.userSex}}</span>
					  		</p>
					  		<p>
					  			<label>身高：</label>
					  			<span>{{baseInfo.userHeight}}cm</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>姓名：</label>
					  			<span>{{identityInfo.name}}</span>
					  		</p>
					  		<p>
					  			<label>身份证：</label>
					  			<span>{{identityInfo.identityNo}}</span>
					  		</p>
					  		<p>
					  			<label>所在地：</label>
					  			<span>{{anchorInfo.anchorAddress}}</span>
					  		</p>
					  		<p>
					  			<label>年龄：</label>
					  			<span>{{baseInfo.userAge}}</span>
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
					  			<label>绑定：</label>
					  			<span></span>
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
			  			<span>{{anchorInfo.anchorOccupation}}</span>
			  		</p>
			  		<p>
			  			<label>节目数量：</label>
			  			<span></span>
			  		</p>
		  		</el-col>
		  		<el-col :span="8">
		  			<p>
			  			<label>兴趣爱好：</label>
			  			<span>{{anchorInfo.anchorHobby}}</span>
			  		</p>
			  		<p>
			  			<label>收到喜欢：</label>
			  			<span></span>
			  		</p>
		  		</el-col>
		  		<el-col :span="8">
		  			<p>
			  			<label>情感状态：</label>
			  			<span></span>
			  		</p>
			  		<p>
			  			<label>是否推荐：</label>
			  			<span>不推荐</span>
			  		</p>
		  		</el-col>
		  		<el-col :span="24">
		  			<p>
			  			<label>个人简介：</label>
			  			<span>{{anchorInfo.anchorSignature}}</span>
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
			  			<span>{{identityInfo.name}}</span>
			  		</p>
		  		</el-col>
		  		<el-col :span="8">
		  			<p>
			  			<label>身份证：</label>
			  			<span>{{identityInfo.identityNo}}</span>
			  		</p>
		  		</el-col>
		  		<el-col :span="8">
		  			<p>
			  			<label>提交时间：</label>
			  			<span>{{identityInfo.createTm | dateformat}}</span>
			  		</p>
		  		</el-col>
		  	</el-row>
		</el-card>

		<div v-if="auditingInfo.status == 0">
			<el-button type="primary" @click="auditingSuccess">审核通过</el-button>
			<el-button type="danger" @click="auditingRefuse">拒绝审核</el-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'anchorAuditDetail',
		data() {
			return {
				loading: false,
				baseInfo: {},
				anchorInfo: {},
				identityInfo: {},
				auditingInfo: {
					userId: '',
					status: '0', //1:审核通过, 2:审核不通过
					reason: ''
				}
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
					url: '/system/anchorApply/goToHandlePage',
					data: this.$qs.stringify({
						userId: this.$route.query.userId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.baseInfo = result.data.sysUserVo
						this.anchorInfo = result.data.sysAnchorApply
						this.identityInfo = result.data.identityCheckVo
						//审核状态
						this.auditingInfo.status = this.anchorInfo.status
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
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
		        	this.auditingInfo.userId = this.$route.query.userId
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
		          	this.auditingInfo.userId = this.$route.query.userId
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
					url: '/system/anchorApply/examineAnchor',
					data: this.$qs.stringify(this.auditingInfo)
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.$message({
				            type: 'success',
				            message: '操作成功!'
				        });
				        this.$router.replace({
				        	path: '/anchor/audit'
				        })
					} else {
						this.$message.error(result.msg);
					}
				})
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