<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

		<el-row :gutter="20">
		  	<el-col :span="12" :offset="1">
		  		<el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
					<el-form-item label="用户名" prop="username">
					    <el-input v-model="formData.userName" autocomplete="off" placeholder="可以是微信号，淘宝号等"></el-input>
					</el-form-item>
					<el-form-item label="昵称" prop="nickname">
					    <el-input v-model="formData.nickname" autocomplete="off" placeholder="请输入昵称"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
					    <el-select v-model="formData.sex" placeholder="请选择性别">
					     	<el-option label="未知" value="0"></el-option>
					      	<el-option label="男" value="1"></el-option>
					      	<el-option label="女" value="2"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
					    <el-input v-model="formData.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
					    <el-input v-model="formData.name" autocomplete="off" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
					    <el-input v-model="formData.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item label="淘宝号" prop="taobaoId">
					    <el-input v-model="formData.taobaoId" autocomplete="off" placeholder="请输入淘宝号"></el-input>
					</el-form-item>
					<el-form-item label="微信" prop="weixin">
					    <el-input v-model="formData.weixin" autocomplete="off" placeholder="请输入微信"></el-input>
					</el-form-item>
					<el-form-item label="QQ" prop="qq">
					    <el-input v-model="formData.qq" autocomplete="off" placeholder="请输入QQ"></el-input>
					</el-form-item>
					<el-form-item label="客服" prop="kefu">
					    <el-select v-model="formData.kefu" placeholder="请选择客服">
					     	<el-option
						      	v-for="item in kefuList"
						      	:key="item.value"
						      	:label="item.label"
						      	:value="item.value">
						    </el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="账户类型" prop="accountType">
					    <el-select v-model="formData.accountType" placeholder="请选择账户类型">
					     	<el-option label="普通账户" value="0"></el-option>
					      	<el-option label="公司账户" value="1"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="头像" prop="headUrl">
						<el-upload
						  	class="avatar-uploader"
						  	action="https://jsonplaceholder.typicode.com/posts/"
						  	:show-file-list="false"
						  	:on-success="handleAvatarSuccess"
						  	:before-upload="beforeAvatarUpload">
						  	<img v-if="imageUrl" :src="imageUrl" class="avatar">
						  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					    <el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
		  	</el-col>
		</el-row>
				
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 

	export default {
		name: 'userOperate',
		data() {
			return {
				dataPath: ['用户管理', '客户管理', '新增用户'],
				rules: {
					username: [
						{ required: true, message: '用户名不能为空'}
					],
					sex: [
						{ required: true, message: '性别不能为空'}
					],
					email: [
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
					],
					taobaoId: [
						{ required: true, message: '淘宝号不能为空'}
					],
					kefu: [
						{ required: true, message: '客服不能为空'}
					],
					accountType: [
						{ required: true, message: '账户类型不能为空'}
					],
					headUrl: [
						{ required: true, message: '头像不能为空'}
					]
				},
				kefuList: [{
		          value: '1',
		          label: '客服1'
		        }, {
		          value: '2',
		          label: '客服2'
		        }],
		        imageUrl: '',
				formData: {}
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		    },
		    beforeAvatarUpload(file) {
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
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	alert('submit!');
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
		    },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    }
		},
		components: {
			BreadCrumb
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.avatar-uploader {
		width: 178px;
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
</style>