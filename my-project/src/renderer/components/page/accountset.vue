<template>
  <el-container>
    <el-aside width="3.75rem">
      <div class="small-box skin-bg">
        <h3 class="title-name" style="margin-bottom: .2rem">{{$t("headline.personal")}}</h3>
        <personalinfor-box @getUserInfo="getUserInfo"></personalinfor-box>
      </div>
      <div class="small-box skin-bg bottom-box" style="margin-bottom: 0;">
        <h3 class="title-name">{{$t("headline.loginHistory")}}</h3>
        <robotbind-box></robotbind-box>
      </div>
    </el-aside>
    <main-box style=" overflow: auto!important"></main-box>
  </el-container>
</template>
<style scoped>
.bottom-box{
  height: calc(100% - 5.48rem);
  height: -moz-calc(100% - 5.48rem);
  height: -webkit-calc(100% - 5.48rem);
}
</style>
<script>
  import PersonalInfor from '~/personalcenter/personalinfor'
import RobotBind from '~/personalcenter/robotbind'
import InforTab from '~/personalcenter/infortab'
export default {
    components: {
      'personalinfor-box': PersonalInfor,
      'robotbind-box': RobotBind,
      'main-box': InforTab
    },
    computed: {
      userInfor () {
        return this.$store.state.usersInfor
      }
    },
    created () {
      if (!this.userInfor.name) {
        this.getUserInfo()
      }
    },
    methods: {
      //  获取用户信息
      getUserInfo () {
        this.$loginAjax.getUserIfor({}).then((res) => {
          if (res.data.code == 200) {
            this.$store.dispatch('usersInfor', res.data.data)
            return
          }
          this.$messageTitle(res.data.msg, 'error')
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
        })
      }
    }
  }
  </script>
