<template>
  <el-container>
    <el-aside width="3.75rem">
      <div class="small-box skin-bg">
        <h3 class="title-name">{{$t("headline.common")}}</h3>
        <ul class="aside-nav">
          <template v-for="(item,index) in navList">
            <li class="bg" :class="[{'active':item.active},item.active?item.activebg:item.class]" @click="navClick(item.href,index)">
              {{item.name}}
            </li>
          </template>
        </ul>
      </div>
      <!--货币列表-->
      <currency-box></currency-box>
      <!--空头列表-->
      <welfare-box></welfare-box>
      <!--推荐-->
      <recommend-box></recommend-box>

    </el-aside>
    <el-main class="main-width" style="margin-right: 0.1rem">
      <!--套利-->
      <transition name="fade">
        <straddle-box v-show="$store.state.home.homeMore"></straddle-box>
      </transition>
      <!--套利排行榜-->
      <arbitrage-box></arbitrage-box>
    </el-main>
    <el-aside width="3.1rem">
      <!--轮播图-->
      <carousel-box style="margin-bottom: 0.1rem"></carousel-box>
      <!--新闻-->
      <new-box></new-box>
      <!--作者-->
      <author-box></author-box>
    </el-aside>
  </el-container>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>

.main-width{
  width: -moz-calc(100% - 7.05rem);
  width: -webkit-calc(100% - 7.05rem);
  width: calc(100% - 7.05rem);
}
  .aside-nav>li{
    cursor: pointer;
    width: 1.25rem;
    height: 1.05rem;
    line-height: 1.4rem;
    text-align: center;
    display: inline-block;
    font-size: 0.16rem;
    background-size: 0.27rem;
    background-position: center 0.27rem;
    background-repeat: no-repeat;
  }
</style>
<script type="text/javascript">
  import currencyList from '~/home/currencyList' //  查询历史
import WelFare from '~/home/welfare'// 福利空头
import Recommend from '~/home/recommend'// 推荐
import Carousel from '~/home/rightcarousel'// 轮播
import NewList from '~/home/newlist'// 新闻列表
import Author from '~/home/author'// 大咖
import Arbitragetable from '~/home/arbitragetable'// 套利排行榜
import Straddle from '~/home/straddle'// 套利
export default {
    data () {
      return {
        boxShow: true
      }
    },
    computed: {
      navList () {
        return [
          {name: this.$t('navName.spot'), href: '/spottrading', active: false, class: 'xianhuo-bg', activebg: 'xianhuo-active'},
          {name: this.$t('navName.auto'), href: '/outotrade', active: false, class: 'zidong-bg', activebg: 'zidong-active'},
          {name: this.$t('navName.international'), href: '/worldmarket', active: false, class: 'guoji-bg', activebg: 'guoji-active'},
          {name: this.$t('navName.binding'), href: '/binding', active: false, class: 'shouquan-bg', activebg: 'shouquan-active'},
          {name: this.$t('navName.account'), href: '/accountset', active: false, class: 'personal-bg', activebg: 'zhsz-active'}
        ]
      }
    },
    components: {
      'currency-box': currencyList,
      'welfare-box': WelFare,
      'recommend-box': Recommend,
      'carousel-box': Carousel,
      'new-box': NewList,
      'author-box': Author,
      'arbitrage-box': Arbitragetable,
      'straddle-box': Straddle
    },
    methods: {
      navClick (href, index) {
        this.$store.dispatch('navType', index + 1);
        this.$router.push(href)
      }
    }
  }
  </script>
