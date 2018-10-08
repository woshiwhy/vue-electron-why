<template>
  <el-dialog
    :visible.sync="ispaid"
    class="center-dialog red-nav"
    width="3.21rem"
    :before-close="close"
    top="37.2vh"
    center>
    <p style="text-align:center; font-size:.21rem;"><span>{{title}}</span></p>
    <p style="text-align:center;width:100%;">
      <img
      style="width:60%; height:60%;"
      src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529410350228&di=4c0730e8b7f83e914352387ae5b61ec2&imgtype=0&src=http%3A%2F%2Fsrc.house.sina.com.cn%2Fimp%2Fimp%2Fdeal%2F86%2F68%2F4%2Fe51eac8a98c2bd65c6b68bae86c_p1_mk1_wm35.gif' />
    </p>
    <p style="text-align:center; margin: .01rem 0; font-size:.2rem; color:red;"><span  >{{money}}元/月</span></p>
    <p style="text-align:center; margin: .06rem 0 .01rem 0;">
    <span>
      <el-input-number v-model="num1" size="small" @change="handleChange" :min="1"></el-input-number>
    </span>
  </p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="affirm-btn" @click="confirm" style="width:1rem;">确 定</el-button>
      <el-button @click="close"  style="width:1rem;" class="execute-btn">取消</el-button>
  </span>
  </el-dialog>
</template>
<script type="text/javascript">
export default{
  props: ['title', 'money'],
  data () {
    return {
      ispaid: true,
      num1: '1'
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm')
    },
    close () {
      this.$emit('close')
    },
    handleChange (value) {
      console.log(value)
    }
  }

}
</script>
<style>
.red-nav .el-dialog__header{
  background: none;
}
.red-nav.center-dialog .el-dialog__close{
  color: #080707!important;
}
.red-nav{
  position: fixed;
  z-index: 9999;
}
.execute-btn{
  background: #d9d9d9;
}
.red-nav .center-dialog .el-dialog__footer{
  padding: 0.01rem 0.2rem 0.25rem;
}
</style>
