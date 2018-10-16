<template>
  <div class="small-box skin-bg">
    <h3 class="title-name">{{$t("headline.recommendPlan")}}</h3>
    <el-table
      class="table-list bg-table"
      :data="tableData"
      style="width: 100%"
      stripe
    >
      <el-table-column
        prop="name"
        :label='$t("tableheder.moneyfor")'>
        <template slot-scope="scope">
          <div slot="reference">
            <img class="hot-bg" v-if="scope.row.type" src="../../../../../static/img/hot.png">
            {{scope.row.symbol}}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label='$t("tableheder.bazaar")'>
        <template slot-scope="scope">
          <div slot="reference">
            <span style="color:#0098ff;" class='bymarket'>{{scope.row.askSite}} , {{scope.row.bidSite}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column :label='$t("tableheder.addUp")'>
         <template slot-scope="scope">
           <div slot="reference">
             {{scope.row.lr}}
           </div>
         </template>
       </el-table-column>
      <el-table-column :label='$t("tableheder.operation")'>
        <template slot-scope="scope">
          <div slot="reference">
            <span class="btn-color" @click="freeTrial(scope.$index,scope.row)">{{$t("btnname.tryOut ")}}</span>
            <!--<span v-else-if="scope.row.status==2" class="red pointer" @click='paid(scope.$index,scope.row)'>付费试用</span>-->
            <!--<span v-else class="bulid pointer" @click="CancelTrial(scope.$index,scope.row)">取消试用</span>-->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align:center;margin-top:.035rem;margin-bottom: -0.13rem;" v-if="total>9">
      <el-pagination
        :page-size="9"
        :pager-count="5"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total">
      </el-pagination>
    </div>
    <!-- 支付扫描 -->
    <payment-box v-if="ispaid" @confirm="confirm" @close="close" :title='title' :money='money'></payment-box>
  </div>
</template>
<style>
  .hot-bg{
    position: relative;
    top:0.05rem;
    width: 0.15rem;
    margin-right: 0.05rem;
  }
</style>
<script>
  import paymentBox from '@/components/module/Payment'
export default {
    data () {
      return {
        tableData: [],
        title: '微信扫描支付',
        ispaid: false,
        money: '20',
        total: 1
      }
    },
    components: {
      'payment-box': paymentBox
    },
    created () {
      this.planClick(1)
    },

    methods: {
      planClick (page) {
        let data = {
            page:{
                current: page,
                size:9
            }
        };
        this.$postAxios.plan(data).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total
          }
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
      },
      // 取消试用
      CancelTrial (index, row) {
        let data = {
          index,
          row
        }
        autoSetAxios(data).then((res) => {
          this.$messageTitle('取消成功', 'success')
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
        })
      },
      // 免费试用一次
      freeTrial (index, row) {
        let rowData = {}
        for (let v in row) { // 深拷贝
          rowData[v] = row[v]
        }
        rowData.monitorId = row.id // row的ID是策略ID；
        rowData.id = ''
        this.$store.dispatch('changePlan', rowData)
      },
      // 打开扫描支付
      paid (index, row) {
        this.ispaid = true
      },
      // 确认
      confirm () {
        this.ispaid = false
      },
      // 关闭
      close () {
        this.ispaid = false
      },
      // 分页
      currentChange (val) {
        this.planClick(val)
      }
    }
  }
</script>
