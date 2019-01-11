<template>
	<div class="children-view" v-loading="loading">
		<el-row :gutter="20">
	      <el-col :span="12" :offset="1">
	        <el-form
	          :model="formData"
	          :rules="rules"
	          ref="ruleForm"
	          label-width="150px"
	          class="demo-ruleForm"
	        >
	          <el-form-item label="用户名" prop="userAccount">
	            <el-input 
	            	v-model="formData.userAccount"
	            	:disabled="uploadId ? true : false"
	            	autocomplete="off" 
	            	placeholder="可以是手机号，邮箱">
	            </el-input>
	          </el-form-item>
	          <el-form-item label="密码" prop="userPassword">
	            <el-input type="password" v-model="formData.userPassword" autocomplete="off" placeholder="请输入密码"></el-input>
	          </el-form-item>
	          <el-form-item label="昵称" prop="userNickname">
	            <el-input v-model="formData.userNickname" autocomplete="off" placeholder="请输入昵称"></el-input>
	          </el-form-item>
	          <el-form-item label="性别" prop="userSex">
	            <el-select v-model="formData.userSex" placeholder="请选择性别">
	              <el-option label="未知" :value="0"></el-option>
	              <el-option label="男" :value="1"></el-option>
	              <el-option label="女" :value="2"></el-option>
	            </el-select>
	          </el-form-item>
	          <el-form-item label="角色类型" prop="roleId">
				  <el-select v-model="formData.roleId" placeholder="请选择">
				    <el-option label="选择角色类型" value=""></el-option>
				    <el-option
				      v-for="item in roleList"
				      :key="item.roleId"
				      :label="item.roleName"
				      :value="item.roleId">
				    </el-option>
				  </el-select>
	          </el-form-item>
	          <el-form-item label="姓名" prop="userName">
	            <el-input v-model="formData.userName" autocomplete="off" placeholder="请输入姓名"></el-input>
	          </el-form-item>
	          <el-form-item label="手机号" prop="userPhone">
	          	<phone :code="formData.phoneCode" :phone="formData.userPhone" @changeCode="changeCode" @changeNum="changeNum"></phone>
	          </el-form-item>
	          <!-- <el-form-item label="微信" prop="userWechat">
	            <el-input v-model="formData.userWechat" autocomplete="off" placeholder="请输入微信"></el-input>
	          </el-form-item>
	          <el-form-item label="QQ" prop="userQq">
	            <el-input v-model="formData.userQq" autocomplete="off" placeholder="请输入QQ"></el-input>
	          </el-form-item> -->
	          <el-form-item label="头像" prop="userImage">
	            <el-upload
	                class="avatar-uploader"
	                accept="image/jpeg, image/gif, image/png"
	                action=""
	                :show-file-list="false"
	                :http-request="headRequest">
	                <img v-if="formData.userImage" :src="formData.userImage" class="avatar">
	                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	            </el-upload>
	          </el-form-item>
	          <el-form-item>
	            <el-button
	              type="primary"
	              icon="el-icon-success"
	              @click="submitForm('ruleForm')"
	              :loading="submitLoading"
	            >提交</el-button>
	            <el-button icon="el-icon-refresh" @click="resetForm('ruleForm')">重置</el-button>
	          </el-form-item>
	        </el-form>
	      </el-col>
	    </el-row>

	    <!-- 图片裁剪 -->
	    <cut-out-pic :picDialogVisible.sync="picDialogVisible" :picLoading="picLoading" :picOption="picOption" @upload="uploadHead"></cut-out-pic>
	</div>
</template>

