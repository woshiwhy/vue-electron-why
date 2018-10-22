<template>
  <div class="small-box skin-bg" style="min-height:5rem;">
    <h3 class="title-name">{{$t("headline.arbitrage")}}</h3>
    <span class="btn-color sort-btn" @click="sortSend">{{$t("btnname.sort")}}</span>
    <el-table
      class="table-list bg-table"
      :data="tableData"
      v-loading="loadingType"
      element-loading-background="rgba(0, 0, 0, 0)"
      style="width: 100%;"
      height="4.4rem"
      stripe>
      <el-table-column
        prop="sub"
        :label="$t('tableheder.profit')">
      </el-table-column>
      <el-table-column
        prop="symbol"
        :label="$t('tableheder.moneyfor')">
      </el-table-column>
      <el-table-column
        :label="$t('tableheder.bazaar')">
        <template slot-scope="scope">
          <span class="arbitrageCol">{{scope.row.bidSite}} , {{scope.row.askSite}} </span>
        </template>
      </el-table-column>
        <el-table-column
          prop="amount"
          :label="$t('tableheder.amount')">
        </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
  .small-box{
    height: -moz-calc(100% - 4.4rem);
    height: -webkit-calc(100% - 4.4rem);
    height: calc(100% - 4.4rem);
  }
  .sort-btn{
    position: absolute;
    top:0.15rem;
    right: 0.15rem;
  }
</style>
<script>
  export default {
    data () {
      return {
        loadingType: false,
        tableData: this.$store.state.home.interest,
          webStraddle: {// 套利，发送
              'site': 'hub',
              'event': 'sub',
              'channel': 'OAS',
              'symbol': 'hub'
          }
      }
    },
    computed: {
      navBazzer () {
        let tableData = this.$store.state.home.interest;
        if (!tableData.length) {
          this.loadingType = true;
          return
        }
        this.loadingType = false;
        return tableData
      }
    },
    watch: {
      navBazzer: function (n,o) {
        this.tableData = n
      }
    },
      methods:{
          sortSend:function () {
            if(this.$store.state.webSocketType){
              this.$store.state.webSocket.send(JSON.stringify(this.webStraddle));
            }
          }
      }
  }
</script>
