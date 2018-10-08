<template>
  <div class="upIMG">
    <div id="up-photo">
      <div class="file-box clearfix">
        <div class="img-box">
          <img :src="urlImg" width="80px" height="80px" v-if="loding == false">
          <el-button type="button" style="width: .8rem;height: .8rem"  :loading="true" plain v-else></el-button>
        </div>
        <div class="file-up">
          <p>切换头像</p>
          <input type="file" @change="imgPreview($event)" ref="inputFile">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dataUrl: '',
        fileTypeArr: ['.jpg', '.png', '.jpeg'],
        baseImg: ''
      }
    },
    props: ['dataUrld', 'loding'],
    computed: {
      urlImg () {
        return this.dataUrld
      }
    },
    methods: {
      // 文件改变时重新赋值(函数)
      imgPreview (e) {
        let file = e.target.files[0]
        var fileSize = file.size
        var picSuffixCut = file.name.substring(file.name.lastIndexOf('.')).toLocaleLowerCase()
        if (fileSize > 1024 * 1024) {
          this.$message.error('头像不能大于1M')
          this.$refs.inputFile.value = ''
          return
        }
        // 判断文件格式
        var flag = true
        for (var val of this.fileTypeArr) {
          if (picSuffixCut != val) {
            flag = false
          } else {
            flag = true
            break
          }
        }
        if (!flag) {
          this.$message.error('头像格式不正确，请上传JPG，PNG，JPEG格式头像')
          this.$refs.inputFile.value = ''
        } else {
          this.imgget(file)
        }
      // this.$emit("sendUppoto",data);
      },
      // 获取图片
      imgget (file, callback) {
        let self = this
        // 判断支不支持FileReader
        if (!file || !window.FileReader) return
        if (/^image/.test(file.type)) {
        // 创建一个reader
          let reader = new FileReader()
          // 将图片转成base64格式
          reader.readAsDataURL(file)
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result
            let img = new Image()
            img.src = result
            console.log('********未压缩前的图片大小********')
            console.log(result.length)
            img.onload = function () {
              let _this = this
              let data = self.compress(img)
              self.imgUrl = result
              console.log(data.length)
              console.log(this)
              let imgDA = {
                avatarBase64: data
              }
              self.$emit('sendUppoto', imgDA)
            }
          }
        }
      },
      // 压缩图片
      compress (img) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let initSize = img.src.length
        let width = img.width
        let height = img.height
        canvas.width = width
        canvas.height = height
        // 铺底色
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, width, height)
        // 进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1)
        console.log('*******压缩后的图片大小*******')
        console.log(ndata)
        console.log(ndata.length)
        return ndata
      }
    },
    watch: {
      dataUrld: function () {
        this.dataUrl = this.dataUrld
      }
    }
  }
</script>

<style scoped>
  .upIMG{
    text-align: center;
  }
  #up-photo{
    border:1px solid #ddd;
    overflow: hidden;
    display: inline-block;
    width: 80px;
    height: 80px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  #up-photo .file-box{
    height: 80px !important;
    width: 80px !important;
    position: relative;
  }
  #up-photo .file-up p{
    color:white;
    width:80px;
    text-align: center;
    position:absolute;
    top:0;
    line-height: 80px;
    height:80px;
    cursor: pointer;
  }
  #up-photo .img-box>img{
    line-height: 80px;
    width: 80px;
    height: 80px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    display: inline-block;
    margin:0;
    outline: none;
    border:none;
  }
  #up-photo .img-box{
    position: relative;
    height:80px;
    width:80px;
  }
  #up-photo .file-up:hover{
    opacity:0.7;
  }
  #up-photo .file-up{
    opacity:0;
    background-color: #000;
    width: 80px;
    height: 80px;
    position: absolute;
    top:0;
  }
  #up-photo .file-up>input
  {
    top:0;
    z-index: 200;
    opacity:0;
    cursor: pointer;
    border:0;
    display: inline-block;
    width: 80px;
    height: 80px;
  }
</style>
