<template>
  <div class="small-box skin-bg">
    <h3 class="title-name">{{$t("headline.airdrop")}}</h3>
    <div class="scroll-wrap">
        <listcarousel-box  v-loading="loadingType"
                           element-loading-background="rgba(0, 0, 0, 0)"
                           :items="listcarousel" ></listcarousel-box>
    </div>

  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .small-box{
    height: -moz-calc(100% - 7.24rem);
    height: -webkit-calc(100% - 7.24rem);
    height: calc(100% - 7.24rem);
  }
  .scroll-wrap{
    height: 1.56rem;
    overflow: hidden;
    padding:0 0.15rem;
  }


</style>
<script>
  import listCarousel from '&/listcarousel'
export default {
    data () {
      return {
        items:[],
          loadingType:false,
          listPost:{
              eq: {"journalism_classify":"1000-1002"},
              page: {
                  current: 1,
                  size:30
              }
          }
      }
    },
    computed: { //  监听选中值
        listcarousel () {
            return this.$store.state.home.listcarousel
        }
    },
    components: {
      'listcarousel-box': listCarousel
    },
    created(){
        if(!this.listcarousel.length){
            this.newListPost();
        }
    },
    methods: {
        newListPost(){
            this.loadingType=true;
            this.$postAxios.newList(this.listPost).then((res) => {
                if(res.data.code==200){
                    this.loadingType=false;
                    this.$store.dispatch('listcarousel', res.data.data.records);
                }
            })
        }
    }
  }
</script>
