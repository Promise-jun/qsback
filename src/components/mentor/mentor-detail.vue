<template>
	<div class="children-view user-detail" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">导师详情</el-col>
		</el-row>

		<el-row class="basic-info" :gutter="20">
		  	<el-col :span="16">
		  		<el-card>
		  			<el-row :gutter="20" class="module">
					  	<el-col :span="8">
					  		<div class="user-head">
					  			<img :src="baseInfo.userImage">
								<el-upload
								  	class="avatar-uploader change-pic"
								  	accept="image/jpeg, image/gif, image/png"
								  	action=""
								  	:show-file-list="false"
								  	:http-request="headRequest">
								  	<i class="el-icon-edit edit"></i>更改
								</el-upload>
					  		</div>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>昵称：</label>
					  			<span>{{baseInfo.userNickname}}</span>
					  		</p>
					  		<p>
					  			<label>情说号：</label>
					  			<span>{{baseInfo.userCode}}</span>
					  		</p>
					  		<p>
					  			<label>手机号：</label>
					  			<span>{{baseInfo.userPhone}}</span>
					  		</p>
					  		<p>
					  			<label>性别：</label>
					  			<span v-if="baseInfo.userSex == 0">未知</span>
					  			<span v-else-if="baseInfo.userSex == 1">男</span>
					  			<span v-else>女</span>
					  		</p>
					  		<p>
					  			<label>类型：</label>
					  			<span></span>
					  		</p>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>姓名：</label>
					  			<span>{{baseInfo.userName}}</span>
					  		</p>
					  		<p>
					  			<label>身份证：</label>
					  			<span></span>
					  		</p>
					  		<p>
					  			<label>身高：</label>
					  			<span>{{baseInfo.userHeight}}cm</span>
					  		</p>
					  		<p>
					  			<label>状态：</label>
					  			<span>{{baseInfo.online}}</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				  	<el-row class="mentor-data">
				  		<el-col :span="6">
				  			<p class="label">粉丝</p>
				  			<p class="num">201</p>
				  		</el-col>
				  		<el-col :span="6">
				  			<p class="label">评分</p>
				  			<p class="num">{{baseInfo.score}}</p>
				  		</el-col>
				  		<el-col :span="6">
				  			<p class="label">30天咨询人数</p>
				  			<p class="num">302</p>
				  		</el-col>
				  		<el-col :span="6">
				  			<p class="label">30天获得钻石</p>
				  			<p class="num">540</p>
				  		</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-card>
				  	<div slot="header" class="clearfix">
					    <span>其他信息</span>
					</div>
					<el-row :gutter="10" class="module mentor-other-info">
					  	<el-col :span="12">
					  		<p class="user-grade">
					  			<label>导师等级：</label>
					  			<span>
					  				<i class="left">LV</i>
					  				<i class="right">99</i>
					  			</span>
					  		</p>
					  		<p>
					  			<label>单次价格：</label>
					  			<span>{{baseInfo.price}}元/次</span>
					  			<el-tooltip content="编辑" placement="top">
					  				<i class="el-icon-edit edit" @click="singlePrice"></i>
					  			</el-tooltip>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>30天咨询时长：</label>
					  			<span>0小时</span>
					  		</p>
					  		<p>
					  			<label>30天直播时长：</label>
					  			<span>0小时</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				  	<div class="btns">
				  		<p>语音介绍：</p>
				  		<audio class="mentor-audio" v-if="baseInfo.audioIntroduceUrl" :src="baseInfo.audioIntroduceUrl" controls=""></audio>
					    <p style="padding-top: 15px;">
					    	<el-button type="primary" @click="audioDialogVisible = true">上传语音</el-button>
					    </p>
					</div>
				</el-card>
		  	</el-col>
		</el-row>

		<!-- 更多操作 -->
		<el-card class="mentor-more-operation">
			<div slot="header" class="clearfix">
			    <span>更多操作</span>
  			</div>
  			<el-row :gutter="20">
  				<el-col :span="6" v-for="item in authorityList" :key="item.dicId">
  					<p>
			  			<label>{{item.dicName}}：</label>
			  			<span v-if="findAuthority(item.dicId)">开启</span>
			  			<span v-else>关闭</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeAuthority(item)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
  			</el-row>
		</el-card>

		<el-tabs type="border-card">
		  	<el-tab-pane label="资金信息">
		  		<fund-info></fund-info>
		  	</el-tab-pane>
		  	<el-tab-pane label="服务时间" lazy>
		  		<service-time :userId="baseInfo.userId"></service-time> 
		  	</el-tab-pane>
		  	<el-tab-pane label="服务定价" lazy>
		  		<service-pricing :userId="baseInfo.userId" :category="baseInfo.methodDic"></service-pricing>
		  	</el-tab-pane>
		  	<el-tab-pane label="资质简介" lazy>
		  		<aptitude-abstract :userId="baseInfo.userId"></aptitude-abstract>
		  	</el-tab-pane>
		  	<el-tab-pane label="操作日志" lazy>
		  		<operation-log></operation-log>
		  	</el-tab-pane>
		</el-tabs>

		<!-- 图片裁剪 -->
		<cut-out-pic :picDialogVisible.sync="picDialogVisible" :picLoading="picLoading" :picOption="picOption" @upload="uploadImg"></cut-out-pic>

		<!-- 音频上传 -->
		<el-dialog
		  	title="上传音频"
		  	:visible.sync="audioDialogVisible"
		  	:modal="false"
		  	center
		  	width="30%"
		>	
  			<!-- action必选参数, 上传的地址 -->
    		<el-upload 
    			ref="uploadAudio"
    			class="avatar-uploader el-upload--text"
    			style="text-align: center;"
    			action="" 
    			:show-file-list="false" 
    			:before-upload="beforeUploadAudio" 
    			:http-request="uploadAudioRequest">
        		<audio v-if="audioForm.audio != '' && audioFlag == false" :src="audioForm.audio" class="avatar" controls="controls">
        			您的浏览器不支持音频播放
        		</audio>
        		<i v-else-if="audioForm.audio == '' && audioFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
        		<el-progress v-if="audioFlag == true" type="circle" :percentage="audioUploadPercent" style="margin-top:30px;"></el-progress>
    		</el-upload>
    		<P class="text">请保证音频格式正确，且不超过10M</P>
		</el-dialog>
		
		<!-- 更多操作公用弹窗 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="dialogVisible"
		  	width="30%">
		  	{{dialogToolTitle}}：
		  	<el-select v-model="operationObj.operationValue" placeholder="请选择">
			    <el-option label="开启" :value="1"></el-option>
			    <el-option label="关闭" :value="0"></el-option>
			</el-select>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="dialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitChange">确 定</el-button>
		  	</span>
		</el-dialog>

		<!-- 业务所属 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="businessVisible"
		  	width="30%">
		  	{{dialogToolTitle}}：
		  	<el-select v-model="businessObj.businessValue" placeholder="请选择">
			    <el-option label="武汉分公司" value="1"></el-option>
			    <el-option label="上海分公司" value="2"></el-option>
			</el-select>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="businessVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitBusiness">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import cutOutPic from 'base/cutOut-pic/cutOut-pic'
	import FundInfo from 'components/userDetail-tab/fund-info'
	import ServiceTime from 'components/userDetail-tab/service-time' //服务时间
	import ServicePricing from 'components/userDetail-tab/service-pricing' //服务定价
	import AptitudeAbstract from 'components/userDetail-tab/aptitude-abstract' //资质简介
	import OperationLog from 'components/userDetail-tab/operation-log' //操作日志

	export default {
		name: 'mentorDetail',
		data() {
			return {
				loading: false,
				picLoading: false,
				picDialogVisible: false, //图片裁剪弹窗
				picOption: {  //图片裁剪配置
					img: '../../assets/a.jpg',
					info: true,
					outputSize: 1,
					outputType: "png",
					canScale: true,
					autoCrop: true,
					autoCropWidth: 250,
        			autoCropHeight: 250,
        			fixed: true,
        			infoTrue: true,
        			fixedNumber: [1, 1],
        			centerBox: true
				},
				baseInfo: {}, //基本信息
				authorityList: [], //商户权限列表
				openMap: {}, //商户已有的权限
				//更多操作公用弹窗
				dialogVisible: false,
				dialogToolTitle: '',
				operationObj: {
					operationId: null,
					operationValue: 1
				},

				// 导师音频
				audioDialogVisible: false,
				audioForm: {
					audio: ''
				},
				audioFlag: false, //是否正在上传
				uploadUrl: '/api/system/consultant/saveIntroduce', //上传地址
				audioUploadPercent: 0, //上传进度
				//业务所属
				businessVisible: false,
				businessObj: {
					businessId: 0,
					businessValue: '1'
				},
				// 文件类型
				fileType: ''
			}
		},
		created() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/findDetail',
					data: this.$qs.stringify({
						ID: this.$route.query.consultantId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.baseInfo = result.data
						this.openAuthority(result.data.userId) //开启的权限
						this.queryAuthority() //所有权限
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			// 查询商户已有权限列表
			openAuthority(userId) {
				this.$axios({
					method: 'post',
					url: '/system/merchantPermission/queryForListByUserId',
					data: this.$qs.stringify({
						merchantUserId: userId
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.openMap = result.data
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			// 查询商户权限列表
			queryAuthority() {
				this.$axios({
					method: 'post',
					url: '/sys/dic/queryForList',
					data: this.$qs.stringify({
						dicPid: 82,
						thisPage: 1,
						limit: 50
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.authorityList = result.data.list
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			findAuthority(key) {
				if( this.openMap.hasOwnProperty(key) ){
					return true
				} else {
					return false
				}
			},
			// 头像上传
		    headRequest(options) {
		    	this.picDialogVisible = true

		    	let file = options.file
		    	//判断图片类型
    			let isJPG
			    if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') {
			     	isJPG =  true
			    } else {
			     	isJPG =  false
			    }
			    // 判断图片大小
			    const isLt2M = file.size / 1024 / 1024 < 10
			    if (!isJPG) {
			      	this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
			      	return
			    }
			    if (!isLt2M) {
			      	this.$message.error('上传图片大小不能超过 10MB!')
			      	return
			    }
			    this.fileType = file.type.split('/')[1]
			    var reader = new FileReader();
		    	reader.onload = e => {
			        let data;
					
			        if (typeof e.target.result === "object") {
			          // 把Array Buffer转化为blob 如果是base64不需要
			          data = window.URL.createObjectURL(new Blob([e.target.result]));
			        } else {
			          data = e.target.result;
			        }
			        this.picOption.img = data
			    };
			    reader.readAsArrayBuffer(file);
		    },
		    uploadImg(data) {
		    	this.picLoading = true
		    	this.$axios({
		    		method: 'post',
		    		url: '/system/user/editForUserImageAsync',
		    		data: this.$qs.stringify({
		    			base64Str: data.split(',')[1],
		    			fileType: this.fileType,
		    			userId: this.baseInfo.userId
		    		})
		    	}).then(res => {
		    		this.picDialogVisible = false
		    		this.picLoading = false
		    		let result = res.data
		    		if (result.code == 200) {
		    			this.baseInfo.userImage = data
		    			this.$message({
				          	message: '头像上传成功！',
				          	type: 'success'
				        });
		    		} else {
		    			this.$message.error(result.msg);
		    		}
		    	}).catch(err => {
		    		this.$message.error(err);
		    	})
		    },
		    singlePrice() {
		    	this.$prompt('单次价格（元/次）', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('单次价格不能为空');
		        		return
		        	}
		        	if (isNaN(value)) {
		        		this.$message.error('价格必须是数字');
		        		return
		        	}
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/consultant/edit',
		        		data: this.$qs.stringify({
		        			consultantId: this.$route.query.consultantId,
		        			price: value
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.baseInfo.price = value
		        			this.$message({
				           		type: 'success',
				            	message: '单次价格修改成功'
				          	});
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	}).catch(err => {
		        		console.log(err)
		        	})  	
		        }).catch(() => {
		          	 
		        });
		    },

			//音频上传前
			beforeUploadAudio(file) { 
			    const isLt10M = file.size / 1024 / 1024  < 10;
			    if (['audio/mp3'].indexOf(file.type) == -1) {
			        this.$message.error('请上传正确的音频格式');
			        return false;
			    }
			    if (!isLt10M) {
			        this.$message.error('上传音频大小不能超过10MB哦!');
			        return false;
			    }
			},
			uploadAudioRequest(options) {
				let param = new FormData();
				param.append('consultantId', this.$route.query.consultantId);
				//通过append向form对象添加数据
				param.append("file", options.file);

				this.$axios({
					method: 'post',
					url: '/system/consultant/saveIntroduce',
					headers: { "Content-Type": "multipart/form-data" },
					onUploadProgress: progressEvent => {
						this.audioFlag = true;
						let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
				  		this.audioUploadPercent = complete
				  	},
					data: param
				}).then(res => {
					this.audioDialogVisible = false
					this.audioFlag = false;
					this.audioUploadPercent = 0;
					let result = res.data
					if (result.code == 200) {
						this.baseInfo.audioIntroduceUrl = result.msg
						this.$message({
							type: 'success',
							message: '音频上传成功'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},

			// 更多操作
			changeAuthority(item) {
				this.dialogToolTitle = '选择' + item.dicName
				this.dialogVisible = true
				this.operationObj.operationId = item.dicId
			},
			submitChange() { //提交修改
				if (this.operationObj.operationValue) { //开启
					this.$axios({
						method: 'post',
						url: '/system/merchantPermission/saveForMerchantPermission',
						data: this.$qs.stringify({
							dicId: this.operationObj.operationId,
							userId: this.baseInfo.userId
						})
					}).then(res => {
						let result = res.data
						if (result.code == 200) {
							this.openAuthority(this.baseInfo.userId)
							this.$message({
					          	message: '开启成功！',
					          	type: 'success'
					        });
						} else {
							this.$message.error(result.msg)
						}
					}).catch(err => {
						this.$message.error(err)
					})
				} else { //关闭
					let deleteId = this.openMap[this.operationObj.operationId]
					this.$axios({
						method: 'post',
						url: '/system/merchantPermission/delete',
						data: this.$qs.stringify({
							ID: deleteId
						})
					}).then(res => {
						let result = res.data
						if (result.code == 200) {
							this.openAuthority(this.baseInfo.userId)
							this.$message({
					          	message: '关闭成功！',
					          	type: 'success'
					        });
						} else {
							this.$message.error(result.msg)
						}
					}).catch(err => {
						this.$message.error(err)
					})
				}
				this.dialogVisible = false
			},

			// 业务所属
			changeBusiness(changeId) {
				this.dialogToolTitle = "选择业务所属"
				this.businessVisible = true
				this.businessObj.businessId = changeId
			},
			submitBusiness() {
				console.log(this.businessObj)
				this.businessVisible = false
			}
		},
		components: {
			cutOutPic,
			FundInfo,
			ServiceTime,
			ServicePricing,
			AptitudeAbstract,
			OperationLog
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

	.avatar-uploader {
		width: 178px;
		height: 178px;
		border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	    &:hover {
	    	border-color: #409EFF;
	    }
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	}
	.avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	}
	.text {
		margin-top: 15px;
	}
</style>