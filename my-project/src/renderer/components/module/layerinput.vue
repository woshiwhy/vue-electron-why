<template>
  <el-dialog
    class="center-dialog"
    :title="title"
    :visible.sync="centerDialogVisible"
    :width="width||'4.21rem'"
    :before-close="close"
    top="20vh"
    center>
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
      <el-form-item label="API钥匙" prop="apiKey">
        <el-input type="text" v-model="formLabelAlign.apiKey" placeholder="输入交易所的API钥匙"></el-input>
      </el-form-item>
      <el-form-item label="密匙" prop="secretKey">
        <el-input type="text" v-model="formLabelAlign.secretKey" placeholder="请输入密匙"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="affirm-btn" @click="confirm('formLabelAlign')">确 定</el-button>
      <el-button @click="close" class="hover-btn clospay">取 消</el-button>
  </span>
  </el-dialog>
</template>
<style scoped>
  button {
    width: 40% !important;
  }
</style>
<script>
  export default {
    props: ['titlename', 'changeObj', 'width'],
    data () {
      var apiKey = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入交易所的API钥匙'))
        } else {
          callback()
        }
      }
      var secretKey = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密匙'))
        } else {
          callback()
        }
      }
      return {
        formLabelAlign: {
          apiKey: '',
          secretKey: '',
          siteId: this.changeObj.siteId
        },
        centerDialogVisible: true,
        rules: {
          apiKey: [
            {validator: apiKey, trigger: 'blur'}
          ],
          secretKey: [
            {validator: secretKey, trigger: 'blur'}
          ]
        }
      }
  },
    created () {
      this.title = this.titlename || this.changeObj.siteName + '密匙绑定'
    },
    methods: {
      confirm (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formLabelAlign.apiKey = this.formLabelAlign.apiKey.replace(/\s/ig, '')
            this.formLabelAlign.secretKey = this.formLabelAlign.secretKey.replace(/\s/ig, '')
            this.ajaxPost()
          }
        })
      },
      ajaxPost () {
        this.$postAxios.bindAxios(this.formLabelAlign).then((ref) => {
          if (ref.data.code == 200) {
            let api_Key = this.formLabelAlign.apiKey
            let secret_Key = this.formLabelAlign.secretKey
            this.$emit('confirm')// 成功会返回当前绑定数据ID
            this.changeObj.id = ref.data.data
            this.changeObj.apiKey = api_Key.substr(0, 4) + '*********' + api_Key.substr(parseInt(api_Key.split('').length - 4), api_Key.split('').length)
            this.changeObj.secretKey = secret_Key.substr(0, 4) + '*********' + secret_Key.substr(parseInt(secret_Key.split('').length - 4), secret_Key.split('').length)
            this.$messageTitle('添加成功', 'success')
            this.$store.dispatch('bindApi', [])
            return
          }
          this.$messageTitle(ref.data.msg || '添加失败', 'error')
        }).catch((err) => {
          this.$messageTitle('网络错误', 'error')
        })
      },
      close () {
        this.$emit('close')
      }

    }
  }
</script>
