<template>
  <el-form :model="ruleForm" :rules="rules" :show-message="false" ref="ruleForm" label-width="0" class="demo-ruleForm">
    <template v-for="(item,index) in fromListch">
      <el-form-item :label="item.title" class="lable-rem" :prop="item.name">
        <el-col class="rem-class">
          <el-input type="text" :name="ruleForm[item.name]" :placeholder="item.placeholder"
                    @keyup.native="numberWright(item)"
                    v-model="ruleForm[item.name]">
          </el-input>
        </el-col>
      </el-form-item>
    </template>
    <el-form-item class="lable-rem">
     <div class="font-14 pull-left pull-heg">
       {{ $t('tableheder.turnover')}}：<span>{{sumCalculate||0}}</span>
     </div>
    </el-form-item>
    <el-form-item class="lable-rem">
      <div class="font-14 pull-left pull-heg">
       {{ $t('tableheder.usable1')}}：<span @click="addNumber(basisCurrent)" style="cursor: pointer;">{{basisCurrent}}</span>
      </div>
    </el-form-item>
    <el-form-item class="text-center">
      <el-button size="medium" class="submint-btn1 hover-btn" :class="btnName.class"  @click="submitForm('ruleForm',$event)">
        {{btnName.name||'提交'}}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/scss/app";
  .lable-rem{
    margin-bottom: 0!important;
  }
  .lable-rem:nth-child(3){
    margin-bottom: -8px;
  }
  .lable-rem>.el-form-item__content{
    height: 0.32rem;
    width: 1.85rem;
  }
  .submint-btn1{
    font-size: 0.16rem;
    padding: 0;
    color: #ffffff!important;
    @include  btn-style(
      $background:none,
      $border-radius:0.02rem,
      $width-size:1.85rem,
      $height-size:0.34rem
    );
  }

  .buy-btn{
      background: #0bbe89!important;
  }
  .sell-btn{
    background: #ee1e3b!important;
  }
  .rem-class input{
    border-radius: 0.02rem;
    height: 0.32rem!important;
  }
.pull-heg, .pull-heg span{
  height: .2rem;
  color: #4e5b85!important;
}
</style>
<script>
  export default {
    props: ['fromVal', 'fromListch', 'btnName', 'priceVal', 'basisCurrent', 'type'], // price买入卖出价格,basisCurrent=当前计价货币余额
    data () {
      var price = (rule, value, callback) => {
        const myreg = /^\d+(?=\.{0,1}\d+$|$)/;
        if (!value) {
          this.$messageTitle('请输入价格', 'error');
          return callback(new Error())
        } else if (!myreg.test(value)) {
          this.$messageTitle('请输入正确的价格', 'error');
          return callback(new Error())
        } else {
          callback()
        }
      }
  var amount = (rule, value, callback) => {
        const myreg = /^\d+(?=\.{0,1}\d+$|$)/;
        if (!value) {
          this.$messageTitle('请输入数量', 'error');
          return callback(new Error())
        } else if (!myreg.test(value)) {
          this.$messageTitle('请输入正确的数量', 'error');
          return callback(new Error())
        } else {
          callback()
        }
      }
      return {
        ruleForm: this.fromVal,
        serviceM: 0,
        rules: {
          price: [
            {validator: price, trigger: 'keyup'}
          ],
          amount: [
            {validator: amount, trigger: 'keyup'}
          ]
        }
      }
    },

    computed: {
      sumCalculate () { // 计算总价格
        let number = this.ruleForm.amount;
        let price = this.ruleForm.price;
        let allNumber = number * price;
        let pricePrecision = parseInt(this.$store.state.sopttrading.selectCurrenty.pricePrecision) + 2// 精度(防止，0.000000001位数不够。)
        let number_Place = allNumber.toString().indexOf('.');
        if (number_Place != -1) {
          allNumber = allNumber.toString().substring(0, pricePrecision)
        }
        if (allNumber.toString().indexOf('-') >= 0) { // 科学计数法转换
          allNumber = '0' + String(Number(allNumber) + 1).substr(1)
        }
        return allNumber
      },
      byPrice () {
        return this.priceVal// 买人价格,卖出价格
      }

    },
    watch: {
      byPrice (newValue, oldValue) {
        if (newValue) {
          this.ruleForm.price = newValue.price;// 买人价格,卖出价格
          this.ruleForm.amount = ''
        }
      }
    },
    methods: {
      addNumber (number) {
        let all_Number = number.split('/')[1];
        if (this.type == 'sell' && all_Number != 0) { //  卖就点击获取币的全部数量
          this.ruleForm.amount = all_Number;
          this.numberWright({ name: 'amount'})
        }
        if (this.type == 'buy' && all_Number != 0) { //  获得可买的最大数量
          this.ruleForm.amount = String(all_Number / this.ruleForm.price);
          this.numberWright({ name: 'amount'})
        }
      },
      handleParentClick () { // 清空表单
        this.$refs.ruleForm.resetFields();
        this.$store.dispatch('buyPrice', '');
        this.$store.dispatch('sellPrice', '')
      },
      numberWright (data) {
        // pricePrecision amountPrecision量精度
        let precision = ''
        if (data.name == 'price') { // 设置价格精度
          precision = parseInt(this.$store.state.sopttrading.selectCurrenty.pricePrecision) + 1;// 精度控制
        } else {
          precision = parseInt(this.$store.state.sopttrading.selectCurrenty.amountPrecision) + 1;// 精度控制
        }
        this.ruleForm[data.name] = this.ruleForm[data.name].replace(/[^(\d+\.?\d+)]/g, '');
        let number_Place = this.ruleForm[data.name].indexOf('.')
        if (precision == 1 && number_Place != -1) {
          this.ruleForm[data.name] = this.ruleForm[data.name].substring(0, number_Place).toString();
          return
        }
        if (number_Place != -1) {
          let number_new = this.ruleForm[data.name].substring(0, number_Place).toString();
          let decimals = this.ruleForm[data.name].substring(number_Place);
          let decimals_New = decimals.substring(0, precision);
          this.ruleForm[data.name] = number_new + decimals_New
        }
      },
      submitForm: function (formName, even) {
        let _this = this
        _this.$refs[formName].validate(function (valid) {
          if (valid) {
            _this.$emit('submintFun', _this.ruleForm, even.currentTarget, _this.$refs[formName])
          } else {
            console.log('error submit!!');
            return false
          }
        })
      }

    }
  }
</script>
