<template>
  <div class="small-box skin-bg" v-loading="loadingType"
       element-loading-background="rgba(0, 0, 0, 0)">
    <h3 class="title-name">{{$t("headline.master")}}</h3>
    <ul>
      <li v-for="(item,index) in authosList" @click="openNew(item)" :key="index">
        <img :src="'http://bitbus.club'+item.bannerImg" alt="大咖头像">
        <div class="author-name">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .small-box{
    height: -moz-calc(100% - 6.05rem);
    height: -webkit-calc(100% - 6.05rem);
    height: calc(100% - 6.05rem);
    margin-bottom: 0;
  }
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
          listPost:{
              eq: {"journalism_classify":"1000-1001"},
              page: {
                  current: 1,
                  size:6
              }
          },
          loadingType:false,
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
      computed: { //  监听选中值
          authosList () {
              return this.$store.state.home.authosList
          }
      },
      created(){
          if(!this.authosList.length){
              this.newListPost();
          }
      },
    methods: {
        newListPost(){
            this.loadingType=true;
            this.$postAxios.newList(this.listPost).then((res) => {
                if(res.data.code==200){
                    this.loadingType=false;
                    this.$store.dispatch('authosList', res.data.data.records);
                }
            })
        },
      openNew (data) {
        if (window.require) {
          const {shell} = window.require('electron').remote;
          shell.openExternal(data.links)
        }
      }
    }
  }
</script>
