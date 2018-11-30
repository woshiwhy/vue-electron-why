<template>
  <el-carousel class="home-carousel skin-bg" trigger="click" height="1.95rem">
    <el-carousel-item v-for="(item ,index) in carouselList"  :key="index">
     <img :src="'http://bitbus.club'+item.bannerImg">
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
          listPost:{
              "eq": {"source":"web端"},
              page: {
                  current: 1,
                  size:3
              }
          }
      }
    },
      computed: { //  监听选中值
          carouselList () {
             return this.$store.state.home.bannerList
          }
      },
      created(){
        if(!this.carouselList.length){
            this.bannerPost();
        }
      },
      methods: {
          bannerPost(){
              this.$postAxios.banner(this.listPost).then((res) => {
                  if (res.data.code == 200) {
                      this.$store.dispatch('bannerList', res.data.data.records);
                  }
              })
          }
      }
  }
</script>
