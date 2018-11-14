<template>
    <el-dialog
            class="balance-dialog center-dialog"
            :title="title"
            :visible.sync="centerDialogVisible"
            :width="width||'4.5rem'"
            :before-close="close"
            top="20vh"
            center>
        <el-table
                :data="tableValInfor"
                v-loading="loadingType"
                element-loading-background="rgba(0, 0, 0, 0)">
            <template v-for="(item,index) in tableName">
                <el-table-column
                        align="center"
                        show-overflow-tooltip
                        type="item.val"
                        :prop="item.data"
                        :label="item.name">

                </el-table-column>
            </template>

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
        props: ['titlename', 'content', 'width'],
        data () {
            return {
                tablePost:{
                    size:10,
                    current:1
                },
                total:50,
                tableValInfor:[
                    {
                        time:'2018-06-33 15:30',
                        type:'会员开通',
                        pice:'2222'

                    },
                    {
                        time:'2018-06-33 15:30',
                        type:'会员开通',
                        pice:'2222'

                    }
                ],
                loadingType:false,
                centerDialogVisible: true,
                tableName:[{
                    "name":'时间',
                    "data":'time'
                },
                    {
                        "name":'类型',
                        "data":'type'
                    },
                    {
                        "name":'金额',
                        "data":'pice'
                    }
                ]
            }
        },
        created () {
            this.title = this.titlename || '消费明细'
        },
        methods: {
            close () {
                this.$emit('close')
            },
        }
    }
</script>
