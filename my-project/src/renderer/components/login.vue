<template>
  <div class="login-box">
    <div class="title-box" style="-webkit-app-region: drag;">
      <maxmin-btn class="btn-position"></maxmin-btn>
    </div>
    <form-box
      @submintFun="ajaxSubmint"
      @forgetPWd="forgetPWd"
      @cheacked="checkedId"
      :remember="true"
      :noLable="'0'"
      :fromListch="registerList"
      :disableBtn='disableBtn'
      :btnName="btnName"
      :fromVal="register">
    </form-box>
    <div style="width: 415px;margin: auto">
      <!--<span class="forgin-btn forgin-hover" @click="forgetPWd('/register')">注册账号</span>-->
    </div>
    <el-dialog
      class="login-dialog verify-Login"
      title="验证码"
      :visible.sync="centerDialogVisible"
      :before-close="closeBtn"
      style="-webkit-app-region: no-drag"
      width="395px"
      center>
      <el-input class="verify-input" autofocus="true" @keyup.enter.native="longIn"
                v-model="register.code" placeholder="请输入验证码"></el-input>
      <el-button class="none-btn el-button--primary" v-if="disabledLoding"
                 @click="verify" :disabled="disabled">{{codeName}}
      </el-button>
      <el-button class="none-btn el-button--primary" :loading="true" v-else></el-button>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="background: #0098ff" @click="longIn" v-if="disabledCrfim == false">确 定</el-button>
    <el-button type="primary" style="background: #0098ff" :loading="true" v-else></el-button>
    <el-button @click="closeBtn" class="clospay hover-btn">取 消</el-button>
  </span>
    </el-dialog>

  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .title-box{
    background:$logo_Img;
  }
  .verify-input {
    width: 220px!important;
  }

  .forgin-hover:hover {
    color: #0098ff;
  }

  .verify-input > input {
    padding-left: .1rem !important;
    height: 38px !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .login-box input {
    font-size: 16px;
    padding: 0;
    background: #181b2a;
    color: #ffffff;
  }

  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: RGBA(255, 255, 255, 0.25);
  }
  .verify-Login .clospay{
    background: rgba(255,255,255,.4) !important;
    border:none!important;
  }
  .login-box input::-webkit-input-placeholder,.banckColr{
    color: #4e5b85!important;
  }
  .login-box .verify-Login .el-dialog{
    background:#262a4a!important;
  }
  .verify-Login .clospay span{
    color: #ffffff;
  }
  .login-btn:hover{
    background: #52a7ff!important;
    color: #fff!important;
    border:none;
  }

</style>
<script>
  const { ipcRenderer} = require('electron');
  import minmax from '&/minmax'
import formMound from '&/from'

export default {
    data () {
      return {
        codeName: '获取验证码',
        disableType: false,
        centerDialogVisible: false,
        disableBtn: true,
        disabledLoding: true,
        disabled: false,
        disabledCrfim: false,
        btnName: {
          name: '登 录',
          class: 'login-btn'
        },
        register: {
          account: '',
          pwd: '',
          code: ''
        },
        registerList: [
          {
            titleNme: '手机号/邮箱',
            name: 'account',
            blurType: false
          },
          {
            titleNme: '密码',
            name: 'pwd',
            type: 'password',
            blurType: false
          }
        ]
      }
    },
    components: {
      'form-box': formMound,
      'maxmin-btn': minmax
    },
    created () {
      this.register.account = localStorage.getItem('account') || '';// 查看是否有存储的账户
  },
    methods: {
      checkedId (data) {
        localStorage.setItem('acutchecked', data);
        if (data) {
          localStorage.setItem('account', this.register.account);
          return
        }
        localStorage.setItem('account', '')
      },
      skipPage: function () {
        let routeData = this.$router.resolve({name: 'logincontent'});
        window.open(routeData.href, '_blank');
          ipcRenderer.send('clerar-appTray', 2); // 只有主页面才会创建托盘图标
      },
      longIn () {
        if (!this.register.code) {
          this.$messageTitle('验证码不能为空', 'error');
          return false
        }
        this.disabledCrfim = true;
        let data = {
          'username': this.register.account,
          'password': this.$md5(this.register.pwd),
          'grantType': 'password',
          'code': this.register.code
        }
        this.$loginAjax.loginForCode(data).then((res) => {
          let data_Val = res.data;
          if (data_Val.code == 200) {
            localStorage.setItem('userInfor', JSON.stringify(data_Val.data));// 存储用户个人信息
            localStorage.setItem('userToken', data_Val.data.accessToken);// 存储token
            localStorage.setItem('username', this.register.account);// 存储用户账号
            this.$messageTitle('登录成功', 'success');
            this.disableBtn = true;
            this.disabledCrfim = false;
            this.skipPage();
            return
          }
          this.$messageTitle(data_Val.msg, 'error');
          this.disabledCrfim = false
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error');
          this.disableBtn = true;
          this.disabledCrfim = false
        })
      },
      ajaxSubmint: function (dataVal, a, b, checked) { // 是否记住账号
        if (checked) {
          localStorage.setItem('account', this.register.account)
        }
        let data = {
          'password': this.$md5(this.register.pwd),
          'username': this.register.account
        };
        this.disableBtn = false;
        this.$loginAjax.loginAxios(data).then((res) => {
          if (res.data.code == 200) {
            this.centerDialogVisible = true;
            return
          }
          this.$messageTitle(res.data.msg, 'error');
          this.disableBtn = true
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error');
          this.disableBtn = true
        })
      },
      forgetPWd (href) {
        this.$router.push(href)
      },
      setTime () {
        var time = 60
        this.disableType = true;
        var clearTime = setInterval(() => {
          var new_Time = time--;
          this.codeName = '已发送(' + new_Time + ')';
          if (time == 0) {
            this.codeName = '获取验证码';
            this.disableType = false;
            this.disabled = false;
            clearTimeout(clearTime)
          }
        }, 1000)
      },
      verify () {
        this.disabledLoding = false;
        this.$loginAjax.sendLoginVerifyCode(this.register.account).then((res) => {
          if (res.data.code == 200) {
            this.$messageTitle('发送成功，请查收', 'success');
            this.disabledLoding = true;
            this.disabled = true;
            this.setTime();
            return
          }
          this.$messageTitle(res.data.msg, 'error');
          this.disabledLoding = true
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error');
          this.disabledLoding = true
        })
      },
      closeBtn () { // 关闭验证弹框
        this.centerDialogVisible = false;
        this.disableBtn = true
      }
    }
  }
</script>

