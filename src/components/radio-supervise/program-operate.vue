<template>
	<div class="children-view">
    	<el-row :gutter="20">
		  	<el-col :span="18" :offset="1">
		  		<el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
		  			<el-form-item label="选择主播" prop="userAccount">
					    
					</el-form-item>
					<el-form-item label="专辑名称" prop="userAccount">
					    <el-input v-model="formData.userAccount" autocomplete="off" placeholder="请输入专辑名称"></el-input>
					</el-form-item>
					<el-form-item label="是否上架" prop="status">
					    <el-select v-model="formData.status" placeholder="请选择是否上架">
					  		<el-option label="上架" value="1"></el-option>
					  		<el-option label="未上架" value="2"></el-option>
					  	</el-select>
					</el-form-item>
					<el-form-item label="收藏数量" prop="userAccount">
					    <el-input v-model="formData.userAccount" autocomplete="off" placeholder="请输入收藏数量"></el-input>
					</el-form-item>
					<el-form-item label="播放次数" prop="userAccount">
					    <el-input v-model="formData.userAccount" autocomplete="off" placeholder="请输入播放次数"></el-input>
					</el-form-item>
					<el-form-item label="专辑分类" prop="userAccount">
					    <el-select v-model="formData.theme" filterable placeholder="请选择主题(必填)">
						    <el-option v-for="item in themeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-select v-model="formData.mood" multiple collapse-tags placeholder="请选择心情(多选)">
						    <el-option v-for="item in moodList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-select v-model="formData.mood" multiple collapse-tags placeholder="请选择场景(多选)">
						    <el-option v-for="item in moodList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="礼物图片">
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
					<el-form-item label="专辑介绍" prop="userAccount">
					    <el-input 
					    	type="textarea" 
					    	:rows="5" 
					    	placeholder="请填写不少于10最大不超过30个字专辑介绍" 
					    	v-model="formData.textarea"
					    >
					    </el-input>
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
	import { VueCropper }  from 'vue-cropper' 

	export default {
		name: 'programOperate',
		data() {
			return {
				rules: {
					user: [
						{ required: true, message: '礼物名称不能为空'}
					]
				},
				themeList: [{
		          value: '1',
		          label: '恋爱'
		        }, {
		          value: '2',
		          label: '治愈'
		        }, {
		          value: '3',
		          label: '家庭'
		        }, {
		          value: '4',
		          label: '两性'
		        }, {
		          value: '5',
		          label: '音乐'
		        }],
		        moodList: [{
		        	value: 1,
		        	label: '宅着'
		        }, {
		        	value: 2,
		        	label: '运动'
		        }, {
		        	value: 3,
		        	label: '旅行'
		        }, {
		        	value: 4,
		        	label: '散步'
		        }],
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
				formData: {
					mood: []
				}
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
		    }
		},
		components: {
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
	    top: 44px;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 100;
	    background-color: #fff;
	    padding: 20px;
	    overflow-y: auto;
	}
</style>