<template>
  <!--深度-->
  <div
    style="height:7rem"
    v-loading="loadingType"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <chart-box class="pull-left"
      :_id="'testCharts'"
               :type="'buy'"
               :color="'#98e7ca'"
               :xAxisData="xAxisDataBy"
               :yAxisData="yAxisDataBy"
               :showTye="false"
               :grid="grid1"
               :height="'3rem'"
    ></chart-box>
    <chart-box class="pull-right"
      :_id="'testCharts'"
               :type="'sell'"
               :color="'#fea9a7'"
               :xAxisData="xAxisDataSell"
               :yAxisData="yAxisDataSell"
               :showTye="true"
               :height="'3rem'"
               :grid="grid2"
    ></chart-box>
   <div class="clearfloat">
     <div class="pull-left deep-table" >
       <h3 class="title-name">{{$t("headline.buy")}}</h3>
       <tablelist-box :className="'bg-table'" :maxHeight="'400'" :tableType="'1'" :numberList="'50'"  ></tablelist-box>
     </div>
     <div class="pull-right deep-table">
       <h3 class="title-name">{{$t("headline.sell")}}</h3>
       <tablelist-box :className="'bg-table'" :maxHeight="'400'" :tableType="'2'" :numberList="'50'" ></tablelist-box>
     </div>
   </div>
  </div>
</template>
<style scoped>
.deep-table{
  width:49%;
}
  .title-name {

    padding: 0;
  }
</style>
<script>
  import Chart from '&/deepnesschart'
  import TableList from '&/tablelist'
export default {
    data () {
      return {
        loadingType: false,
        grid1: {
          left: '15',
          right: '32'
        },
        grid2: {
          left: '-40',
          right: '10%'
        },
        xAxisDataBy: [], // 价格
        yAxisDataBy: [], // 数量
        xAxisDataSell: [],
        yAxisDataSell: []
      }
  },
    computed: { //  监听选中值
      depthChart () {
        let deepness = this.$store.state.sopttrading.depthChart;
        if (deepness == '') {
          this.loadingType = true;
          return
        }
        this.loadingType = false;
        return deepness
      }
    },
    watch: {
      depthChart (n, o) {
        if (n) {
          this.chartVal(n);
          return
        }
        this.xAxisDataBy = [];// 价格
        this.yAxisDataBy = [];// 数量
        this.xAxisDataSell = [];
        this.yAxisDataSell = []
      }
    },
    components: {
      'chart-box': Chart,
      'tablelist-box': TableList
    },
    created () {
      if (this.depthChart) {
        this.chartVal(this.depthChart)
      }
    },
    methods: {
      chartVal (n) {
        this.yAxisDataBy = n.bidCharts;// 买数量
        this.yAxisDataSell = n.askCharts;// 卖数量
        this.chartSet('xAxisDataBy', n.bids, 1);// 买
        this.chartSet('xAxisDataSell', n.asks, 2);// 卖
      },
      chartSet (nameX, n, type) {
        let xAxis = [];
        for (let v of n) {
          if (type == 1) {
            xAxis.unshift(v.price)
          } else {
            xAxis.push(v.price)
          }
        }
        this[nameX] = xAxis
      }
    }
  }
</script>
