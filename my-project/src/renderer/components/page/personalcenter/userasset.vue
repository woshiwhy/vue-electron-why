<template>
    <div>
        <h3 class="title-name hnav spoBot">{{$t("headline.market")}}</h3>
        <div class="bsmarket" style="padding-left: 0.1rem;display: flex">
            <nav-box style="margin-bottom:.15rem;"></nav-box>
            <span @click="updateAssets(true)" v-if="!unBind" class="up-assets">更新资产</span>
        </div>
        <!-- 个人中心表格 -->
        <!--没有绑定-->
        <div v-if="unBind" class="unskip" @click="navChange">{{$t("tip.tip1")}}</div>
        <div v-else-if="tables.length">
            <el-table
                    :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                    class="table-list bg-table wordTable"
                    stripe
                    v-loading="lodingStatus"
                    element-loading-background="rgba(0, 0, 0, 0)"
                    slot="empty"
                    style="width: 100%">
                <el-table-column
                        prop="symbol"
                        :label='$t("tableheder.currency")'>
                </el-table-column>
                <el-table-column
                        prop="available"
                        :label='$t("tableheder.usable")'>
                </el-table-column>
                <el-table-column
                        prop="frozen"
                        :label='$t("tableheder.freeze")'>
                </el-table-column>
                <el-table-column
                        prop="total"
                        :label='$t("tableheder.amount")'
                >
                </el-table-column>
            </el-table>
            <!--表格分页-->
            <div class="infor-page">
                <el-pagination
                        :page-size="pageSize"
                        :current-page="pageIndex"
                        layout="prev, pager, next"
                        @current-change="currentChange"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <div v-else class="unbind-tip">
            <p class="unskip">{{$t("tip.assets")}}</p>
        </div>
    </div>
</template>
<style scoped>
    .unskip {
        color: #0098ff;
        cursor: pointer;
        text-align: center;
        margin-top: 1rem;
    }
    .wordTable .el-table td {
        padding: 0;
    }
    .infor-page {
        text-align: center;
        margin-top: .035rem;
    }
    .hnav {
        padding: 0.19rem 0.28rem 0.19rem .28rem;
    }
    .up-assets{
        cursor: pointer;
        margin-left: 0.6rem;
        line-height: 0.28rem;
        color: #0098ff
    }
</style>
<script>
    import ChilderNav from '@/components/module/wordnav'
    export default {
        data(){
            return{
                lodingStatus:false,
                pageIndex: 1,//默认第一页
                pageSize: 10,//默认每页大小
                unBind: false,
                tableData: [],
            }
        },
        components: {
            'nav-box': ChilderNav,
        },
        computed: {
            activeBazzer() {
                return this.$store.state.world.activeBazzer
            },
            tables() {
                return this.tableData
            },
            total() {
                return this.tables.length
            },
            navBazzer () { // 获取用户资产
                return this.$store.state.sopttrading.selectBazzer
            },
            bazzerList(){ //市场
                return this.$store.state.bazzer;
            },

        },
        watch: {
            activeBazzer(n, o) {
                if (o) {
                    this.balanceData()
                }
            },
            tables () {
                this.pageIndex = 1
            },
        },
        mounted() {
            if (this.activeBazzer) {
                this.balanceData()
            }
        },
        methods:{
            // 账户资产
            balanceData(updateFlag) {
                let data = {
                    "updateFlag": updateFlag,
                    'siteId': this.activeBazzer.id
                }
                if(updateFlag != true && this.activeBazzer.blanceList){ //如果资产存在并且用户不更新就不用请求
                    this.unBind = false;
                    this.tableData = this.activeBazzer.blanceList
                    return
                }
                this.$balancePost(data).then(res => {
                    this.lodingStatus = true;
                    if(res.code==200){
                        this.unBind = false;// 已绑定API
                        this.lodingStatus = false;
                        this.tableData = res.data;
                        this.$store.dispatch('myBalance', res.data);
                        return
                    }
                    if (res.code == 318) {
                        this.unBind = true;// 没绑定API
                        this.lodingStatus = false;
                        return
                    }
                },error => {
                    this.lodingStatus = false;
                    this.$messageTitle('网络错误', 'error')
                });
            },
            updateAssets(updateFlag){ //更新资产
                this.balanceData(updateFlag)
            },
            // 分页
            currentChange(val) {
                this.pageIndex = val
            },
            navChange() {
                this.$store.dispatch('navType', '4')
                this.$router.push('/binding')
            },
        }
    }
</script>