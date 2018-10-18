<template>
  <div class="small-box skin-bg" style="min-height:5rem;">
    <h3 class="title-name">{{$t("headline.arbitrage")}}</h3>
    <el-table
      class="table-list bg-table"
      :data="tableData"
      v-loading="loadingType"
      element-loading-background="rgba(0, 0, 0, 0)"
      style="width: 100%;"
      height="440"
      stripe>
      <el-table-column
        prop="profit"
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
<script>
  export default {
    data () {
      return {
        loadingType: false,
        tableData: this.$store.state.home.interest
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
      navBazzer: function (n, o) {
        this.tableData = n
      }
    }
  }
</script>
