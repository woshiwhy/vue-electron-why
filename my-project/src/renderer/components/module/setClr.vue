<template>
  <el-dialog
    :title="boxObj.title"
    :visible.sync="setClrBox"
    :before-close="handleClose"
    width="4.21rem"
    class="center-dialog"
    center>
    <p class="setingBg">
      <el-radio-group v-model="skinType" >
        <el-radio v-for="(item,index) in boxObj.radioArry" :key="index" :label="item.val">{{item.name}}</el-radio>
      </el-radio-group>
    </p>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirm()">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  export default {
      props:['boxObj'],
    data () {
      return {
          skinType: 1,
          setClrBox:true
      }
  },
      mounted (){
          let boxType=this.boxObj.type;
          let typeNumber='';
          switch (boxType){
              case 'theme':
                  typeNumber = Number(localStorage.getItem('skinType') || 1);
                  this.$store.dispatch('skinType', typeNumber);
                  break;
              case 'lang':
                  typeNumber = localStorage.getItem('languageType') || 'cn';
                  break;
          }
          this.skinType = typeNumber
      },
    methods: {
      confirm () {
          if(this.boxObj.type=='theme'){
              this.$store.dispatch('skinType', this.skinType)
              localStorage.setItem('skinType', this.skinType)
          }
          else {
              localStorage.setItem('languageType', this.skinType)
              this.$emit('langchat', this.skinType)
          }

          this.handleClose()
      },
      handleClose () {
        this.$emit('closeBox')
      }
    }
  }
</script>
<style scoped>
  ul{
    background: #ffffff!important;
  }

</style>
<style >
  .setingBg{
    text-align: center;
  }
  .setingBg .el-radio-group .el-radio + .el-radio{
    margin-left: .6rem;
  }
</style>
