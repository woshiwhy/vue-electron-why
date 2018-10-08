<template>
  <div class="small-box skin-bg" style="margin-bottom:0;padding-bottom: 0.62rem">
    <h3 class="title-name">{{$t("headline.master")}}</h3>
    <ul>
      <li v-for="(item,index) in authorList" @click="openNew(item.href)" :key="index">
        <img :src="item.src">
        <div class="author-name">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .small-box li{
    display: inline-block;
    width: 1.03rem;
    text-align: center;
    padding-top: 0.2rem;
    cursor: pointer;
  }
  .author-name{
    margin-top: 0.05rem;
  }
  img{
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
  }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        authorList: [
          {
            name: 'BTC资本',
            href: 'https://weibo.com/6556568915/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1',
            src: './static/img/author/btc.jpg'
          },
          {
            name: '陈伟星',
            href: 'https://weibo.com/chenweixing?profile_ftype=1&is_all=1#_0',
            src: './static/img/author/mschen.jpg'
          },
          {
            name: 'Blockchain',
            href: 'https://weibo.com/u/2149500273?profile_ftype=1&is_all=1#_rnd1533002674979',
            src: './static/img/author/mstang.jpg'
          },
          {
            name: '徐明星',
            href: 'https://weibo.com/phystar?is_hot=1#_rnd1533002987922',
            src: './static/img/author/msstart.jpg'
          },
          {
            name: 'cz_binance',
            href: 'https://weibo.com/changpengzhao?profile_ftype=1&is_all=1#_rnd1533002768699',
            src: './static/img/author/msxu.jpg'
          },
          {
            name: '江卓尔',
            href: 'https://weibo.com/ltc1btc?profile_ftype=1&is_all=1#_0',
            src: './static/img/author/msjang.jpg'
          }
        ]
      }
    },
    methods: {
      openNew (href) {
        if (window.require) {
          const {shell} = window.require('electron').remote
          shell.openExternal(href)
        }
      }
    }
  }
</script>
