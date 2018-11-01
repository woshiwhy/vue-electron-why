<template>
  <div style="height: 3rem">
    <el-table class="table-list bg-table tabpx" min-height="300"  :data="tableData" stripe style="width: 100%">
      <el-table-column :label='$t("tableheder.planName")' prop="name"></el-table-column>
      <el-table-column :label='$t("tableheder.moneyfor")' prop="symbol"></el-table-column>
      <el-table-column :label='$t("tableheder.bazaar")' prop="bazzer" min-width="120">
        <template slot-scope="scope">
          <div slot="reference">
            <span style="color:#0098ff;">{{scope.row.askSite}}，{{scope.row.bidSite}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label='$t("tableheder.interest")' prop="interest">
        <template slot-scope="scope">
          <div slot="reference">
            <span>{{scope.row.pricePercent}}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label='$t("tableheder.Trigger")' prop="more">
        <template slot-scope="scope">
          <div slot="reference">
            <span>{{scope.row.balancePercent}}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label='$t("tableheder.type")' prop="more">
        <template slot-scope="scope">
          <div slot="reference">
            <span :class="scope.row.status?'color-red':'myUnexecute'"
                  v-html="$t($options.filters.$_executeStatus(scope.row.status))"
            ></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label='$t("tableheder.operation")'>
        <template slot-scope="scope">
          <div>
            <i class="el-icon-edit set-btn change-btn pointer" @click="handleOk(scope.$index, scope.row)"></i>
            <i class="el-icon-delete set-btn pointer" @click="handledele(scope.$index, scope.row)"></i>
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
    <layer-box v-if="centerDialogVisible" :width="'3rem'" @close="close" @confirm="deleBtn"
               :content="layerContent"></layer-box>
  </div>


</template>
<style lang="scss" rel="stylesheet/scss" scoped>

  .set-btn {
    font-size: 0.18rem;
    color: #0098ff;

  }
  .color-red{
    color: red;
  }
  .change-btn {
    margin-right: 0.1rem;
  }
</style>
<script>
  import layerBox from '&/layer'
export default {
    data () {
      return {
        layerContent: this.$t('tip.tip5'),
        centerDialogVisible: false,
        tableData: [],
        deleVal: {
          item: '',
          index: ''
        },
        page: 1,
        total: 1
      }
    },
    components: {
      'layer-box': layerBox
    },
    computed: {
      seaveType () { // 监听方案是保存或执行，刷新表格
        return this.$store.state.auto.seaveType
      }
    },
    watch: {
      seaveType (n, o) {
        this.myplanClick(this.page)
      }
    },
    created () {
      this.myplanClick(1)
    },
    methods: {
      // 自动交易策略记录
      myplanClick (page) {
        let data = {
          page:{
              'current': page,
              'size': 5
          }
        };
        this.$postAxios.myplan(data).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total
          }
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
      },
      handledele (index, item) { // 删除
        this.layerContent = this.$t('tip.tip5');
        if (item.status) { //  True当前方法正在执行。
          this.layerContent = this.$t('tip.tip6');
        };
        this.centerDialogVisible = true;
        this.deleVal.item = item;
        this.deleVal.index = index
      },
      close () {
        this.centerDialogVisible = false
      },
      deleBtn () {
        this.centerDialogVisible = false;
        this.$postAxios.delMyplan(this.deleVal.item.id).then((res) => {
          if (res.data.code == 200) {
            this.total=this.total-1;
            this.$store.dispatch('delePlan', this.deleVal.item.id);
            this.$store.dispatch('fromClear', !this.$store.state.auto.fromClear);
            this.tableData.splice(this.deleVal.index, 1);
            if (this.tableData.length == 0) {
              this.myplanClick(1);
              this.page=1;
            }
            this.$messageTitle(this.$t('tip.tip7'), 'success')
          }
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
        })
      },
      handleOk (index, item) { // 修改
        this.$store.dispatch('changePlan', item)
      },
      // 分页
      currentChange (val) {
        this.page = val;
        this.myplanClick(val)
      }
    }
  }
</script>
