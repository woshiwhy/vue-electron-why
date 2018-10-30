<template>
  <el-container>
    <div class="market-box skin-bg">
      <h3 class="title-name">{{$t("headline.market")}}</h3>
      <div style="position: relative">
        <nav-box></nav-box>
        <search-Box class="search-box" @searchData="quoteSearch" @blurData="quoteSearch"></search-Box>
      </div>
      <transition name="fade">
      <el-table class="table-list bg-table chat-table"
                v-loading="loadingType"
                element-loading-background="rgba(0, 0, 0, 0)"   :height="reazeHeight"  :data="filtedData" stripe style="min-height:3rem;width: 100%;margin-top: 0.4rem;">
        <el-table-column :label='$t("tableheder.moneyfor")' prop="symbol"></el-table-column>
        <el-table-column :label='$t("tableheder.timeMin")'>
          <template slot-scope="scope">
            <span class="low-color">{{scope.row.low}}</span>
          </template>
        </el-table-column>
        <el-table-column :label='$t("tableheder.timeMore")'>
          <template slot-scope="scope">
            <span class="heg-color"> {{scope.row.high}}</span>
          </template>
        </el-table-column>
        <el-table-column :label='$t("tableheder.turnover")' prop="volume"></el-table-column>
        <el-table-column :label='$t("tableheder.increase")'>
          <template slot-scope="scope">
            <span :class="[scope.row.rise>0 ? 'green' : 'red']">
               <span v-if="scope.row.rise >0" class="green">+</span>
              {{scope.row.rise?scope.row.rise+'%':$t("tip.tip11")}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label='$t("tableheder.trendChart")'>
          <template slot-scope="scope">
            <marketCharts-box :id="'ceshi'+scope.$index" :newaddVal="scope.row.kline"></marketCharts-box>
          </template>
        </el-table-column>
      </el-table>
      </transition>
    </div>
  </el-container>
</template>
<style>
  .chat-table .el-table__body .cell{
    height: 0.7rem!important;
    line-height: 0.7rem!important;
  }
</style>
<style scoped>
  .market-box {
    width: 100%;
    padding-top: 0.1rem;
  }
  .el-table__empty-block{
    min-height: 5rem!important;
  }
  .search-box {
    position: absolute;
    top: -0.2rem;
    right: 0.2rem;
    width: 2.23rem;
    height: 0.34rem;
  }

  .el-table tr {
    line-height: .70rem;
    height: .70rem
  }
  .green{
    margin-right: -0.05rem
  }
</style>
<script>
  import searchBox from '@/components/module/searchbox'
import ChilderNav from '@/components/module/wordnav'
import marketCharts from '@/components/page/market/marketcharts'
export default {
    data () {
      return {
        loadingType: false,
        websocketSend: {
          'site': 'hub',
          'event': 'sub',
          'channel': 'ticker',
          'symbol': 'all'
        },
        tableData: [],
        selectVal: '',
        filtedVal: [],
        reazeHeight: '620'
      }
    },
    computed: {
      navList () {
        return this.$store.state.bazzer
      },
      wsObj () {
        return this.$store.state.webSocket
      },
      filtedData () { // 筛选。
        let DataVal = [];
        let oldTable = this.tableData;
        if (this.selectVal) {
          for (let i = 0, maxLength = oldTable.length; i < maxLength; i++) {
            if (oldTable[i].symbol == this.selectVal) {
              DataVal.push(oldTable[i]);
              break
            }
          }
            return DataVal
        }
            return oldTable
      },
      activeBazzer () {
        return this.$store.state.world.activeBazzer
      },
      tableList () { // websocket接口数据
        return this.$store.state.world.worldTable
      }
    },
    watch: {
      tableList (n, o) {
         if(n.data[0]==null)return;
          let marketList=n.data.length;
          this.loadingType=false;
       if(marketList==1){
           this.replaceObj(n.data[0]);
           return
       }
       if(marketList>1){
           this.tableData=n.data;
       }
      },
      activeBazzer (n, o) {
        this.tableData = [];
        this.loadingType = true;
        this.changeWebVal()
      },
        wsObj (n, o) {
        if (n.readyState==1) { // 重新连接
          this.getMarket()
        }
      }
    },
    components: {
      'nav-box': ChilderNav,
      'search-Box': searchBox,
      'marketCharts-box': marketCharts
    },
    created () {
      if (this.activeBazzer) {
        this.changeWebVal()
      }
      this.HeightChange()
  },
    mounted () {
      this.documentHeight()
    },
    methods: {
      documentHeight () {
        let obj = {};
        window.addEventListener('resize', (ref) => {
          clearTimeout(obj.throttle);
          obj.throttle = setTimeout(() => {
            this.HeightChange()
          }, 100)
        })
      },
      HeightChange () {
        let heightWidow = document.documentElement.clientHeight;
        this.reazeHeight = heightWidow - 250
      },
      replaceObj (n) {
        let oldTable = this.tableData;
        let add_Type = true;
        for (let i = 0, maxLength = oldTable.length; i < maxLength; i++) {
          if (oldTable[i].symbol == n.symbol) {
             this.$set(this.tableData,i,n);
            add_Type = false;
            return
          }
        }
        if (add_Type) {
          oldTable.push(n)
        }
      },
      currtent () { // 根据导航动态加载币对
          this.$store.dispatch('currenty', this.activeBazzer.symbolList)
      },
      changeWebVal () { //  更改websroket命令；
        this.getMarket();
        if (this.activeBazzer.currentyList) {
          this.$store.dispatch('currenty', this.activeBazzer.currentyList);
          return
        }
        this.currtent()
      },
      getMarket () {
        this.websocketSend.site = this.activeBazzer.sysMark;
        this.websocketSend.event = 'sub';
        if (this.wsObj.readyState == 1) { // 1，链接成功。
          this.wsObj.send(JSON.stringify(this.websocketSend))
        }
      },
      // 国际行情搜索
      quoteSearch (obj) {
        let sellect_Current = obj.name;
          this.selectVal=obj.uniteSymbol;
        this.websocketSend.symbol= sellect_Current || 'all';
        this.getMarket();
      }
    },
    beforeDestroy () {
      // 离开国际行情时取消订阅，
        if (this.wsObj.readyState == 1) { // 1，链接成功。
            this.wsObj.send(JSON.stringify({event: "UNSUB_ALL"}))
        }
  },
    destroyed: function () {
      this.$store.dispatch('activeBazzer', '')
    }
  }
</script>
