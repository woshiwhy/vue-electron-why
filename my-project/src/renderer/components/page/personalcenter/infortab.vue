<template>
    <el-main class="infor-cat skin-bg">
        <el-tabs v-model="activeName2" @tab-click="tabPane">
            <el-tab-pane :label='$t("tabname.account")' name="first">
                <div>
                    <div class="infor-header">{{$t("headline.account")}}</div>
                    <div class="content-list">
                        <span>{{$t("tip.account")}}</span>
                        <span v-if="username">{{username}}</span>
                    </div>
                    <div class="content-list">
                        <span>{{$t("tip.passWord")}}</span>
                        <span>*******</span>
                        <span class="change-btn" @click="change(1)">{{$t("btnname.change")}}</span>
                    </div>
                </div>
                <div>
                    <div class="infor-header">{{$t("headline.bind")}}</div>
                    <div class="content-list">
                        <span>{{$t("tip.email")}}</span>
                        <span v-if="userInfor.email ">{{userInfor.email | float}}</span>
                        <span class="change-btn" @click="change(2)">{{$t("btnname.change")}}</span>
                    </div>
                    <div class="content-list">
                        <span>{{$t("tip.phone")}}</span>
                        <span v-if="userInfor.phone ">{{userInfor.phone |float }}</span>
                        <span class="change-btn" @click="change(3)">{{$t("btnname.change")}}</span>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label='$t("headline.balance")' name="second">
                <div>
                    <h3 class="title-name hnav spoBot">{{$t("headline.market")}}</h3>
                    <div class="bsmarket" style="padding-left: 0.1rem;display: flex">
                        <nav-box style="margin-bottom:.15rem;"></nav-box>
                        <span @click="updateAssets(true)" v-if="tableData.length" class="up-assets">更新资产</span>
                    </div>
                    <!-- 个人中心表格 -->
                    <!--没有绑定-->
                    <div v-if="unBind" class="unskip" @click="navChange">{{$t("tip.tip1")}}</div>
                    <div v-else-if="tableData.length">
                        <el-table
                                :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                                class="table-list bg-table wordTable"
                                stripe
                                slot="empty"
                                style="width: 100%">
                            <el-table-column
                                    prop="symbolName"
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
            </el-tab-pane>
            <el-tab-pane :label='$t("task.task")' name="task">
                <!-- 任务中心模块 -->
                <task-Box :taskData="taskData" :basicData="basicData" :qrCode="qrCode" :imgUrl="imgUrl"></task-Box>
            </el-tab-pane>
        </el-tabs>
        <pwd-box @pwdClone="pwdClone" v-if="pwdPage"></pwd-box>
        <mail-box @mailClone="mailClone" v-if="mailPage" @showEmail="showEmail"></mail-box>
        <phone-box @phoneClone="phoneClone" v-if="phonePage" @showPhone="showPhone"></phone-box>
    </el-main>
</template>
<style>
    .secure-box {
        background-position: center;
        background-repeat: no-repeat;
    }

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

    .gotoBinding {
        position: relative;
        min-height: 60px;
        height: 100%;
    }

    .gotoBinding > a {
        text-decoration: none;
        cursor: pointer;
        color: #0098ff;
        position: absolute;
        left: 44%;
        top: 25%;
    }
