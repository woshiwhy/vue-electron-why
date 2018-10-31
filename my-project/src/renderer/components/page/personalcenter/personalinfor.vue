<template>
  <el-form ref="form" :model="form" label-width="0.8rem" class="infor-box" :rules="rules">
    <upphoto-box :dataUrld="form.avatar" :loding="loding" @sendUppoto="sendUppoto"></upphoto-box>
    <el-form-item :label='$t("tip.name")' prop="name" class="perName">
      <el-input v-model="form.name" @keyup.enter.native="onSubmit('form')" size="medium"></el-input>
    </el-form-item>
    <el-form-item :label='$t("tip.sex")' prop="resource">
      <el-radio-group v-model="form.gender">
        <el-radio label="1" style="font-weight: 500">{{$t("tip.man")}}</el-radio>
        <el-radio label="0" style="font-weight: 500">{{$t("tip.woman")}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label='$t("tip.birth")' >
      <el-date-picker
        v-model="form.birthday"
        type="date"
        format="yyyy - MM - dd "
        :placeholder='$t("placeholder.SelectDate")'
        :picker-options="pickerOptions0">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label='$t("tip.resume")' prop="profile">
      <el-input type="textarea" v-model="form.profile" ></el-input>
    </el-form-item>
    <el-form-item class="form-btn100">
      <el-button type="primary" @click="onSubmit('form')" v-if="btnTrun">{{$t("btnname.saveInfor")}}</el-button>
      <el-button type="primary" :loading="true" v-else></el-button>
    </el-form-item>
  </el-form>
</template>
<style>
  .infor-box {
    padding: 0 0.42rem;
  }

  .infor-box textarea {
    height: 1rem;
    resize: none;
  }

  /* 上传 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 103px;
    height: 103px;
    line-height: 103px;
    text-align: center;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  .avatar {
    width: .99rem;
    height: .99rem;
    display: block;
  }

  .imgUplodar {
    display: flex;
    justify-content: center;
    margin-bottom: .15rem;
  }
  .perName{
    margin-top: .16rem;
  }
  .infor-box .el-date-editor.el-input{
    width: 100%;
  }
</style>
<script>
  import {escapeHTML, unescapeHTML} from '../../../assets/message'
  import upPhoto from '&/upphoto'

  export default {
    components: {
      'upphoto-box': upPhoto
    },
    computed: {
      userInfor () {
        let userData = this.$store.state.usersInfor
        userData.gender = userData.gender.toString()
        return userData
      }

    },
    watch: {
      userInfor (n, o) {
        if (n) {
          this.coplyData(n)
        }
      }
    },
    data () {
      var regName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('昵称不能为空'))
        } else if (value.length < 2) {
          callback(new Error('昵称长度不能小于2位'))
        } else if (value.length > 12) {
          callback(new Error('昵称长度不能超过12位'))
        } else {
          callback()
        }
        ;
      }
      var regProfile = (rule, value, callback) => {
        callback()
      }
      var regResource = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('选择性别'))
        } else {
          callback()
        }
        ;
      }
      return {
        disableImg: false,
        btnTrun: true,
        loding: false,
        form: {
          name: '',
          gender: '1',
          profile: '',
          birthday: ''
        },
        // birthday:'',
        rules: {
          name: [
            {validator: regName, trigger: 'blur'}
          ],
          profile: [
            {validator: regProfile, trigger: 'blur'}
          ],
          gender: [
            {validator: regResource, trigger: 'blur'}
          ]
        },
        pickerOptions0: { // 选择时间必须是今天以前
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    mounted () {
      if (this.userInfor.name) {
        this.coplyData(this.userInfor)
      }
    },
    methods: {
      coplyData (n) {
        let createdOBj = JSON.stringify(n)
        this.form = JSON.parse(createdOBj)
        this.form.name = unescapeHTML(this.userInfor.name)
        this.form.profile = unescapeHTML(this.userInfor.profile)
        this.form.birthday = this.userInfor.birthday
      },
      onSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.btnTrun = false
            let save_Data = {
              gender: this.form.gender,
              name: escapeHTML(this.form.name),
              birthday: this.form.birthday,
              profile: escapeHTML(this.form.profile)
            }
            this.$loginAjax.edit(save_Data).then((res) => {
              this.btnTrun = true
              if (res.data.code == 200) {
                this.$messageTitle('设置保存成功', 'success')
                this.$store.dispatch('usersInfor', this.form)
                return
              }
              this.$messageTitle(res.data.msg, 'error')
            }).catch((err) => {
              this.$messageTitle('网络错误，请稍后再试', 'error')
              this.btnTrun = true
            })
          }
        })
      },
      // 上传头像
      sendUppoto (Img) {
        this.loding = true
        this.$loginAjax.setImage(Img).then((res) => {
          this.loding = false
          if (res.data.code == 200) {
            this.$messageTitle('头像上传成功', 'success')
            this.form.avatar = Img.avatarBase64
            this.$store.dispatch('usersInfor', this.form)
            return
          }
          this.$messageTitle('头像上传失败', 'error')
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
          this.loding = false
        })
      }
    }
  }
</script>
