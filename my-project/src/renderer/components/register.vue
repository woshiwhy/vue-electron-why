<template>
  <div class="login-box ">
    <h3>注册</h3>
    <maxmin-btn class="btn-position"></maxmin-btn>
    <form-box
      class="register"
      @submintFun="ajaxSubmint"
      :noLable="'0'"
      :resfort="2"
      :fromListch="registerList"
      :btnName="btnName"
      :disableBtn='disableBtn'
      :disabledVerfy='disabledVerfy'
      :disabled='disabled'
      @verifnumber="verifSeed"
      @loginStaus='loginStaus'
      :fromVal="register">
    </form-box>
    <div style="width: 415px;margin: auto">
      <span class="forgin-btn forgin-hover" @click="forgetPWd('/')">返回登录</span>
    </div>
  </div>
</template>
<style>
.login-box > h3 {
  font-size: 18px;
  color: #ffffff;
  padding: 10px 15px 0;
}

.login-box .register-btn {
  margin-top: 10px;
  /*border-color: #fa3a20;*/
  height: 45px;
  /*background-color: #fa3a20;*/
  border-radius: 2px;
}

/*.register {*/
  /*color: red;*/
/*}*/

.verify-inputfrom {
  position: relative;
}

.verify-inputfrom input {
  padding-right: 30px;
}

.coed-btn {
  position: absolute !important;
  right: 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.3);
}
.register-btn:hover{
  background: #52a7ff ;
  border: none;
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
        name: '注 册',
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
    ajaxSubmint (dataVal, a, b, checked) {
      if (checked == false) {
        this.$messageTitle('注册请勾选《币前线媒体平台服务协议》', 'error')
        return false
      }
      let data = {
        username: this.register.account,
        code: this.register.code,
        password: this.$md5(this.register.pwd)
      }
      this.disableBtn = false
      this.$loginAjax.register(data)
        .then(res => {
          if (res.data.code == 200) {
            this.$messageTitle('注册成功,请登录', 'success')
            this.disableBtn = false
            this.$router.push('/')
            return
          }
          this.$messageTitle(res.data.msg, 'error')
          this.disableBtn = true
        })
        .catch(err => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
          this.disableBtn = true
        })
    },
    verifSeed (domObj, dataVal) {
      this.$loginAjax.sendRegisterVerifyCode(dataVal.account)
        .then(res => {
          if (res.data.code == 200) {
            this.disabled = true,
            this.$messageTitle('发送成功，请查收', 'success')
            this.disabledVerfy = false
            this.setTime(domObj)
            return
          }
          this.$messageTitle(res.data.msg, 'error')
          this.disabledVerfy = false
          this.disabled = false
        })
        .catch(err => {
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


