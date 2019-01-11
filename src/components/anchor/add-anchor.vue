<template>
	<div class="children-view user-detail" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">主播入驻</el-col>
		</el-row>

		<el-row :gutter="20" v-if="isAdd">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix" style="height: 32px; line-height: 32px;">
		    			<span>选择用户</span>
		    			<el-button type="primary" style="float: right;" icon="el-icon-circle-plus" size="small" @click="chooseUserVisible = true">选择</el-button>
		  			</div>
		  			<el-row :gutter="20">
					  	<el-col :span="12">
					  		<p>
					  			<label>用户ID：</label>
					  			<span>{{ userInfo.userId }}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>绑定手机：</label>
					  			<span>{{ userInfo.phone }}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>用户昵称：</label>
					  			<span>{{ userInfo.userName }}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>所属客服：</label>
					  			<span>{{ userInfo.kefu }}</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix" style="height: 32px; line-height: 32px;">
		    			<span>基本信息</span>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="8">
					  		<p>昵称</p>
					  		<el-input v-model="anchorForm.nickName" placeholder="请输入昵称"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>联系方式</p>
					  		<!-- <el-input v-model.number="anchorForm.anchorPhone" placeholder="请输入联系方式" @change="provingPhone"></el-input> -->
					  		<phone 
					  			:code="anchorForm.phoneCode" 
					  			:phone="anchorForm.anchorPhone" 
					  			@changeCode="changeCode" 
					  			@changeNum="changeNum">
					  		</phone>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>主播所在地</p>
					  		<el-cascader
							  	:options="addressList"
							  	@active-item-change="handleItemChange"
							  	:props="props"
							></el-cascader>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>主播职业</p>
					  		<el-input v-model="anchorForm.anchorOccupation" placeholder="请输入主播职业"></el-input>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>主播兴趣</p>
					  		<el-input v-model="anchorForm.anchorHobby" placeholder="请输入主播兴趣（用逗号隔开）"></el-input>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix" style="height: 32px; line-height: 32px;">
		    			<span>身份认证</span>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="8">
					  		<p>真实姓名</p>
					  		<el-input v-model="anchorForm.realName" placeholder="请输入真实姓名" style="width: 70%;"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>证件类型</p>
					  		<el-select v-model="anchorForm.type" placeholder="请选择证件类型">
							    <el-option label="大陆身份证" value="0"></el-option>
							    <el-option label="台胞证" value="1"></el-option>
							    <el-option label="护照" value="2"></el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>证件号码</p>
					  		<el-input v-model="anchorForm.identityNo" placeholder="请输入证件号码" style="width: 70%;"></el-input>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>身份证照片</p>
					  		<div class="add-pic-box">
								<el-upload
								  	class="avatar-uploader"
								  	accept="image/jpeg, image/gif, image/png"
								  	action=""
								  	:show-file-list="false"
								  	:http-request="frontRequest">
								  	<img v-if="anchorForm.frontPic" :src="anchorForm.frontPic" class="avatar">
								  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<p>正面</p>
					  		</div>
					  		<div class="add-pic-box">
								<el-upload
								  	class="avatar-uploader"
								  	accept="image/jpeg, image/gif, image/png"
								  	action=""
								  	:show-file-list="false"
								  	:http-request="backRequest">
								  	<img v-if="anchorForm.conPic" :src="anchorForm.conPic" class="avatar">
								  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<p>反面</p>
					  		</div>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<div>
			<el-button type="primary" @click="submitAuditing">提交审核</el-button>
			<el-button type="danger" @click="resetting">重置</el-button>
		</div>

		<!-- 选择用户 -->
		<choose-user :visible.sync="chooseUserVisible" @confirm="chooseUser" @register="registerUser"></choose-user>
	</div>
</template>

