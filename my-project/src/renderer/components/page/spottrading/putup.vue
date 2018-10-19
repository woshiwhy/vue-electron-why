<template>
  <!--挂单-->
  <tablelist-box  :tableVal="tableVal" :loadingType="loadingType" :tableName="tableName" @operation="operation"></tablelist-box>
</template>
<script>
  import TableList from '@/components/module/putuptable'
export default {
    data () {
      return {
        tableVal: [],
        loadingType: false
      }
  },
    components: {
      'tablelist-box': TableList
    },
    computed: {
      tableName () { // 挂单表头
        return [
          {name: this.$t('tableheder.time'), val: 'time'},
          {name: this.$t('tableheder.direction'), val: 'type'},
          {name: this.$t('tableheder.wtwtsl'), val: 'amount'},
          {name: this.$t('tableheder.wtwtjg'), val: 'price'},
          {name: this.$t('tableheder.turnover'), val: 'fieldAmount'},
          {name: this.$t('tableheder.type'), val: 'status'},
          {name: this.$t('tableheder.operation'), val: 'operation'}
        ]
      },
      selectCurrenty () {
        return this.$store.state.sopttrading.selectCurrenty;// 选中的货币
      },
      tableListAdd () { // 现货交易卖买是否成功，增加到表格
        return this.$store.state.sopttrading.tableList
      },
        navBazzer () {
            return this.$store.state.sopttrading.selectBazzer
        },
    },
    watch: {
      selectCurrenty (n, o) {
        if (n) {
          this.tablePost()
        }
      },
      tableListAdd (n, o) {
        this.tableVal.unshift(n);// 添加最新交易的数据到挂单表格
      }
    },
    created () {
      if (this.selectCurrenty) {
        this.tablePost()
      }
    },
    methods: {
      tablePost () {
        this.loadingType = true;
        let data = {
            siteId: this.$store.state.sopttrading.selectBazzer.id,
            symbol: this.selectCurrenty.name
        };
        this.$postAxios.entryOrders(data).then((ref) => {//现货交易买卖挂单列表
          let dataVal = ref.data;
          this.loadingType = false;
          if (dataVal.code == 200) {
            this.tableVal = dataVal.data;
            return
          }
          this.$messageTitle(dataVal.msg, 'error');
          this.tableVal = []
        }).catch((ref) => {
          this.loadingType = false;
          this.$messageTitle('网络错误，请稍后重试', 'error');
          this.tableVal = []
        })
      },
      operation (scope) { // 撤单
        this.$postAxios.cancellations(scope.row).then((ref) => {
          if (ref.data.code == 200) {
            this.$messageTitle('撤单成功', 'success');
              this.balancePost({siteId: this.navBazzer.id,updateFlag:true,unshow:true});
            this.tableVal[scope.$index].status = 4;// 撤销成功将数据状态改成4,：已撤单
            return
          }
          this.$messageTitle('撤单失败', 'error')
        }).catch((ref) => {
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
      }
    }
  }
  </script>
