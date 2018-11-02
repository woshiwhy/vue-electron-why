<template>
  <div id="change-skin" class="longin-box skin-one">
    <header-box :destroy="destroy"></header-box>
    <div class="content-height">
      <transition name="fade">
        <router-view @destroyType="destroyVal"/>
      </transition>
    </div>
    <layer-Box v-if="messageType" :messageOBj="messageOBj" @close="closeBox" @messageType="updateClick"></layer-Box>
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
    const { ipcRenderer,remote } = require('electron');
  import {webSocketOBj} from '../assets/axios'
  import headerBox from '@/components/header.vue'
  import layerBox from '&/updatedversion'
export default {
    data () {
      return {
        timOBj: '',
        destroy: '',
          messageType:false,
          messageOBj:''
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
      'header-box': headerBox,
      'layer-Box': layerBox,
    },
    beforeDestroy () {
      this.$store.state.webSocket.close();//  关闭通信.
  },
    created () {
      this.websocket();
      this.bazzer();// 存储交易市场
       setTimeout(()=>{
           this.messageList({type:'0004-0002',content:'测试'})
       },5000)

  },
    methods: {
        closeBox(){ //关闭更新通告
            this.messageType=false
        },
        updateClick(type){//更新公告提示。
            if(type!='0004-0003'){
                ipcRenderer.send('update', 2)
            }
            this.messageType=false
        },
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
        ws.onopen = () => {
            this.$store.dispatch('webSocket', ws);
          const logo_ws = {
            event: 'login',
              param:{
                  authorization:'Basic d2ViQXBwOndlYkFwcA==',
                  token:localStorage.getItem('userToken')
              },
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
                if(webVal.site==this.bazzerActive && webVal.symbol==this.currenActive){
                    this.$store.dispatch('depthChart', webVal.data);// 深度
                    if (this.$store.state.sopttrading.buyPrice == '') {
                        this.$store.dispatch('buyPrice', webVal.data.bids[0]); // 获得当前最高买入价
                        this.$store.dispatch('sellPrice', webVal.data.asks[0]);// 获得当前最低卖出价
                    }
                }
              break;
            case 'ticker': // 国际行情
              if (webVal.site == this.worldActive) { //  判断当前交易所
                  this.$store.dispatch('worldTable', webVal)
              }
              break;
              case 'kline': // K线图
                  if(webVal.site==this.bazzerActive && webVal.symbol==this.currenActive){
                      this.$store.dispatch('kLine', webVal.data);
                  }
                  break;
              case "message": // 系统消息
                  this.messageList(webVal.data);
                  break;
          }
        };
        ws.onclose = () => {
          window.clearTimeout(this.timOBj);
          this.$store.dispatch('webSocket', '');
          setTimeout(() => { // websocket断线每隔5S重连
            this.websocket()
          }, 5000);
          console.log('连接已关闭...')
        }
      },
        messageList(data){
            let dataType=data.type;
            switch (dataType){
                case '0004-0003':
                    this.$notify({
                        title: '系统消息',
                        message: data.content,
                        type: 'success',
                        duration: 0,
                        offset: 100
                    });
                    break;
              default://更新
                    this.messageType=true;
                    this.messageOBj=data;
                    break;
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

