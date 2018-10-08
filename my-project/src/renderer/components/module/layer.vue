<template>
  <el-dialog
    class="center-dialog"
    :title="title"
    :visible.sync="centerDialogVisible"
    :width="width||'4.21rem'"
    :before-close="close"
    top="20vh"
    center>
    <span>{{content}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="affirm-btn" @click="confirm">确 定</el-button>
      <el-button @click="close" class="hover-btn clospay">取 消</el-button>
  </span>
  </el-dialog>
</template>
<style scoped>
  button{
    width: 40% !important;
  }
</style>
<script>
  export default {
    props: ['titlename', 'content', 'width'],
    data () {
      return {
        formLabelAlign: {
          title: '',
          centerDialogVisible: true
        },
        centerDialogVisible: true
      }
  },
    created () {
      this.title = this.titlename || '提示'
    },
    methods: {
      confirm () {
        this.$emit('confirm')
      },
      close () {
        this.$emit('close')
      }

    }
  }
</script>
