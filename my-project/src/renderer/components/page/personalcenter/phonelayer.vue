<template>
  <el-dialog
    class="center-dialog"
    title="手机号绑定"
    :visible.sync="centerDialogVisible"
    width="4.21rem"
    :before-close="close"
    center>
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
      <el-form-item label="输入手机号" prop="phone">
        <el-input  v-model="formLabelAlign.phone"  @keyup.enter.native="confirm('formLabelAlign')" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item class="coed-box" label="验证码" prop="code">
        <el-col>
          <el-input   v-model="formLabelAlign.code" @keyup.enter.native="confirm('formLabelAlign')" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-button  class="none-btn el-button--primary" size="medium"
                    @click="verify" v-if="disabledTrue == 1">{{codeName}}
        </el-button>
        <el-button  class="none-btn el-button--primary" size="medium" :loading="true" v-else-if="disabledTrue == 2"></el-button>
        <el-button  class="none-btn el-button--primary" size="medium"
                   v-else>{{codeName}}
        </el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="affirm-btn" @click="confirm('formLabelAlign')" v-if="btnPhone">确 定</el-button>
      <el-button type="primary" class="affirm-btn" :loading="true" v-else></el-button>
      <el-button @click="close" class="hover-btn clospay">取 消</el-button>
  </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      var phone = (rule, value, callback) => {
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!value) {
          return callback(new Error('请输入手机号'))
        } else if (!myreg.test(value)) {
          return callback(new Error('手机号不正确'))
        } else {
          callback()
        }
      }
      var code = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      }
      return {
        btnPhone: true,
        disabledTrue: 1,
        codeName: '获取验证码',
        formLabelAlign: {
          phone: '',
          code: ''
        },
        rules: {
          phone: [
            {validator: phone, trigger: 'blur'}
          ],
          code: [
            {validator: code, trigger: 'blur'}
          ]
        },
        centerDialogVisible: true
      }
  },
    methods: {
      confirm (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formData = {
              phone: this.formLabelAlign.phone,
              code: this.formLabelAlign.code
            }
            this.btnPhone = true
            this.$loginAjax.editname(formData).then((res) => {
              if (res.data.code == 200) {
                this.$messageTitle('设置保存成功', 'success')
                this.$emit('showPhone', this.formLabelAlign.phone)
                this.$emit('closePhone', 1)
                this.btnPhone = true
                return
              }
              this.$messageTitle(res.data.msg, 'error')
              this.btnPhone = true
            }).catch((err) => {
              this.$messageTitle('网络错误，请稍后再试', 'error')
              this.btnPhone = true
            })
          } else {
            return false
          }
        })
      },
      // 修改手机 组件
      verify () {
        this.$refs['formLabelAlign'].validateField('phone', (validMessage) => {
          if (!validMessage) {
            this.disabledTrue = 2
            this.$loginAjax.sendEditVerifyCode(this.formLabelAlign.phone).then((res) => {
              if (res.data.code == 200) {
                this.$messageTitle('验证码发送成功', 'success')
                this.disabledTrue = 3
                this.setTime()
                return
              }
              this.$messageTitle(res.data.msg, 'error')
              this.disabledTrue = 1
            }).catch((err) => {
              this.$messageTitle('网络错误，请稍后再试', 'error')
              this.disabledTrue = 1
            })
          }
        })
      },
      setTime () {
        var time = 59
        this.codeName = '已发送(' + 60 + ')'
        var clearTime = setInterval(() => {
          var new_Time = time--
          this.codeName = '已发送(' + new_Time + ')'
          if (time == 0) {
            this.codeName = '获取验证码'
            clearTimeout(clearTime)
            this.disabledTrue = 1
          }
        }, 1000)
      },
      close () {
        this.$emit('phoneClone', false)
        this.$emit('closePhone')
      }
    }
  }
</script>
