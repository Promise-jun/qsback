<template>
  <div class="login-box">

    <div class="login" :class="{test: isTest, testtwo: isTesttwo}">
        <!--<img class="MyLogo" src="loginSpecial/images/logo01.png" alt="   LOGO">-->
        <div class="login_title">
            <span>用户登录</span>
        </div>
        <div class="login_fields">
            <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="demo-ruleForm">
              <el-form-item label="" prop="username">
                <el-input prefix-icon="el-icon-tickets" v-model="loginForm.username" autocomplete="off" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input prefix-icon="el-icon-view" type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item label="" prop="yzm">
                <el-col :span="12">
                  <el-input prefix-icon="el-icon-mobile-phone" v-model.number="loginForm.yzm" placeholder="短信验证码"></el-input>
                </el-col>
                <el-col :span="10">
                  <el-button :disabled="true">获取短信验证码</el-button>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click="submitForm('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="disclaimer">
            <p>欢迎登陆情说后台管理平台</p>
        </div>
    </div>
    <div class="authent" :class="{visible: isVisible}" ref="authent">
        <div class="loader" style="height: 60px;width: 60px;margin-left: 28px;margin-top: 40px">
            <div class="loader-inner ball-clip-rotate-multiple">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <p>认证中...</p>
    </div>

  </div>
</template>
<script>
  import {setCookie} from 'common/js/util'

  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.loginForm.password !== '') {
            this.$refs.loginForm.validateField('password');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var checkYzm = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
          yzm: ''
        },
        loginRules: {
          username: [
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          yzm: [
            { validator: checkYzm, trigger: 'blur' }
          ]
        },
        isTest: false,
        isTesttwo: false,
        isVisible: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.showLoading();

            let data = this.$qs.stringify(this.loginForm);
            // 请求登录
            this.$axios({
              method: 'post',
              url: '/authc/login',
              data: data
            }).then(res => {
              this.hideLoading();
              console.log(res);
            }).catch(err => {
              this.$message.error(err.toString());
            })
          } else {
            console.log('error submit!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      showLoading() {
          this.isTest = true; //倾斜特效
          setTimeout(() => {
            this.isTesttwo = true;
          }, 300);
          setTimeout(() => {
            this.$refs.authent.style.display = 'block';
            Velocity(this.$refs.authent, {
              right: -320
            }, {
              easing: 'easeOutQuint',
              duration: 600,
              queue: false
            })
            Velocity(this.$refs.authent, {
              opacity: 1
            }, {
              duration: 200,
              queue: false
            })
            this.isVisible = true
          }, 500);
      },
      hideLoading() {
        setTimeout(() => {
            this.$refs.authent.style.display = 'block';
            Velocity(this.$refs.authent, {
              right: 90
            }, {
              easing: 'easeOutQuint',
              duration: 600,
              queue: false
            })
            Velocity(this.$refs.authent, {
              opacity: 0
            }, {
              duration: 200,
              queue: false
            })
            this.isVisible = true
            this.isTesttwo = false; //平移特效
        }, 2000);
        setTimeout(() => {
            this.$refs.authent.style.display = 'none';
            this.isTest = false; //倾斜特效

            //登录成功
            // setCookie('admin_token', 'admin');
            // this.$router.push({path: '/'});
            // console.log(res)
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success'
            });
            // this.$message.error('错了哦，这是一条错误消息');
        }, 2400);
        return false;
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  .login-box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #242645;
  }
</style>