<script type="text/javascript">
	import ChooseUser from 'components/choose-user/choose-user'
	import Phone from 'base/form-box/phone'
	
	export default {
		name: 'addAnchor',
		data() {
			return {
				userInfo: {
					userId: '',
					userName: '',
					phone: '',
					kefu: ''
				},
				// 选择用户
				chooseUserVisible: false,
				// 选择地址
				addressList: [{
		          	label: '江苏',
		          	cities: []
		        }, {
		          	label: '浙江',
		          	cities: []
		        }],
				props: {
          			value: 'label',
          			children: 'cities'
        		},
        		anchorForm: {
        			nickName: '',
        			phoneCode: '86',
        			anchorPhone: '', //手机号
        			anchorAddress: '', //地址
        			anchorOccupation: '',  //职业
        			anchorHobby: '', //兴趣
        			realName: '',  //真是姓名
        			type: '0',
        			identityNo: '', //证件号码
        			frontPic: '',
        			conPic: ''
        		},
        		loading: false,
        		isAdd: true,
        		uploadUrl: '' //提交地址
			}
		},
		created() {
			if (this.$route.query.userId) { //编辑 
				this.isAdd = false
				this.uploadUrl = '/system/anchor/editForAnchor'
				this.userInfo.userId = this.$route.query.userId
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/anchor/goToEditPage',
					data: this.$qs.stringify({
						userId: this.$route.query.userId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						let data = result.data
						this.anchorForm = {
		        			nickName: data.sysUserVo.userNickname,
		        			phoneCode: data.SysAnchorVo.anchorPhone && data.SysAnchorVo.anchorPhone.indexOf('+') != -1 ? data.SysAnchorVo.anchorPhone.split('+')[0] : '86',
		        			anchorPhone: data.SysAnchorVo.anchorPhone && data.SysAnchorVo.anchorPhone.indexOf('+') != -1 ? data.SysAnchorVo.anchorPhone.split('+')[1] : data.SysAnchorVo.anchorPhone,
		        			anchorAddress: data.SysAnchorVo.anchorAddress, //地址
		        			anchorOccupation: data.SysAnchorVo.anchorOccupation,  //职业
		        			anchorHobby: data.SysAnchorVo.anchorHobby, //兴趣
		        			realName: data.identityCheckVo.name,  //真是姓名
		        			type: data.identityCheckVo.type.toString(),
		        			identityNo: data.identityCheckVo.identityNo, //证件号码
		        			frontPic: data.identityCheckVo.frontView,
		        			conPic: data.identityCheckVo.backView
		        		}
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        this.$message.error(err);
			    })
			} else { //新增
				this.isAdd = true
				this.uploadUrl = '/system/anchor/saveForAnchor'
			}
		},
		methods: {
			// 确认选择用户
			chooseUser(item) {
				this.userInfo.userId = item.userId
		    	this.userInfo.userName = item.userNickname
		    	this.userInfo.phone = item.userPhone
		    	this.userInfo.kefu = item.userCustomerService

		    	this.anchorForm.nickName = item.userNickname
		    	this.chooseUserVisible = false
			},
			// 注册用户
			registerUser(item) {
				console.log(item)
				this.chooseUserVisible = false
			},
			// 改变地址
			handleItemChange(val) {
		        setTimeout(_ => {
		          	if (val.indexOf('江苏') > -1 && !this.addressList[0].cities.length) {
		            	this.addressList[0].cities = [{
		              		label: '南京'
		            	}];
		          	} else if (val.indexOf('浙江') > -1 && !this.addressList[1].cities.length) {
		            	this.addressList[1].cities = [{
		              		label: '杭州'
		            	}];
		          	}
		        }, 300);
		        // this.anchorForm.anchorAddress = val
		    },
		    // 身份证正面
		    frontRequest(file) {
				this.uploadImg(file, 2)
		    },
		    // 身份证反面
		    backRequest(file) {
				this.uploadImg(file, 3)
		    },
		    uploadImg(options, type) {
		    	// 获取文件对象
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
			      	this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!')
			      	return
			    }
			    if (!isLt2M) {
			      	this.$message.error('上传图片大小不能超过 10MB!')
			      	return
			    }
			    // 创建一个HTML5的FileReader对象
    			var reader = new FileReader();
    			if (file) {
				    reader.readAsDataURL(file)
				    reader.onload = (e) => {
				    	let base64Str = e.target.result.split(',')[1]
				    	this.$axios({
				    		method: 'post',
				    		url: '/system/consultant/apply/savePicture',
				    		data: this.$qs.stringify({
				    			image: base64Str,
				    			fileType: file.type.split('/')[1]
				    		})
				    	}).then(res => {
				    		let result = res.data
				    		if (result.code == 200) {
				    			if (type == 2) { //证件正面
				    				this.anchorForm.frontPic = result.msg
				    			} else if (type == 3) { //证件反面
				    				this.anchorForm.conPic = result.msg
				    			} 
				    		} else {
				    			this.$message.error(result.msg);
				    		}
				    	}).catch(err => {
				    		this.$message.error(err);
				    	})
				    }
				}
		    },
		    // 改变code
		    changeCode(val) {
		      this.anchorForm.phoneCode = val
		    },
		    // 改变num
		    changeNum(val) {
		      this.anchorForm.anchorPhone = val
		    },
		    // 验证手机号
		    provingPhone(val) {
		    	this.anchorForm.anchorPhone = val.replace(/[^\d]/g,'');
		    },
		    // 提交审核
		    submitAuditing() {
		    	this.anchorForm.userId = this.userInfo.userId
		    	if (this.anchorForm.userId == '') {
		    		this.$message.error('用户ID不能为空！请先选择用户！');
		    		return
		    	}
		    	if (this.anchorForm.realName == '' || this.anchorForm.identityNo == '') {
		    		this.$message.error('真是姓名或证件号码不能为空!');
		    		return
		    	}
		    	let uploadInfo = {
		    		userId: this.anchorForm.userId,
		    		nickName: this.anchorForm.nickName,
		    		anchorPhone: this.anchorForm.phoneCode + '+' + this.anchorForm.anchorPhone,
		    		anchorAddress: this.anchorForm.anchorAddress,
		    		anchorHobby: this.anchorForm.anchorHobby,
		    		anchorOccupation: this.anchorForm.anchorOccupation,
		    		realName: this.anchorForm.realName,
		    		type: this.anchorForm.type,
		    		identityNo: this.anchorForm.identityNo,
		    		conPic: this.anchorForm.conPic,
		    		frontPic: this.anchorForm.frontPic
		    	}
		    	this.$confirm('确定要提交审核吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.loading = true
			    	this.$axios({
						method: 'post',
						url: this.uploadUrl,
						data: this.$qs.stringify(uploadInfo)
					}).then(res => {
						this.loading = false
						let result = res.data
						if (result.code == 200) {
							this.$message({
					         	message: '操作成功！',
					          	type: 'success'
					        });
							this.$router.replace({
								path: '/anchor/list'
							})
						} else {
							this.$message.error(result.msg);
						}
					}).catch(err => {
				    	this.loading = false
				        this.$message.error(err);
				    })
		        }).catch(() => {
		             
		        });
		    },
		    // 重置
		    resetting() {
		    	this.anchorForm = {
        			nickName: '',
        			phoneCode: '86',
        			anchorPhone: '',
        			anchorAddress: '', //地址
        			anchorOccupation: '',  //职业
        			anchorHobby: '', //兴趣
        			realName: '',  //真是姓名
        			type: '0',
        			identityNo: '', //证件号码
        			frontPic: '',
        			conPic: ''
        		}
		    }
		},
		components: {
			ChooseUser,
			Phone
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
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
	.box-card {
		& p {
			padding: 10px 0;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: #303030;
		}
	}
	
	.add-pic-box {
		float: left;
		margin-right: 30px;
		& p {
			text-align: center;
		}
	}
	.avatar-uploader .el-upload {
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
  	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 250px;
	    height: 160px;
	    line-height: 160px;
	    text-align: center;
	    border: 1px dashed #d9d9d9;
	    &:hover {
	    	border-color: #409EFF;
	    }
  	}
  	.avatar {
  		width: 250px;
	    display: block;
  	}
</style>