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
              <el-form-item label="" prop="code">
                <el-col :span="12">
                  <el-input prefix-icon="el-icon-mobile-phone" v-model.number="loginForm.code" placeholder="短信验证码" @keyup.enter.native="submitForm('loginForm')"></el-input>
                </el-col>
                <el-col :span="10">
                  <el-button :disabled="isSend" @click="sendYzm">{{sendBtnCont}}</el-button>
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
  import store from '../../store'

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
          code: ''
        },
        isSend: false,
        sendBtnCont: '获取短信验证码',
        loginRules: {
          username: [
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          code: [
            { validator: checkYzm, trigger: 'blur' }
          ]
        },
        isTest: false,
        isTesttwo: false,
        isVisible: false
      };
    },
    methods: {
      // 发送验证码
      sendYzm() {
        if (this.loginForm.username && this.loginForm.password) {
          this.$axios({
            method: 'post',
            url: '/authc/getMSG',
            data: this.$qs.stringify({
              username: this.loginForm.username,
              password: this.loginForm.password
            })
          }).then(res => {
            let result = res.data
            if (result.code == 200) {
              this.countDown()
              this.$message({
                type: 'success',
                message: '验证码发送成功'
              })
            } else {
              this.$message.error(result.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message.error('请先输入用户名和密码')
        }
      },
      // 验证码倒计时
      countDown() {
        let num = 60
        this.isSend = true
        this.sendBtnCont = num + 's后可重发'
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.sendBtnCont = --num + 's后可重发'
          if (num <= 0) {
            clearInterval(this.timer)
            this.isSend = false
            this.sendBtnCont = '获取短信验证码'
          }
        }, 1000)
      },
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
              this.hideLoading(res.data);
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
      hideLoading(data) {
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
        }, 1000);
        setTimeout(() => {
            this.$refs.authent.style.display = 'none';
            this.isTest = false; //倾斜特效

            //登录成功
            if (data.code == 200) {
              // setCookie('admin_token', 'admin');
              // 获取用户信息
              store.dispatch('getUserInfo').then(() => {})
              
              store.dispatch('getNavList').then(() => {
                  store.dispatch('getPermissionList').then((res) => {
                      for (var i = 0; i < res.length; i++) {
                        if (res[i].path != '' && res[i].type == 1) {
                          this.$router.replace({path: res[i].path});
                          break;
                        }
                      }
                  })
              })
              this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
              });
            } else {
              this.$message.error(data.msg);
            }
            
        }, 1400);
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
    background-color: #F2F2F4;
    background-image: url('../../assets/icon_login_bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>
