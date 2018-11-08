<template>
  <div style="position: relative" >
    <el-select class="ktable-select" v-model="selectVal" @change="changeSelect">
      <el-option
        v-for="item in selectTab"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>
    <ul class="infor-k">
      <li v-for="(item,index) in $store.state.sopttrading.lineVal">
        <span class="infor-name"> {{item.name}}:</span>
        <span
          class="infor-data"> {{(parseFloat(item.data=='-'?0:item.data).toFixed(selectCurrenty.pricePrecision))}}</span>
      </li>
    </ul>
    <chart-box
            v-loading="loading2" element-loading-background="rgba(0, 0, 0, 0)"
      :_id="'testCharts'"
      :chartData="chartData"
      :width="'100%'"
      :height="'5.5rem'"
    ></chart-box>
  </div>
</template>
<style>
  .infor-k {
    position: absolute;
    top: 0.08rem;
    left: 1.2rem;
  }

  .infor-k > li {
    font-size: 0.14rem;
    display: inline-block;
    margin-right: 0.1rem;
  }

  .infor-name {
    color: #000000;
  }

  .infor-data {
    color: #0fc482;
  }

  .ktable-select {
    width: 1rem;
  }
  .ktable-select .el-input__suffix{
    right: 0;
  }
  .ktable-select .el-input__suffix i {
    height: .34rem;
    line-height: .34rem;
  }

  .ktable-select .el-input--suffix .el-input__inner {
    padding: 0 0.2rem 0 0.2rem;
    height: 0.34rem;
    font-size: 0.12rem;
  }
</style>
<script>
  import Chart from '&/kchart'
  export default {
    data () {
      return {
          websocketSend: {
              'site': 'hub',
              'event': 'sub',
              'channel': 'kline',
              'symbol': '',
              "param":{"period":''}
          },
        loading2: false,
        chartData: [],
        selectVal: '',
        postNumber: 0,
          setTimeObj:''
      }
  },
    computed: {
      selectBazzer () { // 选择的市场
        return this.$store.state.sopttrading.selectBazzer
      },
      selectTab () {
        let klineParams = this.$store.state.sopttrading.selectBazzer.klineParams;
        if (klineParams) {
          const sele_Obj = JSON.parse(klineParams);
          this.selectVal = sele_Obj[3].value || sele_Obj[0].value;
          return sele_Obj
        }
        return []
      },
        KList () { // k线图
            return this.$store.state.sopttrading.kLine
        },
        wsObj () {
            return this.$store.state.webSocket
        },
      selectCurrenty () {
        return this.$store.state.sopttrading.selectCurrenty
      },
      selectCurrentyId () {
        return this.$store.state.sopttrading.selectCurrenty.id
      }
    },
    watch: {
        wsObj (n, o) {
            if (n.readyState==1) { // 重新连接
                this.chartPost()
            }
        },
        KList:function (n,o) {
            if(n.length){
                this.loading2=false;
                this.chartData=n
            }
        },
      selectTab: function (n, o) {
        this.selectVal = n[3].value || n[0].value;// 市场改变默认渲染第一个
      },
      selectCurrentyId (n, o) {
        if (n) {
            this.postNumber=0;
            this.chartPost()
        }
      }
    },
    components: {
      'chart-box': Chart
    },
      created(){
        if(this.selectVal){//K线图时间段选择
            this.chartPost ()
        }
      },
      beforeDestroy () { // 组件销毁前清空值。
          if( this.wsObj.readyState==1){
              this.websocketSend.event='unsub';
              this.wsObj.send(JSON.stringify(this.websocketSend))
          }
      },
    methods: {
      changeSelect () { // 选择的时间段。
        this.chartPost()
      },
      chartPost () {
          this.loading2 = true;
          this.websocketSend.site = this.selectBazzer.sysMark;
          this.websocketSend.symbol = this.selectCurrenty.name;
          this.websocketSend.param.period = this.selectVal;
          this.$store.dispatch('kLine', []);
          this.chartData = [];
          if (this.wsObj.readyState == 1) { // 1，链接成功。
              this.wsObj.send(JSON.stringify(this.websocketSend))
          }
      }
    }
  }
</script>
