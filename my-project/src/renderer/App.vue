<template>
    <div style="height: 100%">
        <transition name="el-fade-in-linear">
        <el-dialog
                custom-class="downClass"
                :visible.sync="dialogVisible"
                :show-close="false"
                :close-on-press-escape="false"
                :fullscreen="true">
            <maxmin-btn class="btn-position"></maxmin-btn>
            <div class="visit-box">{{visit}}版本</div>
            <div style="color:#4e5b85;font-size: 14px;margin-bottom: 5px">更新中...</div>
            <el-progress  :stroke-width="7" color="#67c23a"  :percentage="percentage" ></el-progress>
        </el-dialog>
        </transition>
        <transition name="el-fade-in-linear">
             <router-view  style="height: 100%"/>
        </transition>
    </div>
</template>

<script>
  import minmax from '@/components/module/minmax'
  const { ipcRenderer,remote } = require('electron');
  export default {
    name: 'App',
    data() {
      return {
        visit:'最新',
        dialogVisible: false,
        percentage:0,
      }
    },
    components: {
      'maxmin-btn': minmax
    },
    beforeCreate(){
      ipcRenderer.on('message',(event,{message,data}) => {
        if(message==='updateavailable'){ //有更新
          this.dialogVisible=true;
          this.visit=data.version;
          remote.getCurrentWindow().setSize(420,210)
        }
        if(message==='downloadProgress'){//下载中
          this.percentage=data.percent.toFixed(1);
        }
      });
    },
    created () {
//      ;

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "./assets/scss/app.scss";
    .visit-box{
        position: absolute;
        width: 100%;
        padding-right: 10px;
        text-align: center;
        top:51px;
        font-size: 13px;
        color: #fefeff ;
    }
    .downClass{
        background:#262a4a!important;
    }
    .downClass>.el-dialog__header{
        height: 113px!important;
        background: url("../../static/img/down.png")no-repeat;
        background-size: 100%;
    }
    .downClass>.el-dialog__body{
        padding:25px 10px 0 10px!important;
    }
    .downClass .el-progress__text{
        font-size:12px!important;
        color: #cad0db;
    }
    .downClass .el-progress-bar{
        padding-right: 40px!important;
        margin-right: -45px!important;
    }
    .downClass .el-progress-bar__outer{
        background: #4e5b85;
    }
</style>

