<template>
  <div class="small-box skin-bg">
    <h3 class="title-name">{{$t("headline.airdrop")}}</h3>
    <div class="scroll-wrap">
        <listcarousel-box :items="items" :refName="'welare'"></listcarousel-box>
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
        items:
        [
          {name: '欧盟人口最少的国家正在成为数字加密货币和在线博彩的港湾，但也成了腐败和洗钱的中心港', href: 'https://mp.weixin.qq.com/s/0l7Vzo5Cjkq6g94N26N9O'},

          {name: '在经历看似繁荣的海市蜃楼和跌落后，一塌方将会更加接近它的本质，这或许也是那位年轻V神想看到的结果吧', href: 'https://mp.weixin.qq.com/s/LUtAl7bfuLTjkjF6wI2-8A'},

          {name: '经济危机来临之际，传统金融体系的地位面临挑战，与数字货币体系的繁荣，此消彼长', href: 'https://mp.weixin.qq.com/s/4hVN5LQt2DqQAc0JER1NpA'},

          {name: '最细微的碰撞，都能让我们的存在根本产生动摇。连一道光瀑的泻下，都可以从中看到永恒', href: 'https://mp.weixin.qq.com/s/Zf9dXoZzRbI9Q22HhH9fgw'},

          {name: '只有当潮水褪去的时候，才知道是谁在裸泳', href: 'https://mp.weixin.qq.com/s/u6xJSaoWc_858BrnyNkeQg'},

          {name: '彼一时，数字货币也许将来真的会成为各大巨头所争相摸索的一项重要工具', href: 'https://mp.weixin.qq.com/s/JJbaMlyj8dZfUn1FUMUa-w'},

          {name: '迅雷的想法何其多，陈磊的野心何其大', href: 'https://mp.weixin.qq.com/s/hwTlFhdcMmFieQd7N1V1bQ'},

          {name: '再见，HADAX,你好创业板', href: 'https://mp.weixin.qq.com/s/WqNTyLWdJ_TjnIyDXv7R0w'},

          {name: '数字公开课，V以何成神', href: 'https://mp.weixin.qq.com/s/Lx8MZQfwkXkOk0fFigdGcg'},

          {name: 'Ethereum一个充满宇宙、让光线行进却不可见的物质', href: 'https://mp.weixin.qq.com/s/0UgmrgjDw9UC0_Ciz6ya3g'}
        ]
      }
    },
    components: {
      'listcarousel-box': listCarousel
    }
  }
</script>