<script type="text/javascript">
	import cutOutPic from 'base/cutOut-pic/cutOut-pic'
	import Phone from 'base/form-box/phone'

	export default {
		name: 'operatorHandle',
		data() {
			return {
				rules: {
					userAccount: [
						{ required: true, message: "用户名不能为空" }
					],
					userPassword: [
						{ required: true, message: "密码不能为空" }
					],
					userNickname: [
						{ required: true, message: "昵称不能为空" }
					],
					userSex: [
						{ required: true, message: "性别不能为空" }
					],
					roleId: [
						{ required: true, message: "角色不能为空" }
					],
					userName: [
						{ required: true, message: "姓名不能为空" }
					],
					userPhone: [
						{ required: true, message: "手机号不能为空" }
					],
					userWechat: [
						{ required: true, message: "微信不能为空" }
					],
					userQq: [
						{ required: true, message: "QQ不能为空" }
					],
					userImage: [
						{ required: true, message: "头像不能为空" }
					]
				},
				picDialogVisible: false, //图片裁剪弹窗
				picLoading: false,
			    picOption: {
			        //图片裁剪配置
			        img: "",
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
			    fileType: '', //文件类型
			    loading: false,
				formData: {
					userAccount: '',
					userPassword: '',
					userNickname: '',
					roleId: '',
					userSex: 0,
					userName: '',
					phoneCode: '86',
					userPhone: '',
					userWechat: '',
					userQq: '',
					userImage: ''
				},
				submitLoading: false,
				roleList: [], //角色列表
				uploadId: ''
			}
		},
		created() {
			this.getRole()
			this.uploadId = this.$route.query.userId
			if (this.uploadId) {
				this.getInfo()
			} else {
				this.formData = {
					userId: '',
					userAccount: '',
					userPassword: '',
					userNickname: '',
					roleId: '',
					userSex: 0,
					userName: '',
					phoneCode: '86',
					userPhone: '',
					userWechat: '',
					userQq: '',
					userImage: ''
				}
			}
		},
		methods: {
			// 获取角色列表
			getRole() {
				this.$axios({
					method: 'post',
					url: '/system/sysRole/queryForList',
					data: this.$qs.stringify({
						thisPage: 1,
						limit: 50
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.roleList = result.data.list
					} else {
						this.$message.error(result.msg)
					}
				})
			},
			// 用户信息
			getInfo() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/user/queryForListStaff',
					data: this.$qs.stringify({
						userId: this.$route.query.userId,
						thisPage: 1,
						limit: 50
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					console.log(result)
					if (result.code == 200) {
						this.formData = {
							userId: result.data.list[0].userId,
							userAccount: result.data.list[0].userAccount,
							userPassword: result.data.list[0].userPassword,
							userNickname: result.data.list[0].userNickname,
							roleId: result.data.list[0].roleId,
							userSex: result.data.list[0].userSex,
							userName: result.data.list[0].userName,
							phoneCode: result.data.list[0].userPhone && result.data.list[0].userPhone.indexOf('+') != -1 ? result.data.list[0].userPhone.split('+')[0] : '86',
							userPhone: result.data.list[0].userPhone && result.data.list[0].userPhone.indexOf('+') != -1 ? result.data.list[0].userPhone.split('+')[1] : result.data.list[0].userPhone,
							userWechat: result.data.list[0].userWechat,
							userQq: result.data.list[0].userQq,
							userImage: result.data.list[0].userImage
						}
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 头像
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
		    uploadHead(data) {
		    	this.picLoading = true
		      this.$axios({
		        method: 'post',
		        url: '/system/user/editForUserImage',
		        data: this.$qs.stringify({
		          fileType: this.fileType,
		          base64Str: data.split(',')[1]
		        })
		      }).then(res => {
		      	this.picLoading = false
		        let result = res.data
		        if (result.code == 200) {
		          this.formData.userImage = result.msg
		          this.picDialogVisible = false
		        } else {
		          this.$message.error(result.msg);
		        }
		      }).catch(err => {
		        console.log(err)
		      })
		    },
		    // 改变code
		    changeCode(val) {
		      this.formData.phoneCode = val
		    },
		    // 改变num
		    changeNum(val) {
		      this.formData.userPhone = val
		    },
			submitForm(formName) {
		      this.$refs[formName].validate(valid => {
		        if (valid) {
		          this.submitLoading = true;
		          if (this.formData.userId == "") {
		            //新增
		            let urls = "/system/user/saveForStaff";
		            let text = "创建成功";
		            let uploadInfo = {
		            	userType: 2,
		            	userAccount: this.formData.userAccount,
						userPassword: this.formData.userPassword,
						userNickname: this.formData.userNickname,
						userSex: this.formData.userSex,
						roleId: this.formData.roleId,
						userName: this.formData.userName,
						userPhone: this.formData.phoneCode + '+' + this.formData.userPhone,
						userImage: this.formData.userImage
		            }
		            this.upload(urls, text, uploadInfo);
		          } else {
		            //编辑
		            let urls = "/system/user/editForStaff";
		            let text = "编辑成功";
		            let uploadInfo = {
		            	userType: 2,
		            	userId: this.formData.userId,
						userPassword: this.formData.userPassword,
						userNickname: this.formData.userNickname,
						userSex: this.formData.userSex,
						roleId: this.formData.roleId,
						userName: this.formData.userName,
						userPhone: this.formData.phoneCode + '+' + this.formData.userPhone,
						userImage: this.formData.userImage
		            }
		            this.upload(urls, text, uploadInfo);
		          }
		        } else {
		          console.log("error submit!!");
		          return false;
		        }
		      });
		    },
		    resetForm(formName) {
		      this.$refs[formName].resetFields();
		    },
		    upload(urls, text, uploadInfo) {
		      this.$axios({
		        method: "post",
		        url: urls,
		        data: this.$qs.stringify(uploadInfo)
		      })
		        .then(res => {
		          let result = res.data;
		          this.submitLoading = false;
		          if (result.code == 200) {
		            this.$router.back();
		            this.dialogFormVisible = false;
		            this.$message({
		              message: text,
		              type: "success"
		            });
		          } else {
		            this.$message.error(result.msg);
		          }
		        })
		        .catch(err => {
		          this.submitLoading = false;
		          console.log(err);
		        });
		    }
		},
		components: {
			cutOutPic,
			Phone
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
    border-color: #409eff;
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
  background-color: rgba(0, 0, 0, 0.5);
}
.pic-box {
  height: 400px;
}
.children-view {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  padding: 20px;
  overflow-y: auto;
}
</style>