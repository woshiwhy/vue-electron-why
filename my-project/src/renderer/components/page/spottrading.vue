<template>
    <el-container>
        <el-aside width="4rem">
            <div class="small-box skin-bg">
                <h3 class="title-name">{{$t("headline.platformset")}}</h3>
                <setbourse-box style="padding-left: 0.15rem"></setbourse-box>
            </div>
            <div class="small-box skin-bg" style="min-height: 3.05rem" v-loading="loading2" element-loading-background="rgba(0, 0, 0, 0)">
                <h3 class="title-name">{{$t("headline.balance")}}</h3>
                <span v-if="$store.state.sopttrading.myBalance" class=" btn-color update-btn"
                      @click="updateClick">{{$t("btnname.update")}}</span>
                <asset-box :bindType="unBind"></asset-box>
            </div>
            <div class="small-box skin-bg bottom-box">
                <h3 class="title-name">{{$t("headline.deal")}}</h3>
                <div class="deal-box clearfloat">
                    <div class="pull-left">
                        <form-box
                                ref="child1"
                                @submintFun="buySubmint"
                                :fromListch="registerList"
                                :type="'buy'"
                                :btnName="btnName"
                                :basisCurrent="buyBasis"
                                :priceVal="$store.state.sopttrading.buyPrice"
                                :fromVal="register">
                        </form-box>
                    </div>
                    <div class="pull-right">
                        <form-box
                                ref="child2"
                                :type="'sell'"
                                @submintFun="sellSubmint"
                                :fromListch="registerList1"
                                :btnName="btnName1"
                                :basisCurrent="sellBasis"
                                :priceVal="$store.state.sopttrading.sellPrice"
                                :fromVal="register1">
                        </form-box>
                    </div>
                </div>
                <div class="deal-box clearfloat">
                    <div class="pull-left ">
                        <h3 class="title-name">{{$t("headline.buydepth")}}</h3>
                        <tablelist-box :tableType="'1'"></tablelist-box>
                    </div>
                    <div class="pull-right ">
                        <h3 class="title-name">{{$t("headline.selldepth")}}</h3>
                        <tablelist-box :tableType="'2'"></tablelist-box>
                    </div>
                </div>
            </div>
        </el-aside>
        <main-box></main-box>
    </el-container>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/scss/app";

    .update-btn {
        position: absolute;
        right: 0.1rem;
        top: 0.15rem;
    }

    .deal-box {
        padding: 0 0.1rem 0.1rem 0.1rem;
    }

    .bottom-box {
        height: -moz-calc(100% - 4.3rem);
        height: -webkit-calc(100% - 4.3rem);
        height: calc(100% - 4.3rem);
    }

    .moery-title {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        margin-bottom: .1rem;
    }

    .deal-box > div {
        width: 1.85rem;
    }

    .deal-box .title-name {
        padding: 0;
    }
