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
        destroy: '',
        webStraddle: {// 套利，发送
          'site': 'hub',
          'event': 'subscribe',
          'channel': 'home_tl',
          'symbol': 'hub'
        },
        webAuto: { // 自动交易
          'site': 'hub',
          'event': 'subscribe',
          'channel': 'depth_monitor',
          'symbol': ''
        }
      }
    },
    computed: {
      playPlan () { // 正在执行的策略
        return this.$store.state.auto.playPlan
      },
      currenActive () {
        return this.$store.state.sopttrading.selectCurrenty.uniteSymbol
      },
      bazzerActive () {
        return this.$store.state.sopttrading.selectBazzer.siteId
      },
      worldActive () { // 国际行情选中的市场
        return this.$store.state.world.activeBazzer.siteId
      }
    },
    components: {
      'header-box': headerBox
    },
    beforeDestroy () {
      this.$store.state.webSocket.close()//  关闭通信.
  },
    created () {
      this.websocket()
      this.autoPlan()
      this.bazzer()// 存储交易市场
  },
    methods: {
      destroyVal (data) {
        this.destroy = data
      },
      bazzer () { // 存储交易市场
        this.$postAxios.bazzerAxios().then((res) => {
          let data_Val = res.data
          if (data_Val.code == 200) {
            this.$store.dispatch('bazzer', data_Val.data)
          }
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
      },
      websocket () { // 长链接，
        let ws = new WebSocket(webSocketOBj.url)
        this.$store.dispatch('webSocket', ws)
        ws.onopen = () => {
          this.$store.dispatch('webSocketType', true)// 改变websock状态改为连接
          const logo_ws = {
            data: localStorage.getItem('userToken'),
            event: 'login',
            flag: 'Basic d2ViQXBwOndlYkFwcA=='
          }
          ws.send(JSON.stringify(logo_ws)) // 每次链接发送TOKEN.
          const auto_Id = this.$store.state.auto.playPlan.monitorId// 自动交易方案Id;
          if (auto_Id) { // 如果有ID~每次登录后自动执行自动交易；
            this.webAuto.symbol = auto_Id
            ws.send(JSON.stringify(this.webAuto))
          }

          ws.send(JSON.stringify(this.webStraddle))
          this.heartSend()
        }
        ws.onmessage = evt => {
          let webVal = JSON.parse(evt.data)
          if (webVal.event == 'pong') {
            return
          }
          ;
          switch (webVal.channel) {
            case 'home_tl': //  套利
              this.$store.dispatch('interest', webVal.data)
              break
            case 'depth50': // 深度
              if (webVal.symbol == this.currenActive && webVal.site == this.bazzerActive) { //  判断当前接受的币对是不是选中的币对
                this.$store.dispatch('depthChart', webVal.data)// 深度
                if (this.$store.state.sopttrading.buyPrice == '') {
                  this.$store.dispatch('buyPrice', webVal.data.bids[0]) // 获得当前最高买入价
                  this.$store.dispatch('sellPrice', webVal.data.asks[0])// 获得当前最低卖出价
                }
              }
              break
            case 'ticker': // 国际行情
              if (webVal.symbol == this.worldActive) { //  判断当前交易所
                this.$store.dispatch('worldTable', webVal)
              }

              break
            case 'depth_monitor':// 自动交易
              const auto_Old = this.playPlan.monitorId// 自动交易方案Id;
              const planId = webVal.symbol
              const interest_New = webVal.data// 当前利差
              const interest = this.playPlan.pricePercent// 设置的利差
              if (auto_Old == planId && interest_New >= interest) { // 获得方案ID和设置的方案ID相等，当前利差大于等于设置的利差执行。
                this.$postAxios.ImplemenStrategy({strategyId: this.playPlan.id}).then((res) => {
                  if (res.data.code == 200) {
                    this.$notify({
                      title: '成功',
                      message: '完成了一笔自动交易',
                      offset: 100,
                      type: 'success'
                    })
                  }
                }).catch((err) => {
                })
              }
              break
          }
        }
        ws.onclose = () => {
          this.$store.dispatch('webSocketType', false)// 改变websock状态改为断开
          window.clearTimeout(this.timOBj)
          setTimeout(() => { // websocket断线每隔5S重连
            this.websocket()
          }, 5000)
          console.log('连接已关闭...')
        }
      //        // 路由跳转时结束websocket链接
      //        this.$router.afterEach(function () {
      //          ws.close()
      //        })
      },
      heartSend () { // 心跳发送
        this.timOBj = setTimeout(() => {
          this.heartSend()
          this.$store.state.webSocket.send('{ "event":"ping"}')
        }, webSocketOBj.OutTime)
      },
      autoPlan () { // 正在执行的策略
        const user_Id = JSON.parse(localStorage.getItem('userInfor')).id
        this.$postAxios.autoPlanInfor(user_Id).then((res) => {
          let data_Val = res.data
          if (data_Val.code == 200 && data_Val.data) { // 有值发送自动交易命令
            this.webAuto.symbol = data_Val.data.monitorId
            //              data_Val.data.pricePercent*100;
            this.$store.dispatch('playPlan', data_Val.data)
            this.$store.state.webSocket.send(JSON.stringify(this.webAuto))
          }
        }).catch((err) => {
        })
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

