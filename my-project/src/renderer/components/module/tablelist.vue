<template>
    <!--深度表格-->
    <el-table
            :class="className"
            class="table-list"
            :data="tableList"
            @row-click="rowVal"
            min-height="200"
            :max-height="maxHeight"
            stripe
    >
        <el-table-column
                v-if="numberList>6&&tableType==1"
                :label='$t("tableheder.number")'
                type="index"
                width="100">
        </el-table-column>

        <el-table-column
                v-for="(item,index) in tableTr"
                :key="index"
                :width="item.width"
                :label="item.name">
            <template slot-scope="scope">
                <div slot="reference" :class="item.class" style="cursor: pointer;">
                    {{scope.row[item.val]}}
                </div>
            </template>
        </el-table-column>

        <el-table-column
                v-if="numberList>6&&tableType==2"
                :label='$t("tableheder.number")'
                type="index"
                width="100">
        </el-table-column>
    </el-table>
</template>
<style>
    .red {
        color: red;
    }

    .gree {
        color: green;
    }
</style>
<script>
    export default {
        props: ['tableType', 'className', 'numberList', 'maxHeight'], // 表头名字，表格类型：1是买入，2是卖出。
        data () {
            return {
                loadingType: false
            }
        },
        computed: { //  监听选中值
            history () { // 买入深度
                return [{name: this.$t('tableheder.amount'), val: 'amount'}, {
                    name: this.$t('tableheder.price'),
                    val: 'price',
                    class: 'gree'
                }]
            },
            history1 () { // 卖出深度
                return [{
                    name: this.$t('tableheder.price'),
                    val: 'price',
                    class: 'red'
                }, {name: this.$t('tableheder.amount'), val: 'amount'}]
            },
            tableTr () {
                let tableHeader = [];
                switch (this.tableType) { // 获取深度
                    case '1':
                        tableHeader = this.history;
                        break;
                    case '2':
                        tableHeader = this.history1
                }
                return tableHeader
            },
            tableList () {
                let tableData = [];
                let depthChart = this.$store.state.sopttrading.depthChart;
                if (depthChart == '') {
                    return
                }
                switch (this.tableType) { // 获取深度
                    case '1':
                        tableData = depthChart.bids.slice(0, this.numberList || 6);
                        break;
                    case '2':
                        tableData = depthChart.asks.slice(0, this.numberList || 6);
                        break
                }
                return tableData
            }
        },
        methods: {
            rowVal (data) {
                switch (this.tableType) {
                    case '1':
                        this.$store.dispatch('buyPrice', data);
                        break;
                    case '2':
                        this.$store.dispatch('sellPrice', data);
                        break
                }
            }
        }
    }
</script>
