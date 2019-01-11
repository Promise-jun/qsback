<template>
  <div class="children-view">
    <el-row :gutter="20">
      <el-col :span="12" :offset="1">
        <el-form
          :model="formData"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户号" v-if="uploadId">
            <el-input v-model="formData.userCode" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userAccount" v-else>
            <el-input v-model="formData.userAccount" autocomplete="off" placeholder="可以是手机号，邮箱"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" v-if="!uploadId" prop="userPassword">
            <el-input v-model="formData.userPassword" autocomplete="off" placeholder="请输入用户密码"></el-input>
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

          <el-form-item label="姓名" prop="userName">
            <el-input v-model="formData.userName" autocomplete="off" :disabled="uploadId ? true : false" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="userPhone">
            <phone :code="formData.phoneCode" :phone="formData.userPhone" @changeCode="changeCode" @changeNum="changeNum"></phone>
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
          </el-form-item>-->
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
    <cut-out-pic :picDialogVisible.sync="picDialogVisible" :picOption="picOption" @upload="uploadHead"></cut-out-pic>
  </div>
</template>

<script type="text/javascript">
import cutOutPic from 'base/cutOut-pic/cutOut-pic'
import Phone from 'base/form-box/phone'
import { isvalidPhone } from "common/js/validate";

export default {
  name: "userOperate",
  data() {
    return {
      rules: {
        userAccount: [{ required: true, message: "用户名不能为空" }],
        userPassword: [{ required: true, message: "用户密码不能为空" }],
        userSex: [{ required: true, message: "性别不能为空" }],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        taobaoId: [{ required: true, message: "淘宝号不能为空" }],
        kefu: [{ required: true, message: "客服不能为空" }],
        userImage: [{ required: true, message: "头像不能为空" }]
      },
      submitLoading: false,
      picDialogVisible: false, //图片裁剪弹窗
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
      kefuList: [
        {
          value: "1",
          label: "客服1"
        },
        {
          value: "2",
          label: "客服2"
        }
      ],
      formData: {
        userCode: '',
        userId: "", //用户id
        userImage: "",
        userType: 0, //用户类型, 0：普通用户
        userAccount: "", //用户账号
        userNickname: "",
        userName: "",
        phoneCode: '86',
        userPhone: "", //手机号
        userWechat: "", //微信
        userQq: "", //qq
        userWeibo: "", //微博
        userSex: "",
        userPassword: "" //密码
      },
      fileType: '', //文件类型
      uploadId: '' //有无id
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.uploadId = this.$route.query.userCode;
      if (this.uploadId) {
        this.$axios({
          method: "post",
          url: "/system/user/find",
          data: this.$qs.stringify({
            userCode: this.uploadId
          })
        })
          .then(res => {
            let result = res.data;
            if (result.code == 200) {
              this.formData.userCode = result.data.userCode;
              this.formData.userId = result.data.userId;
              this.formData.userNickname = result.data.userNickname;
              this.formData.userSex = result.data.userSex.toString();
              this.formData.userName = result.data.userName;
              this.formData.phoneCode = result.data.userPhone && result.data.userPhone.indexOf('+') != -1 ? result.data.userPhone.split('+')[0] : '86';
              this.formData.userPhone = result.data.userPhone && result.data.userPhone.indexOf('+') != -1 ? result.data.userPhone.split('+')[1] : result.data.userPhone;
              this.formData.userImage = result.data.userImage;
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.formData.userId = "";
      }
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
      this.$axios({
        method: 'post',
        url: '/system/user/editForUserImage',
        data: this.$qs.stringify({
          fileType: this.fileType,
          base64Str: data.split(',')[1]
        })
      }).then(res => {
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
            let urls = "/system/user/saveForUser";
            let text = "创建成功";
            let uploadInfo = {
              userType: 0,
              userAccount: this.formData.userAccount,
              userPassword: this.formData.userPassword,
              userNickname: this.formData.userNickname,
              userSex: this.formData.userSex,
              userName: this.formData.userName,
              userPhone: this.formData.phoneCode + '+' + this.formData.userPhone,
              userImage: this.formData.userImage
            }
            this.upload(urls, text, uploadInfo);
          } else {
            //编辑
            let urls = "/system/user/editForUser";
            let text = "编辑成功";
            let uploadInfo = {
              userType: 0,
              userCode: this.formData.userCode,
              userId: this.formData.userId,
              userNickname: this.formData.userNickname,
              userSex: this.formData.userSex,
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
};
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
  min-height: 100%;
  z-index: 100;
  background-color: #fff;
  padding: 20px;
  overflow-y: auto;
}
</style>