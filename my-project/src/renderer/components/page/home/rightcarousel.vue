<template>
  <el-carousel class="home-carousel" trigger="click" height="1.95rem">
    <el-carousel-item v-for="(item ,index) in carouselList"  :key="index">
     <img :src="item.src">
    </el-carousel-item>
  </el-carousel>
</template>
<style>
  .home-carousel img{
   width: 100%;
  }
  .home-carousel .el-carousel__indicator{
    padding: 0.12rem 0.04rem;
  }
  .home-carousel .el-carousel__button{
    width: 0.3rem;

  }
  .home-carousel .el-carousel__arrow{
    width: 0.36rem;
    height: 0.36rem;

    background: rgba(127,127,127,0.5)!important;


  }
  .home-carousel i{
    color: #FFFFff!important;
  }
  .el-carousel__arrow:hover{
    background: rgba(127,127,127,0.8)!important;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<script>
  export default {
    data () {
      return {
        carouselList: [
          {
            src: './static/img/carousel/one.jpg'
          },
          {
            src: './static/img/carousel/two.jpg'
          }
        ]
      }
    }
  }
</script>
