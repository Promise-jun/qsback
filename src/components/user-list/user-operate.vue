<template>
	<div class="children-view">
		<el-row :gutter="20">
		  	<el-col :span="12" :offset="1">
		  		<el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
					<el-form-item label="用户名" prop="userAccount">
					    <el-input v-model="formData.userAccount" autocomplete="off" placeholder="可以是手机号，邮箱"></el-input>
					</el-form-item>
					<el-form-item label="昵称" prop="userNickname">
					    <el-input v-model="formData.userNickname" autocomplete="off" placeholder="请输入昵称"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="userSex">
					    <el-select v-model="formData.userSex" placeholder="请选择性别">
					     	<el-option label="未知" value="0"></el-option>
					      	<el-option label="男" value="1"></el-option>
					      	<el-option label="女" value="2"></el-option>
					    </el-select>
					</el-form-item>
					<!-- <el-form-item label="邮箱" prop="email">
					    <el-input v-model="formData.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
					</el-form-item> -->
					<el-form-item label="姓名" prop="userName">
					    <el-input v-model="formData.userName" autocomplete="off" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="userPhone">
					    <el-input v-model.number="formData.userPhone" autocomplete="off" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<!-- <el-form-item label="淘宝号" prop="taobaoId">
					    <el-input v-model="formData.taobaoId" autocomplete="off" placeholder="请输入淘宝号"></el-input>
					</el-form-item> -->
					<el-form-item label="微信" prop="userWechat">
					    <el-input v-model="formData.userWechat" autocomplete="off" placeholder="请输入微信"></el-input>
					</el-form-item>
					<el-form-item label="QQ" prop="userQq">
					    <el-input v-model="formData.userQq" autocomplete="off" placeholder="请输入QQ"></el-input>
					</el-form-item>
					<!-- <el-form-item label="客服" prop="kefu">
					    <el-select v-model="formData.kefu" placeholder="请选择客服">
					     	<el-option
						      	v-for="item in kefuList"
						      	:key="item.value"
						      	:label="item.label"
						      	:value="item.value">
						    </el-option>
					    </el-select>
					</el-form-item> -->
					<el-form-item label="头像">
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
	import { VueCropper }  from 'vue-cropper' 
	import { isvalidPhone } from 'common/js/validate'

	export default {
		name: 'userOperate',
		data() {
			var validPhone=(rule, value,callback)=>{
		      	if (!value){
		          	callback(new Error('请输入手机号'))
		      	}else  if (!isvalidPhone(value)){
		        	callback(new Error('请输入正确的11位手机号'))
		      	}else {
		          	callback()
		      	}
			};
			return {
				rules: {
					userAccount: [
						{ required: true, message: '用户名不能为空'}
					],
					userSex: [
						{ required: true, message: '性别不能为空'}
					],
					userPhone: [
						{ validator: validPhone }//这里需要用到全局变量
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
					headUrl: [
						{ required: true, message: '头像不能为空'}
					]
				},
				submitLoading: false,
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
				kefuList: [{
		          value: '1',
		          label: '客服1'
		        }, {
		          value: '2',
		          label: '客服2'
		        }],
				formData: {
					userId: '', //用户id
					userImage: '',
					userType: 0, //用户类型, 0：普通用户
					userAccount: '', //用户账号
					userNickname: '',
					userName: '',
					userPhone: '', //手机号
					userWechat: '', //微信
					userQq: '', //qq
					userWeibo: '', //微博
					userSex: '',
					userPassword: '123456' //密码
				}
			}
		},
		created() {
			this.getInfo();
		},
		methods: {
			getInfo() {
				let uploadId = this.$route.params.id
				if (uploadId) {
					this.formData.userId = uploadId
					this.$axios({
						method: 'post',
						url: '/system/user/find',
						data: this.$qs.stringify({
							ID: uploadId
						})
					}).then(res => {
						let result = res.data
						if (result.code == 200) {
							this.formData.userNickname = result.data.userNickname
							this.formData.userSex = result.data.userSex.toString()
							this.formData.userName = result.data.userName
						} else {
							this.$message.error(result.msg);
						}
					}).catch(err => {
				        console.log(err)
				    })
				} else {
					this.formData.userId = ''
				}
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
		          		this.submitLoading = true
		          		if (this.formData.userId == '') { //新增
		          			let urls = '/system/user/saveForUser'
		          			let text = '创建成功'
		          			this.upload(urls, text)
		          		} else { //编辑
		          			let urls = '/system/user/editForUser'
		          			let text = '编辑成功'
		          			this.upload(urls, text)
		          		}
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
		    },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
		    upload(urls, text) {
		    	this.$axios({
			        method: 'post',
			        url: urls,
			        data: this.$qs.stringify(this.formData)
			    }).then(res => {
			        let result = res.data
			        this.submitLoading = false
			        if (result.code == 200) {
			        	this.$router.back();
			        	this.dialogFormVisible = false;
			        	this.$message({
				          message: text,
				          type: 'success'
				        });
			        } else {
			        	this.$message.error(result.msg);
			        }
			    }).catch(err => {
			    	this.submitLoading = false
			        console.log(err)
			    })
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