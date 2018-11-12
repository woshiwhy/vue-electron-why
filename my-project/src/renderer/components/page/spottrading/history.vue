<template>
  <!--成交历史-->
  <div class="clearfloat">
    <div class="pull-left deep-table" >
      <h3 class="title-name">{{$t("headline.buyHistory")}}</h3>
      <tablelist-box :height="'7rem'" :loadingType="loadingType" :type="'one'" :tableVal="tableData.buy.slice(0, 12)" :tableName="tableName"></tablelist-box>
    </div>
    <div class="pull-right deep-table">
      <h3 class="title-name">{{$t("headline.sellHistory")}}</h3>
      <tablelist-box :height="'7rem'" :loadingType="loadingType" :type="'two'" :tableVal="tableData.sell.slice(0, 12)" :tableName="tableNameOne"></tablelist-box>
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
  import TableList from '&/historytable'
export default {
    data () {
      return {
        tableVal: {
          buy: [],
          sell: []
        },
        loadingType: false
      }
  },
    components: {
      'tablelist-box': TableList
    },
    computed: {
      tableName () { // 成交历史
        return [
          {name: this.$t('tableheder.time'), val: 'time'},
          {name: this.$t('tableheder.price'), val: 'price'},
          {name: this.$t('tableheder.turnover'), val: 'amount'}]
      },
      tableNameOne () { // 成交历史
        return [
          {name: this.$t('tableheder.turnover'), val: 'amount'},
          {name: this.$t('tableheder.price'), val: 'price'},
          {name: this.$t('tableheder.time'), val: 'time'}
        ]
      },
      tableData () {
        return this.tableVal
      },
      activeCurrenty () {
        return this.$store.state.sopttrading.selectCurrenty
      },
      activeCurrentyId () {
        return this.$store.state.sopttrading.selectCurrenty.id
      },
      activeBazzerId () {
        return this.$store.state.sopttrading.selectBazzer.id
      }
    },
    watch: {
      activeCurrentyId (n, o) {
        if (n) {
          this.historyPost()
        }
      }
    },
    mounted () {
      if (this.activeCurrentyId) {
        this.historyPost()
      }
    },
    methods: {
        clearVal(){
            this.tableVal = {
                buy: [],
                sell: []
            }
        },
      historyPost () {
        this.loadingType = true;
        this.clearVal();
        let data = {
          'siteId': this.activeBazzerId,
          'size': 50,
          'symbol': this.activeCurrenty.name
        };
        this.$postAxios.historicalSum(data).then((ref) => {
          let dataVal = ref.data;
            this.loadingType = false;
          if (dataVal.code == 200) {
            this.tableVal = dataVal.data;
          }
        }).catch((err) => {
          this.loadingType = false;
        })
      }
    }
  }
</script>
