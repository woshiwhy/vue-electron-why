<template>
  <el-dialog
    title="主题设置"
    :visible.sync="setClrBox"
    :before-close="handleClose"
    width="4.21rem"
    class="center-dialog"
    center>
    <p class="setingBg">
      <el-radio-group v-model="skinType">
        <el-radio :label="0">白色</el-radio>
        <el-radio :label="1">黑色</el-radio>
      </el-radio-group>
    </p>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirm()">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  export default {
    props: ['setClrBox'],
    data () {
      return {
        skinType: 1
      }
  },
    computed: {
      radioType () {
        let typeNumber = Number(localStorage.getItem('skinType') || 1)
        return typeNumber
      }
    },
    mounted () {
      this.skinType = this.radioType
      this.$store.dispatch('skinType', this.radioType)
    },
    methods: {
      confirm () {
        this.$store.dispatch('skinType', this.skinType)
        localStorage.setItem('skinType', this.skinType)
        this.handleClose()
      },
      handleClose () {
        this.$emit('closeBox')
      }
    }
  }
</script>
<style scoped>
  .setingBg{
    text-align: center;
  }
  .setingBg .el-radio-group .el-radio + .el-radio{
    margin-left: .6rem;
  }
</style>
