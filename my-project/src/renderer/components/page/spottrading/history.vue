<template>
  <div class="clearfloat">
    <div class="pull-left deep-table" >
      <h3 class="title-name">{{$t("headline.buyHistory")}}</h3>
      <tablelist-box :loadingType="loadingType" :tableVal="tableData.buy.slice(0, 12)" :tableName="tableName"></tablelist-box>
    </div>
    <div class="pull-right deep-table">
      <h3 class="title-name">{{$t("headline.sellHistory")}}</h3>
      <tablelist-box :loadingType="loadingType" :tableVal="tableData.sell.slice(0, 12)" :tableName="tableNameOne"></tablelist-box>
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
  import TableList from '@/components/module/putuptable'
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
      tableName () { // 挂单表头
        return [{name: this.$t('tableheder.number'), val: 'id'},
          {name: this.$t('tableheder.time'), val: 'time'},
          {name: this.$t('tableheder.price'), val: 'price'},
          {name: this.$t('tableheder.turnover'), val: 'amount'}]
      },
      tableNameOne () { // 挂单表头
        return [
          {name: this.$t('tableheder.turnover'), val: 'amount'},
          {name: this.$t('tableheder.price'), val: 'price'},
          {name: this.$t('tableheder.time'), val: 'time'},
          {name: this.$t('tableheder.number'), val: 'id'}

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
      historyPost () {
        this.loadingType = true
        let data = {
          'siteId': this.activeBazzerId,
          'size': 0,
          'symbol': this.activeCurrenty.symbol
        }
        this.$postAxios.historicalSum(data).then((ref) => {
          let dataVal = ref.data
          if (dataVal.code == 200) {
            this.loadingType = false
            this.tableVal = dataVal.data
            return
          }
          this.tableVal = {
            buy: [],
            sell: []
          }
        }).catch((err) => {
          this.loadingType = false
          this.tableVal = {
            buy: [],
            sell: []
          }
        })
      }
    }
  }
</script>
