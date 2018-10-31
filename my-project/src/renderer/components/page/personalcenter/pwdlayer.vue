<template>
  <el-dialog
    class="center-dialog"
    title="修改密码"
    :visible.sync="centerDialogVisible"
      width="4.21rem"
    :before-close="close"
    center>
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input type="password" @keyup.enter.native="confirm('formLabelAlign')" v-model="formLabelAlign.oldPwd" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" @keyup.enter.native="confirm('formLabelAlign')" v-model="formLabelAlign.newPwd" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="CheckPwd">
        <el-input type="password" @keyup.enter.native="confirm('formLabelAlign')" v-model="formLabelAlign.CheckPwd" placeholder="请输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="affirm-btn" ref="id" @click="confirm('formLabelAlign')"  v-if="btnPwd">确 定</el-button>
      <el-button type="primary" class="affirm-btn" :loading="true" v-else></el-button>
      <el-button @click="close" class="hover-btn clospay">取 消</el-button>
  </span>
  </el-dialog>
</template>
<script>
  import formMound from '&/from'
export default {
    data () {
      var oldPass = (rule, value, callback) => {
        const regPaw = /^[^ ]+$/
        if (value === '') {
          callback(new Error('请输入原密码'))
        } else if (value.length < 8) {
          callback(new Error('密码长度不能小于8位'))
        } else if (value.length > 16) {
          callback(new Error('密码长度不能超过16位'))
        } else if (!regPaw.test(value)) {
          callback(new Error('密码中不能包含空格'))
        } else {
          callback()
        }
      }
      var newPass = (rule, value, callback) => {
        const regPaw = /^[^ ]+$/
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else if (value.length < 8) {
          callback(new Error('密码长度不能小于8位'))
        } else if (value.length > 16) {
          callback(new Error('密码长度不能超过16位'))
        } else if (!regPaw.test(value)) {
          callback(new Error('密码中不能包含空格'))
        } else {
          if (this.formLabelAlign.CheckPwd !== '' && this.formLabelAlign.CheckPwd) {
            this.$refs.formLabelAlign.validateField('CheckPwd')
          }
          callback()
        }
      }
      var CheckPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formLabelAlign.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        btnPwd: true,
        formLabelAlign: {
          oldPwd: '',
          newPwd: '',
          CheckPwd: ''
        },
        rules: {
          oldPwd: [
            {validator: oldPass, trigger: 'blur'}
          ],
          newPwd: [
            {validator: newPass, trigger: 'blur'}
          ],
          CheckPwd: [
            {validator: CheckPwd, trigger: 'blur'}
          ]
        },
        centerDialogVisible: true
      }
  },
    components: {
      'form-box': formMound
    },
    methods: {
      confirm (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.btnPwd = false
            let formData = {
              oldPassword: this.$md5(this.formLabelAlign.oldPwd),
              newPassword: this.$md5(this.formLabelAlign.newPwd)
            }
            this.$loginAjax.resetPassword(formData).then((res) => {
              if (res.data.code == 200) {
                this.$messageTitle('设置保存成功', 'success')
                this.btnPwd = true
                this.$emit('pwdClone', false)
                return
              }
              this.$messageTitle(res.data.msg, 'error')
              this.btnPwd = true
            }).catch((res) => {
              this.$messageTitle('网络错误，请稍后再试', 'error')
              this.btnPwd = true
            })
          } else {
            return false
          }
        })
      },
      close () {
        this.$emit('pwdClone', false)
      }
    }
  }
</script>
