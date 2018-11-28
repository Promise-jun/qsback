<template>
	<div class="children-view">
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-row :gutter="20">
		  	<el-col :span="12" :offset="1">
		  		<el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
		  			<el-form-item label="用户ID" prop="userId">
					    <el-input v-model="formData.userId" autocomplete="off" placeholder="请输入用户ID"></el-input>
					</el-form-item>
					<el-form-item label="标题" prop="title">
					    <el-input v-model="formData.title" autocomplete="off" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="排序" prop="sort">
					    <el-input-number v-model="formData.sort" :min="1" :max="100"></el-input-number>
					</el-form-item>
					<el-form-item label="类型" prop="type">
					    <el-select v-model="formData.type" placeholder="请选择类型">
					  		<el-option label="免费" value="1"></el-option>
					  		<el-option label="付费" value="2"></el-option>
					  	</el-select>
					</el-form-item>
					<el-form-item label="状态" prop="status">
					    <el-select v-model="formData.status" placeholder="请选择状态">
					  		<el-option label="上架" value="1"></el-option>
					  		<el-option label="下架" value="2"></el-option>
					  	</el-select>
					</el-form-item>
					<el-form-item label="是否推荐" prop="groom">
					    <el-select v-model="formData.groom" placeholder="请选择是否推荐">
					  		<el-option label="是" value="1"></el-option>
					  		<el-option label="否" value="2"></el-option>
					  	</el-select>
					</el-form-item>
					<el-form-item label="所属专栏" prop="column">
					    <el-select v-model="formData.column" placeholder="请选择所属专栏">
					  		<el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					  	</el-select>
					</el-form-item>
					<el-form-item label="所属主题" prop="theme">
					    <el-select v-model="formData.theme" placeholder="请选择所属主题">
					  		<el-option v-for="item in themeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					  	</el-select>
					</el-form-item>
					<el-form-item label="上传音频" prop="audio">
					    
					</el-form-item>
					<el-form-item label="课程描述" prop="describe">
					    <el-input type="textarea" :rows="4" placeholder="请输入专栏介绍" v-model="formData.describe"></el-input>
					</el-form-item>
					<el-form-item label="封面">
						<el-upload
							ref="upload"
						  	class="avatar-uploader"
						  	action="https://jsonplaceholder.typicode.com/posts/"
						  	:show-file-list="false"
						  	:before-upload="beforeAvatarUpload"
						>
						  	<img v-if="formData.userImage" :src="formData.userImage" class="avatar">
						  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" icon="el-icon-success" @click="submitForm('ruleForm')" :loading="submitLoading">提交</el-button>
					    <el-button icon="el-icon-refresh" @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
		  	</el-col>
		</el-row>

		<el-dialog
		  	title="图片裁剪"
		  	:visible.sync="picDialogVisible"
		  	:modal="false"
		  	center
		  	width="50%"
		>	
			<div class="pic-box">
				<vueCropper
				  	ref="cropper"
				  	:img="picOption.img"
				  	:info="picOption.info"
					:outputSize="picOption.outputSize"
					:outputType="picOption.outputType"
					:canScale="picOption.canScale"
					:autoCrop="picOption.autoCrop"
					:autoCropWidth="picOption.autoCropWidth"
					:autoCropHeight="picOption.autoCropHeight"
					:fixed="picOption.fixed"
					:fixedNumber="picOption.fixedNumber"
					:infoTrue="picOption.infoTrue"
					:centerBox="picOption.centerBox"
				></vueCropper>
			</div>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="picDialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitUpload">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'
	import { VueCropper }  from 'vue-cropper' 
	
	export default {
		name: 'courseOperate',
		data() {
			return {
				dataPath: ['课程管理', '音频课程', '查看课程', '课程操作'],
				rules: {
					status: [
						{ required: true, message: '状态不能为空'}
					],
					type: [
						{ required: true, message: '菜单不能为空'}
					],	
					headUrl: [
						{ required: true, message: '图片不能为空'}
					]
				},
				submitLoading: false, //提交按钮loading
				picDialogVisible: false, //图片裁剪弹窗
				picOption: {  //图片裁剪配置
					img: 'http://img4.imgtn.bdimg.com/it/u=3737489722,3380008174&fm=26&gp=0.jpg',
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
				formData: {},
				themeList: [{
					value: 1,
					label: '婚恋情感'
				}, {
					value: 2,
					label: '家庭矛盾'
				}, {
					value: 3,
					label: '个人成长'
				}], //主题列表
				columnList: [{
					value: 1,
					label: '成长的烦恼'
				}, {
					value: 2,
					label: '孩子成长'
				}] //专栏列表
			}
		},
		methods: {
			beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }

		        this.picDialogVisible = true
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
		       
		        return isJPG && isLt2M
		    },
		    submitUpload() {
		    	this.$refs.cropper.getCropData(data => {
		    		this.formData.userImage = data
			        this.$refs.upload.submit();
			        this.picDialogVisible = false
			    });
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		          		console.log(this.formData)
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
		    },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
		},
		components: {
			BreadCrumb,
			VueCropper
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
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
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
	.pic-box {
		height: 400px;
	}
	.children-view {
		position: absolute;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 100;
	    background-color: #fff;
	    padding: 20px;
	    overflow-y: auto;
	}
</style>