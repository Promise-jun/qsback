<template>
	<div class="children-view user-detail" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">用户详情</el-col>
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
					  			<label>用户号：</label>
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
					  			<label>淘宝号：</label>
					  			<span>{{baseInfo.userPayAccount}}</span>
					  			<el-tooltip content="编辑" placement="top">
					  				<i class="el-icon-edit edit" @click="changeTaobaoId"></i>
					  			</el-tooltip>
					  		</p>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>姓名：</label>
					  			<span>{{baseInfo.userName}}</span>
					  		</p>
					  		<p>
					  			<label>身份证：</label>
					  			<span>{{baseInfo.identityNo}}</span>
					  		</p>
					  		<p>
					  			<label>相册：</label>
					  			<span>12</span>
					  		</p>
					  		<p>
					  			<label>类型：</label>
					  			<span>注册用户</span>
					  		</p>
					  		<p>
					  			<label>绑定：</label>
					  			<span>手机</span>
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
					<el-row :gutter="10" class="module other-info">
					  	<el-col :span="12">
					  		<p class="user-grade">
					  			<label>用户等级：</label>
					  			<span>
					  				<i class="left">LV</i>
					  				<i class="right">99</i>
					  			</span>
					  		</p>
					  		<p>
					  			<label>业务所属：</label>
					  			<span>杭州分公司</span>
					  		</p>
					  		<p>
					  			<label>接手客服：</label>
					  			<span>小兔子</span>
					  			<el-tooltip content="编辑" placement="top">
					  				<!-- <i class="el-icon-edit edit" @click="kefuVisible = true"></i> -->
					  			</el-tooltip>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>会员权限：</label>
					  			<span>暂无</span>
					  		</p>
					  		<p>
					  			<label>业务推广：</label>
					  			<span>暂无</span>
					  		</p>
					  		<p>
					  			<label>APP版本：</label>
					  			<span>2.0</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				  	<div class="btns">
					    <!-- <el-button type="primary">禁言用户</el-button> -->
						<!-- <el-button type="danger">禁用用户</el-button> -->
					</div>
				</el-card>
		  	</el-col>
		</el-row>

		<el-tabs type="border-card">
		  	<el-tab-pane label="资金信息">
		  		<fund-info></fund-info>
		  	</el-tab-pane>
		  	<el-tab-pane label="渠道信息" lazy>
		  		<ditch-info></ditch-info>
		  	</el-tab-pane>
		  	<el-tab-pane label="互动信息" lazy>
		  		<interact-info :userId="baseInfo.userId"></interact-info>
		  	</el-tab-pane>
		</el-tabs>

		<!-- 图片裁剪 -->
		<cut-out-pic :picDialogVisible.sync="picDialogVisible" :picLoading="picLoading" :picOption="picOption" @upload="uploadImg"></cut-out-pic>

		<!-- 分配客服 -->
		<el-dialog title="提示" :visible.sync="kefuVisible" width="30%" :modal="false">
			选择接手客服：
	      	<el-select v-model="kefu" placeholder="请选择">
	       	 	<el-option label="客服一号" value="1"></el-option>
	       	 	<el-option label="客服二号" value="2"></el-option>
	      	</el-select>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="kefuVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="kefuVisible = false">确 定</el-button>
		  	</div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import cutOutPic from 'base/cutOut-pic/cutOut-pic'
	import FundInfo from 'components/userDetail-tab/fund-info'
	import DitchInfo from 'components/userDetail-tab/ditch-info'
	import InteractInfo from 'components/userDetail-tab/interact-info'

	export default {
		name: 'userDetail',
		data() {
			return {
				loading: false,
				picDialogVisible: false, //图片裁剪弹窗
				picLoading: false,
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
				baseInfo: {}, //用户基本信息
				kefu: '1', //分配的客服
				kefuVisible: false
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
					url: '/system/user/findDetails',
					data: this.$qs.stringify({
						userCode: this.$route.query.userCode
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.baseInfo = result.data
					} else {
						this.$message.error(result.msg)
					}
				})
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
		    changeTaobaoId() {
		    	this.$prompt('请输入淘宝账号', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('淘宝账号不能为空');
		        		return
		        	}
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/user/editForUserPayAccount',
		        		data: this.$qs.stringify({
		        			userId: this.baseInfo.userId,
		        			userPayAccount: value
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
							this.$message({
				           		type: 'success',
				            	message: '淘宝账号修改成功'
				          	});
				          	this.baseInfo.userPayAccount = value
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	})
		        }).catch(() => {
		          	 
		        });
		    }
		},
		components: {
			cutOutPic,
			FundInfo,
			DitchInfo,
			InteractInfo
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
</style>