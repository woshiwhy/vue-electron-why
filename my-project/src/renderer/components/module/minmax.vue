<template>
  <div style="-webkit-app-region: no-drag">
    <span class="login-min" @click="maxMin(1)"></span>
    <span class="login-close" @click="maxMin(4)"></span>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "@/assets/scss/app.scss";
  span{
    cursor: pointer;
    display: inline-block;
    height: 15px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    margin-right: 10px;
    color: #ffffff;
  }
  .login-min{
    width: .17rem;
    background-image:$narrow_white;
  }
  .login-close{
    width: .15rem;
    background-image: $Close_white
  }
</style>
<script type="text/javascript">
  export default {
    methods: {
      maxMin (type) {
        if (window.require) { // 1是最小，2是全屏，3是还原，4是关闭
          const ipc = window.require('electron').ipcRenderer
          ipc.send('maxmin-logn', type)
        }
      }
    }

  }
  </script>
