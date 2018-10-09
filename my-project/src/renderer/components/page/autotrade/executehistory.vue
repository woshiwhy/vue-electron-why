<template>
  <div style="height: 3rem">
    <el-table class="table-list bg-table" :data="tableData"  stripe style="width:100%">
      <el-table-column :label='$t("tableheder.planName")' prop="strategyName"></el-table-column>
      <el-table-column :label='$t("tableheder.beginTime")' prop="createTime"  show-overflow-tooltip></el-table-column>
      <el-table-column :label='$t("tableheder.endTime")' prop="endTime"   show-overflow-tooltip></el-table-column>
      <el-table-column :label='$t("tableheder.moneyfor")' prop="symbolName"></el-table-column>
      <el-table-column :label='$t("tableheder.profit")'  prop="name"  show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">
            <span style="color:#0fc45b;">{{scope.row.profit|| 0}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align:center;margin-top:.035rem;margin-bottom: -0.13rem;" v-if="total>5">
      <el-pagination
        :page-size="5"
        :pager-count="5"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [],
        deleVal: {
          index: '',
          item: ''
        },
        total: 1
      }
    },
    created () {
      this.executionRecord(1)
    },
    methods: {
      // 自动交易执行记录
      executionRecord (page) {
        let data = {
          'current': page,
          'size': 5
        }
        this.$postAxios.executionRecord(data).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.records
            this.total = res.data.data.total
          }
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
      },
      // 分页
      currentChange (val) {
        this.executionRecord(val)
      }
    }
  }
</script>
<style>
  .tabpx el-table__body-wrapper is-scrolling-none .el-table td{
    padding: 0 !important;
  }
</style>
