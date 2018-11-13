<template>
    <div>
        <div style="margin-bottom: 0.16rem">
            <!--交易类型-->
            <select-Box style="margin-left: 0.32rem" @tradeType="tradeTypeFun" :name="'type'" :allName="'全部订单'" :selectOption="tradeType" :type="'val'" :labelName="'name'"></select-Box>
            <!--自动交易策略-->
            <template v-if="cashShow">
                <!--现货交易交易所选择-->
                <select-Box  :selectOption="bazzerList" :name="'siteId'" :allName="'全部交易所'"  :type="'id'" :labelName="'name'"></select-Box>
                <!--币对选择-->
                <select-Box  :selectOption="currList" :name="'symbol'" :allName="'全部币对'" :type="'name'" :labelName="'uniteSymbol'"></select-Box>
            </template>
            <el-input style="width: 2.9rem;" v-if="strategyShow" v-model="orderList.strategyName" placeholder="请输入方案名称"></el-input>
        </div>
        <tablelist-box style="width:100%;margin-bottom: 0.16rem" :loadingType="loadingType"  :type="'one'" :tableVal="tableVal" :tableName="tableName"></tablelist-box>
        <el-pagination
                style="text-align: center"
                :page-size="15"
                layout="prev, pager, next"
                :current-page="number"
                :current-page.sync="orderList.current"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import TableList from '&/historytable'
    import selectBox from '&/selectbox'
    export default {
        data () {
            return {
                number:5,
                total:0,
                tradeType:[
                    {
                        name:'现货交易',
                        val:'0'
                    },
                    {
                        name:'自动交易',
                        val:'1'
                    },
                    {
                        name:'平衡交易',
                        val:'2'
                    }
                ],
                strategyList:[],
                tableVal: [],
                loadingType: false,
                strategyShow:true,//自动交易策略选择
                cashShow:true,//现货交易选择；
                setOBj:{}//节流对象
            }
        },
        components: {
            'tablelist-box': TableList,
            'select-Box': selectBox
        },
        computed: {
            tableName () { // 成交历史
                return [
                    {name: '订单类型', val: 'type'},
                    {name: '方向', val: 'tradeType'},
                    {name: '委托时间', val: 'createTime'},
                    {name: '方案名称', val: 'remark'},
                    {name: '交易所', val: 'siteName'},
                    {name: '币对', val: 'symbol'},
                    {name: '数量', val: 'amount'},
                    {name: '单价', val: 'price'},
                    {name: '状态', val: 'status'},
                    ]
            },
            bazzerList () {
                return this.$store.state.bazzer
            },
            bazzerSelect(){
                return this.$store.state.sopttrading.selectBazzer;
            },
            orderList(){
                return this.$store.state.orderList;
            },
            currList(){
               if( this.bazzerSelect==undefined){
                   return []
               }
                return this.bazzerSelect.symbolList
            }
        },
        watch:{
            orderList:{
                handler(data) {
                    this.orderPost(this.setOBj)
                 },
                immediate: true,
                deep: true
            }
        },
        methods:{
            orderPost(obj){
                clearTimeout(obj.throttle);
                this.tableVal=[];
                this.loadingType=true;
                obj.throttle = setTimeout(() => {
                    this.$postAxios.orderList(this.orderList).then((res) => {
                        let dataVal = res.data;
                        this.loadingType = false;
                        if (dataVal.code == 200) {
                            this.total = dataVal.data.total;
                            this.tableVal = dataVal.data.records;
                        }
                    }).catch((err) => {
                        this.loadingType = false;
                        this.$messageTitle('网络错误，请稍后重试', 'error')
                    })
                },1000)

            },
            handleCurrentChange(page){
                this.orderList.current=page
            },
            tradeTypeFun(data){//交易类型选择
                switch (data){
                    case '0'://现货
                      this.strategyShow=false;
                      this.cashShow=true;
                        break;
                    case '1'://自动
                        this.strategyShow=true;
                        this.cashShow=false;
                        break;
                    case '2'://平衡
                        this.strategyShow=false;
                        this.cashShow=true;
                        break;
                    default://全部
                        this.strategyShow=true;
                        this.cashShow=true;
                }
            }
        }
    }
</script>