<template>
  <div class="login-box ">
    <h3 style="-webkit-app-region: drag" >忘记密码</h3>
    <maxmin-btn class="btn-position"></maxmin-btn>
    <form-box
      class="register"
      @submintFun="ajaxSubmint"
      @verifnumber="verifSeed"
      :noLable="'0'"
      :resfort="1"
      :fromListch="registerList"
      :disableBtn='disableBtn'
      :disabledVerfy='disabledVerfy'
      :disabled="disabled"
      @loginStaus='loginStaus'
      :btnName="btnName"
      :fromVal="register">
    </form-box>
    <div style="width: 415px;margin: auto">
      <span class="forgin-btn" @click="forgetPWd('/')">返回登录</span>
    </div>
  </div>
</template>
<style>
  .login-box > h3 {
    font-size: 18px;
    color: #ffffff;
    padding: 10px 15px 0;
  }

 /* .login-box .register-btn {
    margin-top: 10px;
    border-color: #fa3a20;
    height: 45px;
    background-color: #fa3a20;
    border-radius: 2px;
  }*/

  /*.register {*/
    /*color: red;*/
  /*}*/
  .register .el-button:focus,.register .el-button:hover{
    background-color: #52a7ff!important;
    border-color: #c6e2ff;
  }
  .verify-input {
    position: relative;
  }

  .verify-input input {
    padding-right: 30px;
  }

  .coed-btn {
    position: absolute!important;
    top: 30px;
    right: 0;
    cursor: pointer;
    font-size: 14px;
    color: #4e5b85;
  }
</style>
<script>
  import minmax from '&/minmax'
import formMound from '&/from'

export default {
    data () {
      return {
        disableBtn: true,
        disabledVerfy: false,
        disabled: false,
        btnName: {
          name: '提 交',
          class: 'register-btn'
        },
        register: {
          account: '',
          code: '',
          pwd: '',
          checkPass: ''
        },
        registerList: [
          {
            titleNme: '手机号/邮箱',
            name: 'account',
            blurType: false
          },
          {
            titleNme: '验证码',
            name: 'code',
            verify: '发送验证码',
            verifyTyp: 'account',
            class: 'coed-btn',
            blurType: false
          },
          {
            titleNme: '密码',
            name: 'pwd',
            type: 'password',
            blurType: false
          },
          {
            titleNme: '确认密码',
            name: 'checkPass',
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
    methods: {
      loginStaus () {
        this.disabledVerfy = true
  },
      ajaxSubmint: function (dataVal, a, b, checked) {
        let data = {
          'password': this.$md5(this.register.pwd),
          'username': this.register.account,
          'code': this.register.code
        }
        this.disableBtn = false
        this.$loginAjax.forgetReg(data).then((res) => {
          if (res.data.code == 200) {
            this.$messageTitle('修改成功，请登录', 'success')
            this.disableBtn = true
            this.$router.push('/')
            return
          }
          this.$messageTitle(res.data.msg, 'error')
          this.disableBtn = true
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
          this.disableBtn = true
        })
      },
      verifSeed (domObj, dataVal) {
        this.$loginAjax.sendForgetVerifyCode(dataVal.account).then((res) => {
          if (res.data.code == 200) {
            this.disabled = true
            this.disabledVerfy = false
            this.$messageTitle('发送成功，请查收', 'success')
            this.setTime(domObj)
            return
          }
          this.$messageTitle(res.data.msg, 'error')
          this.disabledVerfy = false
          this.disabled = false
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
          this.disabledVerfy = false
          this.disabled = false
        })
      },
      setTime (domObj) {
        var time = 60
        var clearTime = setInterval(() => {
          var new_Time = time--
          // domObj.innerHTML = '已发送(' + new_Time + ')';
          this.registerList[1].verify = '已发送(' + new_Time + ')'
          if (time == 0) {
            // domObj.innerHTML = "获取验证码";
            this.registerList[1].verify = '获取验证码'
            this.disabled = false
            clearTimeout(clearTime)
          }
        }, 1000)
      },
      forgetPWd (href) {
        this.$router.push(href)
      }
    }
  }
</script>


