<template>
    <div>
           <div class="member-infor">
                <ul>
                    <li>
                        会员时效：{{memberInfor}}
                    </li>
                    <li style="margin: 0.1rem 0">
                        账户余额：{{balance}}
                        <span class="pull-right" @click="tableType=true">消费明细</span>
                    </li>
                    <li>
                        账户积分：{{integral}}
                        <span>(积分可抵现金)</span>
                    </li>
                </ul>
           </div>
        <div class="memberBox">
            <h1>会员套餐</h1>
            <div class="member-list">
                <div style="padding: 0 0.16rem;display:inline-block;" v-for="(item,index) in memberList" :key="index">
                    <div class="member-card" >
                        <h2>{{item.title}}</h2>
                        <p>{{item.content}}</p>
                        <div style=" color: #ff415c">
                            ￥<span class="actual-price">{{item.price}}</span>
                            <span class="set-price">￥{{item.originalPrice}}</span>
                        </div>
                        <div class="member-card-tip">限时优惠</div>
                        <el-button   type="primary" @click="settle(item)">立即开通</el-button>
                        <p>有效期{{item.validMonth}}个月</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="tip-box">
            <h2>会员须知</h2>
            <P>会员有效期：用户购买会员生效之日为会员权限的起始日，以自然日进行计算会员周期</P>
            <P>抵用积分：购买不同时效的会员时，均可享受积分抵用，500积分以上即可享受抵用优惠。</P>
            <P>生效时间：会员到账时间可能会有延迟，一般1-2个工作日内到账。</P>
        </div>
        <balanceTable-box v-if="tableType" @close="tableType=false"></balanceTable-box>
        <balancesettle-box :settleInfor="settleInfor"   @openmembersettle="openmembersettle"
                           :balance="balance" :integral="integral" v-if="settleType" @close="settleType=false"></balancesettle-box>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    @import "@/assets/scss/app.scss";
    .tip-box{
        width:6rem;
        margin: auto;
        padding: 0.2rem 0.2rem;
        height: 1.5rem;
        border-radius: 5px;
        border: solid 1px #4e5b85;

    }
    .tip-box h2{
        text-align: center;
        margin-bottom: 0.14rem;
        color: #4e5b85;
    }
    .tip-box p{
        color: #4e5b85;
        text-align: justify;
        line-height: 0.24rem;
        font-size: 0.12rem;
    }
   .member-infor{
       width: 4.2rem;
       height: 0.98rem;
       margin: 0.48rem auto;
       background:$member_Img no-repeat;
       border-radius: 0.04rem;
   }
    .member-infor>ul{
        height: 100%;
        padding: 0.1rem 0.1rem 0 0.88rem;

    }
    .member-infor>ul>li{
        color: #FFFFff!important;
    }
    .member-infor>ul>li>span{
        color: #f78f9d;
        cursor: pointer;
    }
    .memberBox>h1{
        text-align: center;
        font-size: 0.24rem;
        color: #c3ccdb;
        margin-bottom: 0.36rem;
    }
    .member-list{
        text-align: center;
        margin: auto;
    }
    .member-list .member-card>h2{
        text-align: center;
        color: #ffffff;
        font-size: 0.2rem;
        margin-bottom: 0.04rem;
    }
    .member-card>p{
        color: #4e5b85;
        font-size: 0.12rem;
        margin-bottom: 0.28rem;
    }
    .member-card{

        height: 2.7rem;
        width: 2.8rem;
        padding-top: 0.2rem;
        border-radius: 0.04rem;
        border: solid 0.01rem #4e5b85;
        margin-bottom: 0.32rem;

        background-color: #262a4a;
    }
    .actual-price{
        font-size: 0.28rem;
        color: #ff415c!important;
    }
    .set-price{
        color: #4e5b85!important;
        text-decoration:line-through
    }
    .member-card-tip{
        margin: 0.06rem auto 0.32rem auto;
        width: 0.76rem;
        height: 0.19rem;
        background-color: #4e5b85;
        border-radius: 2px;
        color: #ffffff;
        font-size: 0.12rem;
    }
    .member-card button{
        margin-bottom: 0.1rem;
        width: 1.6rem;
        height: 0.37rem;
    }
</style>
<script>
    import balancelaye from '&/balancelayer'
    import membersettle from '&/membersettle'
    export default {
        data() {
            return {
                tableType:false,
                settleType:false,
                memberInfor:'未开通会员',
                settleInfor:"",
                balance:0,
                integral:0,
                memberList:[]
            }
        },
        components: {
            'balanceTable-box':balancelaye,
            'balancesettle-box':membersettle
        },
        computed:{
            memberData(){
                return this.$store.state.memberList
            }
        },
        created(){
                this.memberPost();
                if(this.memberData.length){
                    this.memberList=this.memberData;
                    return
                }
            this.memberListPOst()
        },
        methods:{
            memberPost(){
                this.$loginAjax.memberInfo ().then((res) => {
                    let dataVal=res.data.data;
                    if (res.data.code == 200) {
                        this.balance=dataVal.balance;//账号余额；
                        this.integral=dataVal.integral;//账号积分；
                       switch (dataVal.validState){ //0未开通，1开通，2已过期
                           case 1:
                               this.memberInfor=dataVal.validDate;//开通时效
                               break;
                           case 2:
                               this.memberInfor='会员已过期'
                       }
                    }
                })
            },
            openmembersettle(){//直接开通
                this.memberPost()
            },
            memberListPOst(){
                this.$loginAjax.memberList ().then((res) => {
                    let dataVal=res.data.data;
                    if (res.data.code == 200) {
                        this.$store.dispatch('memberList', dataVal);
                        this.memberList=dataVal
                    }
                })
            },
            settle(data){
                this.settleInfor=data;
                this.settleType=true;
            }
        }
    }
</script>