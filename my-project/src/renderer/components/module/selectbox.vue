<template>
    <el-select class="order-select" v-model="orderList[name]" @change="changeSelect">
        <el-option
                :label="allName"
                value="">
        </el-option>
        <el-option
                v-for="item in selectOption"
                :key="item[type]"
                :label="item[labelName]"
                :value="item[type]">
        </el-option>
    </el-select>
</template>
<style>
    .order-select{
        margin-right: 0.16rem;
    }
    .order-select .el-input--suffix .el-input__inner {
         width: 1.35rem;
    }
</style>
<script>
    export default {
        props:['selectOption','type','labelName','allName','name'],//selectOption=select选中项。type=取值字段。labelName=选项展示字段。name=传产字段
        data () {
            return {
                selectVal:''
            }
        },
        created(){
            if(this.type=='id'){
                this.$store.dispatch('selectBazzer',this.selectOption[0])
            }
        },
        computed:{
            orderList(){
                return this.$store.state.orderList;
            }
        },
        beforeDestroy(){
            if(this.type=='id') {
                this.$store.dispatch('selectBazzer', [])
            }
        },
        methods:{
            changeSelect(ref){
                switch (this.type){
                    case 'val': //交易类型
                        this.$emit('tradeType',ref);
                        this.orderList.siteId='';
                        this.orderList.strategyName=''; //清空模糊搜索。
                        this.orderList.symbol='';//选择交易所就清空币对
                        this.orderList.current=1;
                        this.$store.dispatch('selectBazzer', []);
                        break;
                    case 'id'://交易所选择
                        this.activeBazzer(ref);
                        this.orderList.symbol='';//选择交易所就清空币对
                        this.orderList.current=1;
                        break;
                }
            },
            activeBazzer(data){
                let bazzerList=this.$store.state.bazzer;
                for(let v of bazzerList){
                    if(v.id==data){
                        this.$store.dispatch('selectBazzer',v);
                       return
                    }
                }
                this.$store.dispatch('selectBazzer', [])
            }
        }

    }
</script>