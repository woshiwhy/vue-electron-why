<template>
  <div id="change-skin" class="longin-box skin-one">
    <header-box :destroy="destroy"></header-box>
    <div class="content-height">
      <transition name="fade">
        <router-view @destroyType="destroyVal"/>
      </transition>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/scss/skindefault";
  @import "../assets/scss/skinone";
  .default-skin { // 默认皮肤
    background: #f2f4f8;
  }
  .skin-one { // 皮肤1
    background: #222842;
  }
</style>
<script>
  import {webSocketOBj} from '../assets/axios'
import headerBox from '@/components/header.vue'
export default {
    data () {
      return {
        timOBj: '',
        destroy: ''
      }
    },
    computed: {
      currenActive () {
        return this.$store.state.sopttrading.selectCurrenty.uniteSymbol
      },
      bazzerActive () {
        return this.$store.state.sopttrading.selectBazzer.sysMark
      },
      worldActive () { // 国际行情选中的市场
        return this.$store.state.world.activeBazzer.sysMark
      }
    },
    components: {
      'header-box': headerBox
    },
    beforeDestroy () {
      this.$store.state.webSocket.close();//  关闭通信.
  },
    created () {
      this.websocket();
      this.bazzer();// 存储交易市场
  },
    methods: {
      destroyVal (data) {
        this.destroy = data
      },
      bazzer () { // 存储交易市场
        this.$postAxios.bazzerAxios().then((res) => {
          let data_Val = res.data;
          if (data_Val.code == 200) {
            this.$store.dispatch('bazzer', data_Val.data);
            localStorage.setItem('bazzerAll', JSON.stringify(data_Val.data));
            return
          }
            this.bazzerStore();
        }).catch((err) => {
            this.bazzerStore();
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
      },
        bazzerStore(){  //接口有误，取存储值
            let bazzerList=localStorage.getItem('bazzerAll');
            if(bazzerList){
                this.$store.dispatch('bazzer', JSON.parse(bazzerList));
            }
        },
      websocket () { // 长链接，
        let ws = new WebSocket(webSocketOBj.url);
        this.$store.dispatch('webSocket', ws);
        ws.onopen = () => {
          this.$store.dispatch('webSocketType', true);// 改变websock状态改为连接
          const logo_ws = {
            data: localStorage.getItem('userToken'),
            event: 'login',
            flag: 'Basic d2ViQXBwOndlYkFwcA=='
          };
          ws.send(JSON.stringify(logo_ws)) ;// 每次链接发送TOKEN.
          this.heartSend()
        };
        ws.onmessage = evt => {
          let webVal = JSON.parse(evt.data);
          if (webVal.event == 'pong') {
            return
          }
          switch (webVal.channel) {
            case 'OAS': //  套利
              this.$store.dispatch('interest', webVal.data);
              break;
            case 'depth': // 深度
                this.$store.dispatch('depthChart', webVal.data);// 深度
                if (this.$store.state.sopttrading.buyPrice == '') {
                  this.$store.dispatch('buyPrice', webVal.data.bids[0]); // 获得当前最高买入价
                  this.$store.dispatch('sellPrice', webVal.data.asks[0]);// 获得当前最低卖出价
                }
              break;
            case 'ticker': // 国际行情
              if (webVal.site == this.worldActive) { //  判断当前交易所
                  this.$store.dispatch('worldTable', webVal)
              }
              break;
              case 'kline': // K线图
                  this.$store.dispatch('kLine', webVal.data);
                  break;
          }
        };
        ws.onclose = () => {
          this.$store.dispatch('webSocketType', false);// 改变websock状态改为断开
          window.clearTimeout(this.timOBj);
          setTimeout(() => { // websocket断线每隔5S重连
            this.websocket()
          }, 5000);
          console.log('连接已关闭...')
        }
      },
      heartSend () { // 心跳发送
        this.timOBj = setTimeout(() => {
          this.heartSend();
          this.$store.state.webSocket.send('{ "event":"ping"}')
        }, webSocketOBj.OutTime)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

