<template>
    <el-dialog
            class="balance-dialog center-dialog"
            title="消费明细"
            :visible.sync="centerDialogVisible"
            width="6.5rem"
            :before-close="close"
            top="20vh"
            center>
        <el-table
                :data="tableValInfor"
                v-loading="loadingType"
                element-loading-background="rgba(0, 0, 0, 0)">
                <el-table-column
                        v-for="(item,index) in tableName"
                        :key="index"
                        align="center"
                        show-overflow-tooltip
                        type="item.val"
                        :prop="item.data"
                        :label="item.name">
                    <template slot-scope="scope">
                        <span slot="reference" v-if="item.data=='type'">
                           {{scope.row[item.data] | $_memberType}}
                        </span>
                        <span v-else>
                             {{scope.row[item.data]}}
                        </span>
                    </template>

                </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: center;"
                layout="prev, pager, next"
                :page-size="tablePost.size"
                :current-page.sync="tablePost.current"
                :total="total">
        </el-pagination>
    </el-dialog>
</template>
<style >
  .balance-dialog .el-dialog__body{
      padding: 0.02rem 0 0.1rem 0.1rem!important;
  }
    .balance-dialog .el-table__header div,.balance-dialog .el-table{
        background: none!important;
    }
  .balance-dialog .el-table th{
      background:#262a4a!important;
      color: #4e5b85!important;
  }
  .balance-dialog  .el-table__body .el-table__row td{
      background:#262a4a!important;
  }
  .balance-dialog .el-pager li,.balance-dialog .el-pagination .btn-prev,.balance-dialog .el-pagination .btn-next{
      background: #262a4a!important;
  }
</style>
<script>
    export default {
        data () {
            return {
                tablePost:{
                    size:10,
                    current:1
                },
                total:0,
                tableValInfor:[],
                loadingType:false,
                centerDialogVisible: true,
                tableName:[{
                    "name":'时间',
                    "data":'createTime'
                },
                    {
                        "name":'类型',
                        "data":'type'
                    },
                    {
                        "name":'实付金额',
                        "data":'payAmount'
                    },
                    {
                        'name':'消耗积分',
                        "data":'consumeIntegral'
                    }
                ]
            }
        },
        watch:{
            tablePost:{
                handler(data) {
                    this.expenseDetail()
                },
                immediate: true,
                    deep: true

            }
        },
        methods: {
            close () {
                this.$emit('close')
            },
            expenseDetail(){
                this.$loginAjax.expenseDetail (this.tablePost).then((res) => {
                    let dataVal=res.data.data;
                    if (res.data.code == 200) {
                        this.total=dataVal.total;
                        this.tableValInfor=dataVal.records
                    }
                })
            }
        }
    }
</script>