</style>
<script>
    import SetBourse from '@/components/module/setbourse'
    import TableList from '@/components/module/tablelist'// 深度表格
    import AsstTable from '@/components/module/assettable'// 账户资产表格
    import formMound from '@/components/module/byfrom'
    import spottradMain from '@/components/page/spottrading/main'
    export default {
        data () {
            return {
                loading2:false,
                unBind: false,
                register: {// 买入
                    price: '',
                    amount: ''
                },

                register1: {// 卖出
                    price: '',
                    amount: ''
                }
            }
        },
        computed: { //  监听选中值
            registerList () {
                return [// 买入
                    {
                        placeholder: this.$t('tableheder.price'),
                        remClass: 'rem-class',
                        name: 'price'
                    },
                    {
                        remClass: 'rem-class',
                        placeholder: this.$t('tableheder.amount'),
                        name: 'amount'
                    }
                ]
            },
            registerList1 () {
                return [/// /卖出
                    {
                        placeholder: this.$t('tableheder.price'),
                        name: 'price'
                    },
                    {
                        placeholder: this.$t('tableheder.amount'),
                        name: 'amount'
                    }
                ]
            },
            btnName () {
                return {
                    name: this.$t('btnname.buy'),
                    class: 'buy-btn'
                }
            },
            btnName1 () {
                return {
                    name: this.$t('btnname.sell'),
                    class: 'sell-btn'
                }
            },
            sellPriceType () {
                return this.$store.state.sopttrading.pricesSet
            },
            moneyNumber () {
                return this.$store.state.sopttrading.balance
            },
            navBazzer () {
                return this.$store.state.sopttrading.selectBazzer
            },
            bazzerList(){
              return this.$store.state.bazzer;
            },
            navCurrenty () {
                return this.$store.state.sopttrading.selectCurrenty
            },
            buyBasis () { // 买入计价货币
                let name = '';
                if (this.navCurrenty.quoteCurrency) {
                    name = this.navCurrenty.quoteCurrency + '/' + this.moneyNumber.buy
                }
                return name
            },
            sellBasis () { // 卖出计价货币
                let name = '';
                if (this.navCurrenty.baseCurrency) {
                    name = this.navCurrenty.baseCurrency + '/' + this.moneyNumber.sell
                }
                return name
            }
        },
        watch: {// 交易市场改变，货币改变清空表单。
            navBazzer (n, o) {
                const Bazzer_SiteId = n.id;
              if(typeof(Bazzer_SiteId)!="undefined"){
                  this.$store.dispatch('selectCurrenty', '');
                  this.currenty();// 动态加载货币
                  this.balancePost({siteId: Bazzer_SiteId});// 个人资产
                  this.$refs.child1.handleParentClick();// 传递给子组件删除
                  this.$refs.child2.handleParentClick();// 传递给子组件删除
              }
            },
            navCurrenty (n, o) {
                this.$store.dispatch('depthChart', '');// 深度
                this.$refs.child1.handleParentClick();// 传递给子组件删除
                this.$refs.child2.handleParentClick();// 传递给子组件删除
            },
            sellPriceType () {
                this.balancePost({siteId: this.navBazzer.id});// 个人资产
            }
        },
        components: {
            'setbourse-box': SetBourse,
            'tablelist-box': TableList,
            'asset-box': AsstTable,
            'form-box': formMound,
            'main-box': spottradMain
        },
        beforeDestroy () { // 组件销毁前清空值。
            this.$store.dispatch('buyPrice', '');
            this.$store.dispatch('sellPrice', '');
            this.$store.dispatch('lineVal', '');
            this.$store.dispatch('depthChart', '');
            this.$store.dispatch('currenty', '');
        },
        created () {
            let currenty_Obj = this.navBazzer.id;
            if (currenty_Obj) {
                this.currenty();// 动态加载货币
               this.balancePost({siteId: currenty_Obj});// 个人资产
            }
        },
        methods: {
            currentySelect (data_Obj) {
                let currenty_Obj = this.$store.state.sopttrading.selectCurrenty;
                if (!currenty_Obj) { // 如果没选择,默认第一个选中
                    this.$set(data_Obj[0], 'active', true);
                    this.$store.dispatch('selectCurrenty', data_Obj[0])
                } else {
                    for (let v of data_Obj) { // 判断选中的ID，改变货币列表选中状态
                        this.$set(v, 'active', false);
                        if (v.uniteSymbol == currenty_Obj.uniteSymbol) {
                            this.$set(v, 'active', true);
                        }
                    }
                }
            },
            // 货币种类存储
            currenty () {
                this.currentySelect(this.navBazzer.symbolList);
                this.$store.dispatch('currenty', this.navBazzer.symbolList)
            },
            // 个人资产
            balancePost (data) {
                if(this.navBazzer.blanceList && !data.updateFlag){  // 有个人资产了就不申请了
                    console.log(this.navBazzer.blanceList)
                    this.unBind = false;// 绑定API// ；
                    this.$currentyBalance(this.navBazzer.blanceList);
                    this.$store.dispatch('myBalance', this.navBazzer.blanceList.slice(0, 5));
                    return
                }
                this.loading2=true;
                this.$balancePost(data).then(res => {
                    this.loading2=false;
                   if(res.code==200){
                    this.unBind = false;// 绑定API
                    this.$store.dispatch('myBalance', res.data.slice(0, 5));//现货交易只显示前5条，截取前5条
                }
                if (res.code == 318) {
                    this.unBind = true;// 没绑定API
                }
                 },error => {
                    this.loading2=false;
                });
            },

            // 买卖完毕以后，币的可使用数量变化
            buySubmint (data) {
                data.type = 'buy';
                this.transactionPost(data)
            },
            sellSubmint (data) {
                data.type = 'sell';
                this.transactionPost(data)
            },
            transactionPost (data) {
                data.siteId = this.navBazzer.id;
                data.symbol = this.navCurrenty.symbol;
                const table_List = JSON.parse(JSON.stringify(data));
                this.$postAxios.transaction(data).then((ref) => {
                    if (ref.data.code == 200) {
                        table_List.orderId = ref.data.data;
                        table_List.fieldAmount = '0';
                        table_List.status = '0';
                        table_List.time = this.$moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
                        this.$store.dispatch('tableList', table_List)// 添加到挂单表格；
                        this.$store.dispatch('dealType', !this.$store.state.sopttrading.dealType);// 挂单表格刷新
                        this.$store.dispatch('pricesSet', !this.$store.state.sopttrading.pricesSet);// 可用价格刷新
                        this.$refs.child1.handleParentClick();
                        this.$refs.child2.handleParentClick();
                        this.$messageTitle('挂单成功', 'success');
                        return
                    }
                    this.$messageTitle(ref.data.msg, 'error')
                }).catch((error) => {
                    this.$messageTitle('网络错误，请稍后重试', 'error')
                })
            },
            updateClick () { // 更新资产
                this.balancePost({siteId: this.navBazzer.id,updateFlag:true})
            }
        }
    }
</script>
