<template>
    <el-main class="infor-cat skin-bg">
        <el-tabs v-model="activeName2" @tab-click="tabPane">
            <el-tab-pane :label='$t("tabname.account")' name="first">
                <!--账户安全-->
                <safety-Box></safety-Box>
            </el-tab-pane>
            <el-tab-pane :label='$t("headline.balance")' name="second">
                <!--个人中心资产-->
                <asset-Box></asset-Box>
            </el-tab-pane>
            <el-tab-pane :label='$t("task.task")' name="task">
                <!-- 任务中心模块 -->
                <task-Box :qrCode="qrCode" :imgUrl="imgUrl"></task-Box>
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

    /*隐藏elementUI表格暂无数据*/
    .infor-cat .el-table__empty-block {
        display: none;
    }

</style>
<style scoped>
    .infor-header {
        color: #ffffff;
        font-size: 0.16rem;
        padding: 0 0.32rem;
        height: 0.45rem;
        line-height: 0.45rem;
    }
    .title-name {
        margin-bottom: 0;
    }
</style>
<script>
    import taskBox from '~/personalcenter/task'
    import safety from '~/personalcenter/safety'
    import userasset from '~/personalcenter/userasset'

    export default {
        data() {
            return {
                activeName2: 'first',
                qrCode: '', // 二维码链接
                imgUrl: '', // 下载二维码
            }
        },
        components: {
            'task-Box': taskBox,
            'asset-Box':userasset,
            'safety-Box':safety
        },
        computed: {
            basicData(){ //基本任务
                return this.$store.state.userTasks;
            },
            taskData(){ //用户积分
                return this.$store.state.integral;
            }
        },
        methods: {
            tabPane() {
                if (this.activeName2 == 'task') {
                    // 基本任务
                    this.basicTasks()
                    // 获取用户积分
                    this.userIntegral()
                }
            },
            // 基本任务
            basicTasks() {
                if(this.basicData.length !=0){
                    return
                }
                this.$loginAjax.basicTasks({}).then((res) => {
                    if (res.data.code == 200) {
                        this.$store.dispatch('userTasks',res.data.data)
                    }
                })
            },
            // 获取用户积分
            userIntegral() {
                if(this.taskData.myIntegral){
                    return
                }
                this.$loginAjax.userIntegral({}).then((res) => {
                    if (res.data.code == 200) {
                        this.$store.dispatch('integral',res.data.data)
                        this.qrCode = res.config.baseURL
                        this.imgUrl = res.config.baseURL + '/qrCode/create?' + 'content=' + this.taskData.inviteUrl
                        return
                    }
                    this.$messageTitle(res.data.msg, 'error')
                }).catch((err) => {
                    this.$messageTitle('网络错误，请稍后再试', 'error')
                })
            }
        },
        beforeDestroy (){
            // this.$store.dispatch('userTasks','')
            this.$store.dispatch('integral','')
        },
    }
</script>
