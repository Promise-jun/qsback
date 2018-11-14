<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb :dataPath="dataPath"></bread-crumb>
    
    <el-form :model="changePassForm" 
            status-icon 
            :rules="changePassRules" 
            ref="changePassForm" 
            label-width="150px" 
            class="change-pass-form"
    >
      <el-form-item label="请输入旧密码" prop="oldPass">
        <el-input type="password" v-model="changePassForm.oldPass"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="newPass">
        <el-input type="password" v-model="changePassForm.newPass"></el-input>
      </el-form-item>
      <el-form-item label="请重新输入新密码" prop="checkPass">
        <el-input type="password" v-model="changePassForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('changePassForm')">确认修改</el-button>
        <el-button @click="resetForm('changePassForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BreadCrumb from 'base/bread-crumb/bread-crumb' 

export default {
  name: 'changePass',
  data () {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.changePassForm.checkPass !== '') {
          this.$refs.changePassForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.changePassForm.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dataPath: ['个人中心', '修改密码'],
      changePassForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      changePassRules: {
        oldPass: [
          { validator: validateOldPass, trigger: 'blur', required: true }
        ],
        newPass: [
          { validator: validatePass, trigger: 'blur', required: true }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: true }
        ]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$loading();
          setTimeout(() => {
            this.$loading().close();
          }, 2000)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .change-pass-form {
    width: 600px;
  }
</style>