</style>
<style scoped>
    .unskip {
        color: #0098ff;
        cursor: pointer;
        text-align: center;
        margin-top: 1rem;
    }

    .infor-header {
        color: #ffffff;
        font-size: 0.16rem;
        padding: 0 0.32rem;
        height: 0.45rem;
        line-height: 0.45rem;
    }

    .content-list {
        padding: 0.18rem 0.7rem;
        /*background: #f2f6f9;*/
        color: #666666;
    }

    .content-list > span:first-child {
        display: inline-block;
        width: 2rem;
    }

    .change-btn:hover {
        opacity: 0.7;
    }

    .change-btn {
        color: #0098ff;
        cursor: pointer;
        float: right;
    }

    .hnav {
        padding: 0.19rem 0.28rem 0.19rem .28rem;
    }

    .content-list {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .infor-page {
        text-align: center;
        margin-top: .035rem;
    }

    .title-name {
        margin-bottom: 0;
    }
    .up-assets{
        cursor: pointer;
        margin-left: 0.6rem;
        line-height: 0.28rem;
        color: #0098ff
    }
</style>
<script>
    import pwdMound from '@/components/page/personalcenter/pwdlayer'
    import mailMound from '@/components/page/personalcenter/maillayer'
    import PhoneMound from '@/components/page/personalcenter/phonelayer'
    import ChilderNav from '@/components/module/wordnav'
    import searchBox from '@/components/module/searchbox'
    import taskBox from '@/components/page/personalcenter/task'

    export default {
        data() {
            return {
                pageIndex: 1,//默认第一页
                pageSize: 10,//默认每页大小
                unBind: false,
                pwdPage: false, // 密码修改弹窗
                mailPage: false, // 邮箱修改弹窗
                phonePage: false, // 手机修改弹窗
                activeName2: 'first',
                tableData: [],
                infortabIdx: '',
                userFrom: {},
                taskData: {}, // 任务中心数据
                basicData: [], // 基本任务
                qrCode: '', // 二维码链接
                imgUrl: '', // 下载二维码
                username: localStorage.getItem('username')
            }
        },
        components: {
            'mail-box': mailMound,
            'pwd-box': pwdMound,
            'phone-box': PhoneMound,
            'nav-box': ChilderNav,
            'search-Box': searchBox,
            'task-Box': taskBox
        },
        computed: {
            activeBazzer() {
                return this.$store.state.world.activeBazzer
            },
            userInfor() {
                return this.$store.state.usersInfor
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
        mounted() {
            if (this.activeBazzer) {
                this.balanceData()
            }
        },
        filters: {
            float: function (value) {
                return value.replace(/^(\d{4})\d{4}(\d+)/, '$1****$2')
            }
        },
        watch: {
            activeBazzer(n, o) {
                if (o) {
                    this.balanceData()
                }
            },
            tables () {
                this.pageIndex = 1
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
            // //用户信息展示
            // 修改电话
            // 修改电话
            showPhone(phone) {
                this.userInfor.phone = phone
                this.$store.dispatch('usersInfor', this.userInfor)
                this.phonePage = false
            },
            // 修改邮箱
            showEmail(email) {
                this.userInfor.email = email
                this.$store.dispatch('usersInfor', this.userInfor)
                this.mailPage = false
            },
            change(type) {
                switch (type) {
                    case 1: // 密码修改
                        this.pwdPage = true
                        break
                    case 2: // 邮箱修改
                        this.mailPage = true
                        break
                    case 3: // 手机修改
                        this.phonePage = true
                        break
                }
            },
            mailClone(data) {
                this.mailPage = data
            },
            pwdClone(data) {
                this.pwdPage = data
            },
            phoneClone(data) {
                this.phonePage = data
            },
            verifnumber(data, e) {
            },
            // 账户资产
            balanceData(updateFlag) {
                let data = {
                    "updateFlag": updateFlag,
                    'siteId': this.activeBazzer.sysMark
                }
                if(updateFlag != true && this.activeBazzer.blanceList){ //如果资产存在并且用户不更新就不用请求
                        this.unBind = false;
                        this.tableData = this.activeBazzer.blanceList
                        return
                }
                this.$postAxios.balance(data).then((res) => {
                    if (res.data.code == 200) {
                        this.unBind = false// 没绑定API
                        console.log(res.data.data)
                        this.tableData = res.data.data
                        for(let v of this.bazzerList){
                            if(v.sysMark==data.siteId){
                                v.blanceList = res.data.data;//存储个人资产；
                            }
                        }
                        return
                    }
                    if (res.data.code == 318) {
                        this.unBind = true// 没绑定API
                        return
                    }
                    if(!updateFlag){
                        this.tableData = []
                    }
                    if(!updateFlag){
                        this.$store.dispatch('myBalance', [])
                    }
                    this.$messageTitle(res.data.msg,)
                }).catch((err) => {
                    this.tableData = []
                    this.$messageTitle('网络错误', 'error')
                })
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
            // 基本任务
            basicTasks() {
                this.$loginAjax.basicTasks({}).then((res) => {
                    if (res.data.code == 200) {
                        this.basicData = res.data.data
                    }
                })
            },
            // 获取用户积分
            userIntegral() {
                this.$loginAjax.userIntegral({}).then((res) => {
                    if (res.data.code == 200) {
                        this.taskData = res.data.data
                        this.qrCode = res.config.baseURL
                        this.imgUrl = res.config.baseURL + '/qrCode/create?' + 'content=' + this.taskData.inviteUrl
                        return
                    }
                    this.$messageTitle(res.data.msg, 'error')
                }).catch((err) => {
                    this.$messageTitle('网络错误，请稍后再试', 'error')
                })
            }
        }
    }
</script>
