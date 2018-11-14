<template>

    <div>
        <transition name="el-fade-in">
        <el-dialog
                class="settle-dialog center-dialog"
                title="开通币巴士会员服务"
                :visible.sync="centerDialogVisible"
                width="4.47rem"
                :before-close="close"
                top="25vh"
                center>
            <ul>
                <li>
                    <label>开通时长</label>
                    <span>{{settleInfor.tip2}}</span>
                </li>
                <li>
                    <label>支付方式</label>
                    <span>支付宝</span>
                </li>
                <li>
                    <label>应付金额</label>
                    <span style="text-decoration:line-through">{{settleInfor.ja1}} 元</span>
                </li>
                <li>
                    <label>实付金额</label>
                    <span class="amount-color">{{payPost.amount}}</span> 元
                </li>
                <li>
                    <label>支付宝账号</label>
                    <el-input  v-model="payPost.account" placeholder="请输入支付宝账号">
                    </el-input>
                </li>
            </ul>
            <div class="checkbox">
                <el-checkbox  v-model="payPost.checked" class="checkset" @change="checkChange"  >&nbsp;可用{{integral}}积分抵扣{{integral}}现金</el-checkbox>
                <el-button   type="primary" @click="settle">立即开通</el-button>
            </div>

            <p style="text-align: center">支付成功后，我们会尽快完成审核，请耐心等待</p>
        </el-dialog>
        </transition>
        <!--付款二维码-->
        <transition name="el-fade-in">
        <el-dialog
                class="center-dialog"
                title="支付宝支付"
                :visible.sync="payType"
                width="4rem"

                :before-close="close"
                :close-on-click-modal="false"
                top="25vh"
                center>
            <img :src="payUrl" class="payImg">
            <p class="paytip">实付金额 <span class="amount-color">{{payPost.amount}}</span> 元</p>
            <div class="pay-btn">
                <el-button   type="primary" @click=onpay>已支付</el-button>
            </div>
        </el-dialog>
        </transition>
    </div>
</template>
<style >
.settle-dialog .el-dialog__body{
    padding: 0.24rem 0 0.2rem 0!important;
}
    .settle-dialog li{
        margin-bottom: 0.22rem;
        color: #4e5b85;
    }
    .settle-dialog li>label{
        width: 1.19rem;
        padding-right: 0.1rem;
        display: inline-block;
        text-align: right;
    }
    .settle-dialog li>span{
        display: inline-block;
    }
    .settle-dialog .checkbox{
        text-align: center;
    }
    .checkset{
        display: block;
    }
.settle-dialog .checkset span,.settle-dialog p{
    color: #4e5b85;
}
.settle-dialog .checkset  .el-checkbox__inner{
    background-color:#4e5b85 ;
    border-color:#4e5b85 ;
}
.checkbox button{
    color: #ffffff!important;
    margin: 0.24rem 0 0.2rem 0;
    width: 1.8rem;
}
    .settle-dialog .el-input,.settle-dialog input{
        width: 2.1rem;
        height: 0.37rem;
        background: none;
    }
    .amount-color{
        font-size: 0.2rem;
        color: #ff415c!important;
    }
    .payImg{
        width: 1.8rem;
        height: 1.8rem;
        margin: auto;
        display: block;
    }
    .pay-btn{
        text-align: center;
        margin-bottom: 0.10rem;
    }
    .pay-btn>button{
        height: 0.36rem;
        width: 1.65rem;
    }
    .paytip{
        color: #4e5b85;
        text-align: center;
        margin: 0.16rem 0;
    }
</style>
<script>
    import ceshiImg from "^/infor/pay.png";
    export default {
        props: ['settleInfor'],
        data () {
            return {
                centerDialogVisible:true,
                payType:false,
                payPost:{
                    type:'',
                    amount:'0',//实付金额
                    account:'',//支付宝账号
                    checked:false
                },

                integral:'777',
                payUrl:ceshiImg
            }
        },
        created () {
            this.payPost.amount=this.settleInfor.ja1
        },
        methods: {
            close () {
                this.$emit('close')
            },
            checkChange(data){
                if(this.integral<500&&data){
                    this.payPost.checked=false;
                    this.$messageTitle('积分不足500分，不能进行抵扣', 'error');
                    return
                }
                if(data){//true勾选
                    let numberPay=this.payPost.amount-this.integral;
                    this.payPost.amount=numberPay<=0?0:numberPay;
                    return
                }
                this.payPost.amount=this.settleInfor.ja1;
            },
            settle(){   // 生成订单，显示二维码
                if(!this.payPost.account){
                    this.$messageTitle('请输入支付宝账号', 'error');
                    return
                }
                if(!this.payPost.amount){
                    this.$messageTitle('支付成功', 'success');
                    this.close();
                    return
                }
                this.centerDialogVisible=false;
                this.payType=true;
            },
            onpay(){//支付完成
                this.$messageTitle('订单已生成，请耐心等待审核', 'success');
                this.close();
            }
        }
    }
</script>
