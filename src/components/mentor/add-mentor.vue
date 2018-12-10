<template>
	<div class="children-view user-detail">
		<el-row>
		  	<el-col :span="24" class="title">导师入驻</el-col>
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
					  		<el-input v-model="mentorForm.userName" placeholder="请输入昵称"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>联系方式</p>
					  		<el-input v-model="mentorForm.contactWay" placeholder="请输入联系方式"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>咨询师所在地</p>
					  		<el-cascader
							  	:options="addressList"
							  	@active-item-change="handleItemChange"
							  	:props="props"
							></el-cascader>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>手机号</p>
					  		<el-input v-model="mentorForm.userPhone" placeholder="请输入手机号"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>微信号</p>
					  		<el-input v-model="mentorForm.userWx" placeholder="请输入微信号"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>生日</p>
					  		<el-date-picker
      							v-model="mentorForm.birthday"
      							type="date"
     							placeholder="选择日期">
    						</el-date-picker>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>毕业学校</p>
					  		<el-input v-model="mentorForm.school" placeholder="请输入毕业学校"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>专业</p>
					  		<el-input v-model="mentorForm.specialty" placeholder="请输入专业"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>学历</p>
					  		<el-select v-model="mentorForm.study" placeholder="请选择">
							    <el-option
							      	v-for="item in studyList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>学历证书</p>
					  		<div class="add-pic-box">
					  			<el-upload
								  	class="avatar-uploader"
								  	accept="image/jpeg, image/gif, image/png"
								  	action="https://jsonplaceholder.typicode.com/posts/"
								  	:show-file-list="false"
								  	:on-success="studySuccess"
								  	:before-upload="studyUpload">
								  	<img v-if="mentorForm.studyPic" :src="mentorForm.studyPic" class="avatar">
								  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>证件号</p>
					  		<el-input v-model="mentorForm.docCode" placeholder="请输入证件号"></el-input>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>证件类型</p>
					  		<el-select v-model="mentorForm.docType" placeholder="请选择">
							    <el-option
							      	v-for="item in docList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>证件照片</p>
					  		<div class="add-pic-box">
					  			<el-upload
								  	class="avatar-uploader"
								  	action="https://jsonplaceholder.typicode.com/posts/"
								  	:show-file-list="false"
								  	:on-success="frontSuccess"
								  	:before-upload="frontUpload">
								  	<img v-if="mentorForm.frontPic" :src="mentorForm.frontPic" class="avatar">
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
								  	<img v-if="mentorForm.conPic" :src="mentorForm.conPic" class="avatar">
								  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<p>反面</p>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>推荐人</p>
					  		<el-input v-model="mentorForm.referee" placeholder="请输入推荐人"></el-input>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>如何了解到我们</p>
					  		<el-select v-model="mentorForm.docType" placeholder="请选择">
							    <el-option
							      	v-for="item in docList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix" style="height: 32px; line-height: 32px;">
		    			<span>从业背景</span>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="8">
					  		<p>平台在职类型</p>
					  		<el-select v-model="mentorForm.jobType" placeholder="请选择">
							    <el-option label="全职" value="1"></el-option>
							    <el-option label="兼职" value="2"></el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>从业年限</p>
					  		<el-input v-model="mentorForm.ageLimit" placeholder="请输入从业年限"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>累计个案（小时）</p>
					  		<el-input v-model="mentorForm.case" placeholder="请输入累计个案（小时）"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>专业背景</p>
					  		<el-select
							    v-model="mentorForm.background"
							    multiple
							    collapse-tags
							    placeholder="请选择">
							    <el-option
							      	v-for="item in bgList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>擅长领域</p>
					  		<el-select
							    v-model="mentorForm.territory"
							    multiple
							    collapse-tags
							    placeholder="请选择">
							    <el-option
							      	v-for="item in bgList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>咨询风格</p>
					  		<el-select
							    v-model="mentorForm.box"
							    multiple
							    collapse-tags
							    placeholder="请选择">
							    <el-option
							      	v-for="item in bgList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix" style="height: 32px; line-height: 32px;">
		    			<span>上传头像</span>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="8">
					  		<p>头像</p>
					  		<div class="add-pic-box">
					  			<el-upload
								  	class="avatar-uploader"
								  	accept="image/jpeg, image/gif, image/png"
								  	action="https://jsonplaceholder.typicode.com/posts/"
								  	:show-file-list="false"
								  	:on-success="headSuccess"
								  	:before-upload="headUpload">
								  	<img v-if="mentorForm.headPic" :src="mentorForm.headPic" class="avatar head-pic">
								  	<i v-else class="el-icon-plus avatar-uploader-icon head-icon"></i>
								</el-upload>
					  		</div>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<!-- 选择用户 -->
		<choose-user :visible.sync="chooseUserVisible" @confirm="chooseUser" @register="registerUser"></choose-user>
	</div>
</template>

<script type="text/javascript">
	import ChooseUser from 'components/choose-user/choose-user'
	
	export default {
		name: 'addMentor',
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
        		// 学历列表
        		studyList: [{
        			label: '本科',
        			value: 1
        		}, {
        			label: '博士',
        			value: 2
        		}],
        		// 证件类型列表
        		docList: [{
        			label: '身份证',
        			value: 1
        		}, {
        			label: '护照',
        			value: 2
        		}],
        		// 专业背景
        		bgList: [{
        			label: '背景一',
        			value: 1
        		}, {
        			label: '背景二',
        			value: 2
        		}],
        		mentorForm: {
        			frontPic: '',
        			conPic: '',
        			background: [],
        			territory: [],
        			box: []
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

		    	this.mentorForm.userName = item.userName
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
		    // 学历证书
		    studySuccess(res, file) {
		        this.mentorForm.studyPic = URL.createObjectURL(file.raw);
		    },
		    studyUpload(file) {
		        const isJPG = file.type === 'image/jpeg'||'image/gif'||'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传文件只能是图片格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    },
		    // 身份证正面
		    frontSuccess(res, file) {
		        this.mentorForm.frontPic = URL.createObjectURL(file.raw);
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
		        this.mentorForm.conPic = URL.createObjectURL(file.raw);
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
		    },
		    // 头像
		    headSuccess(res, file) {
		        this.mentorForm.headPic = URL.createObjectURL(file.raw);
		    },
		    headUpload(file) {
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
	
	.head-icon,
  	.head-pic {
  		width: 250px;
  		height: 250px;
  		line-height: 250px;
  	}
</style>