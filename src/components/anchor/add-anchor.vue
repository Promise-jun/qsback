<template>
	<div class="children-view user-detail">
		<el-row>
		  	<el-col :span="24" class="title">主播入驻</el-col>
		</el-row>

		<el-row :gutter="20">
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
					  		<el-input v-model="anchorForm.userName" placeholder="请输入昵称"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>联系方式</p>
					  		<el-input v-model="anchorForm.contactWay" placeholder="请输入联系方式"></el-input>
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
					  		<el-input v-model="anchorForm.occupation" placeholder="请输入主播职业"></el-input>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>主播兴趣</p>
					  		<el-input v-model="anchorForm.interest" placeholder="请输入主播兴趣（用逗号隔开）"></el-input>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>情感介绍</p>
					  		<el-input
							  	type="textarea"
							  	:rows="8"
							  	placeholder="请输入情感介绍"
							  	v-model="anchorForm.suggest">
							</el-input>
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
		  				<el-col :span="12">
					  		<p>真实姓名</p>
					  		<el-input v-model="anchorForm.occupation" placeholder="请输入真实姓名"></el-input>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>身份证</p>
					  		<el-input v-model="anchorForm.interest" placeholder="请输入身份证"></el-input>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>身份证照片</p>
					  		<div class="add-pic-box">
					  			<el-upload
								  	class="avatar-uploader"
								  	action="https://jsonplaceholder.typicode.com/posts/"
								  	:show-file-list="false"
								  	:on-success="frontSuccess"
								  	:before-upload="frontUpload">
								  	<img v-if="anchorForm.frontPic" :src="anchorForm.frontPic" class="avatar">
								  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<p>正面</p>
					  		</div>
					  		<div class="add-pic-box">
					  			<el-upload
								  	class="avatar-uploader"
								  	action="https://jsonplaceholder.typicode.com/posts/"
								  	:show-file-list="false"
								  	:on-success="conSuccess"
								  	:before-upload="conUpload">
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
			<el-button type="primary">提交审核</el-button>
			<el-button type="danger">重置</el-button>
		</div>

		<!-- 选择用户 -->
		<choose-user :visible.sync="chooseUserVisible" @confirm="chooseUser" @register="registerUser"></choose-user>
	</div>
</template>

<script type="text/javascript">
	import ChooseUser from 'components/choose-user/choose-user'
	
	export default {
		name: 'addAnchor',
		data() {
			return {
				userInfo: {
					userId: '--',
					userName: '--',
					phone: '--',
					kefu: '--'
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
        			frontPic: '',
        			conPic: ''
        		}
			}
		},
		methods: {
			// 确认选择用户
			chooseUser(item) {
				this.userInfo.userId = item.userId
		    	this.userInfo.userName = item.userName
		    	this.userInfo.phone = item.phone
		    	this.userInfo.kefu = item.kefu

		    	this.anchorForm.userName = item.userName
		    	this.chooseUserVisible = false
			},
			// 注册用户
			registerUser(item) {
				console.log(item)
				this.chooseUserVisible = false
			},
			// 改变地址
			handleItemChange(val) {
		        console.log('active item:', val);
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
		    },
		    // 身份证正面
		    frontSuccess(res, file) {
		        this.anchorForm.frontPic = URL.createObjectURL(file.raw);
		    },
		    frontUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    },
		    // 身份证反面
		    conSuccess(res, file) {
		        this.anchorForm.conPic = URL.createObjectURL(file.raw);
		    },
		    conUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    }
		},
		components: {
			ChooseUser
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