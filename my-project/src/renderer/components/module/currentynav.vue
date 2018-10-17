<template>
  <div class="soller-box">
    <i class="el-icon-arrow-left" @click="sollerLeft"></i>
    <ul class="soller-nav"  ref="sollerBox">
      <template v-for="(item,index) in currentyList">
        <li :ref="item.uniteSymbol" @click="navselect(item,index)" :class="{'active':item.active}">
          {{item.uniteSymbol}}
        </li>
      </template>
    </ul>
    <i class="el-icon-arrow-right" @click="sollerRight"></i>
  </div>
</template>
<style scoped>

  .active {
    color: #0098ff !important;
  }
</style>

<script>
  export default {
    props: ['navType', 'searchVal'], // searchVal搜索框选中的值

    computed: {
      depth () {
        return {
          'site': this.activeCurrenty.siteId, // 站点
          'event': 'subscribe', // subscribe(订阅)/unsubscribe(取消订阅)
          'channel': 'depth50', // depth50请求50条
          'symbol': this.activeCurrenty.uniteSymbol/// 币对
        }
      },
      webSocketType () { // webSocket连接状态，true连接，false断开
        return this.$store.state.webSocketType
      },
      sellPriceType () {
        return this.$store.state.sopttrading.pricesSet
      },
      currentyList () {
        return this.$store.state.currenty
      },
      activeCurrenty () {
        return this.$store.state.sopttrading.selectCurrenty
      },
      activeBazzer () {
        return this.$store.state.sopttrading.selectBazzer
      }
    },
    watch: {
      activeBazzer () {
        this.$refs.sollerBox.scrollLeft = 0;
      },
      searchVal (n, o) {
        this.$refs.sollerBox.scrollLeft = this.$refs[n.uniteSymbol][0].offsetLeft - 20
      },
      sellPriceType () { // 可用价格刷新
        this.balancePost()
      },
        activeCurrenty (n, o) {
        if (n) { // 监控被选中的币对ID.
          this.socketPost();
          this.navActive();
          for (let v of this.currentyList) { // 判断选中的ID，改变货币列表选中状态
            if (v.id == n.id) {
              this.$set(v, 'active', true);
              break
            }
          }
        }
      },
      webSocketType (n, o) {
        if (n) { // 重新连接
          this.webSocket()
        }
      }
    },
    beforeDestroy () { // 组件销毁前清空值。
      this.depth.event = 'unsubscribe';
      this.webSocket()
  },
    destroyed () { // 组件销毁完成
      this.$store.dispatch('selectCurrenty', '')
  },
    created () {
      if (this.activeCurrenty) {
        this.socketPost();

      }
    },
    mounted(){  //快捷跳转，导航定位
   if(this.activeCurrenty){
       this.$refs.sollerBox.scrollLeft = this.$refs[this.activeCurrenty.uniteSymbol][0].offsetLeft - 20
   }
    },
    methods: {
      socketPost () {
        this.webSocket()
        this.balancePost()
      },
      webSocket () { //  市场，货币改变发出请求
        const webSocketObj = this.$store.state.webSocket
        if (webSocketObj.readyState == 1) { // 1，链接成功。
          this.$store.state.webSocket.send(JSON.stringify(this.depth))
        }
      },
      navActive () {
        for (let v of this.currentyList) {
          this.$set(v, 'active', false)
        }
      },
      sollerLeft () {
        this.sollerNumber('left')
      },
      sollerRight () {
        this.sollerNumber('right')
      },
      sollerNumber (type) {
        let sollerBox = this.$refs.sollerBox;
        let sollerWidth = sollerBox.scrollWidth / this.currentyList.length;
        let number = 1
        let soller = setInterval(() => {
          number++;
          if (type == 'left') {
            sollerBox.scrollLeft--
          } else {
            sollerBox.scrollLeft++
          }
          if (number >= sollerWidth) {
            clearInterval(soller)
          }
        }, 5)
      },
      navselect (data, index) { // 存储选中的值
        this.currentyList[index].active = this.$set(this.currentyList[index], 'active', true);
        this.$store.dispatch('selectCurrenty', data)
      },
      balancePost () {
          let basicsCurrenty = {
               buy:this.activeCurrenty.quoteBalance || 0, //  卖入计价货币
               sell:this.activeCurrenty.baseBalance || 0// 卖出计价货币
          };
         this.$store.dispatch('balance', basicsCurrenty)
      }
    }
  }
</script>
