<template>
    <el-main class="infor-cat skin-bg">
        <el-tabs v-model="activeTab" @tab-click="tabPane">
            <el-tab-pane :label='$t("tabname.account")' name="first">
                <!--账户安全-->
                <safety-Box></safety-Box>
            </el-tab-pane>
            <el-tab-pane :label='$t("headline.balance")' name="asset">
                <!--个人中心资产-->
                <asset-Box :is="assetContent"></asset-Box>
            </el-tab-pane>
            <el-tab-pane label='会员中心' name="memberCenter">
                <memberCenter-Box :is="memberContent"></memberCenter-Box>
            </el-tab-pane>
            <el-tab-pane :label='$t("task.task")' name="task">
                <!-- 任务中心模块 -->
                <task-Box :is="taskContent"></task-Box>
            </el-tab-pane>
            <el-tab-pane label='订单管理' name="orderManagement">
                <!-- 订单统计 -->
                <order-Box :is="ordermanagement"></order-Box>
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>
<style>
    .infor-cat .el-tabs__item {
        border-top: 3px solid #ffffff;
        width: 1.4rem;
        height: 0.58rem;
        text-align: center;
        line-height: 0.56rem;
        padding: 0 .12rem;
        font-size: 0.16rem;
        border-bottom: .02rem #e4e7ed solid
    }

    .infor-cat .el-tabs__item.is-active {
        color: #0098ff;
        background: #ffffff;
        font-weight: bolder;
    }

    .wordTable .el-table td {
        padding: 0;
    }

</style>
<script>
    import safety from '~/personalcenter/safety'
    import userasset from '~/personalcenter/userasset'

    export default {
        data() {
            return {
                activeTab: 'first',
                qrCode: '', // 二维码链接
                imgUrl: '', // 下载二维码
                ordermanagement:'',
                taskContent:'',
                assetContent:'',
                memberContent:''
            }
        },
        components: {
            'asset-Box':userasset,
            'safety-Box':safety,
        },
        computed: {
            taskData(){ //用户积分
                return this.$store.state.integral;
            }
        },
        methods: {
            tabPane() {
                switch (this.activeTab){
                    case 'task':
                        this.taskContent=() => ({//订单详情
                            component:import('~/personalcenter/task')
                });
                        break;
                    case 'orderManagement':
                    this.ordermanagement=() => ({//订单详情
                        component:import('~/personalcenter/ordermanagement')
                    });
                break;
            case 'asset':
                this.assetContent=() => ({//账户知产
                    component:import('~/personalcenter/userasset')
            });
                break;
            case 'memberCenter':
                this.memberContent=() => ({//会员中心
                    component:import('~/personalcenter/membercenter')
            });
                break;
                }
            }
        },
        beforeDestroy (){
            this.$store.dispatch('integral','')
        },
    }
</script>
