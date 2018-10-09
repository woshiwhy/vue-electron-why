<template>
    <!--成交历史-->
    <el-table
            class="table-list table bg-table"
            :data="tableValInfor"
            height="7rem"
            v-loading="loadingType"
            element-loading-background="rgba(0, 0, 0, 0)"
            stripe
    >
        <el-table-column
                v-if="type=='one'"
                :label='$t("tableheder.number")'
                type="index"
                width="100">
        </el-table-column>
        <template v-for="(item,index) in tableName">
            <el-table-column
                    :width="item.width"
                    type="item.val"
                    :label="item.name">
                <template slot-scope="scope">
                    <div slot="reference" :class="item.class">
                        {{scope.row[item.val]}}
                    </div>
                </template>
            </el-table-column>
        </template>
        <el-table-column
                v-if="type=='two'"
                :label='$t("tableheder.number")'
                type="index"
                width="50">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props: ['tableName', 'tableVal', 'loadingType',"type"],
        computed: { //  监听选中值
            tableValInfor () {
                return this.tableVal
            }
        },
        methods: {
            operation (scope) {
                this.$emit('operation', scope)
            }
        }
    }
</script>
