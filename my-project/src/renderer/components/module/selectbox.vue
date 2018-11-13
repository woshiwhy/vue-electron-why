<template>
    <el-select class="order-select" v-model="orderList[name]" @change="changeSelect">
        <el-option
                :label="allName"
                value="">
        </el-option>
        <el-option
                v-for="item in optionList"
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
        props:['selectOption','type','labelName','allName','name'],
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
            optionList(){
                    return  this.selectOption
            },
            orderList(){
                return this.$store.state.orderList;
            },
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
                        this.orderList.strategyName='';
                        this.orderList.symbol='';//选择交易所就清空币对
                        this.orderList.current=1;
                        break;
                    case 'id'://交易所选择
                        this.activeBazzer(ref);
                        this.orderList.symbol='';//选择交易所就清空币对
                        this.orderList.current=1;
                        break;
                    case 'uniteSymbol'://币对选择
                        break
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