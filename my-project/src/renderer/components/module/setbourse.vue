<template>
  <div class="select-box">
    <el-select v-model="bourse" value-key="id"  filterable :placeholder='$t("placeholder.bazzerName")'>
      <el-option
        mini
        v-for="(item,index) in seachData"
        :key="index"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
    <el-button size="medium" class="set-btn hover-btn" @click="setTerrace">
      {{$t("btnname.default")}}
    </el-button>

  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/scss/app";
  .select-box input{
    width: 2.2rem;
    height: 0.34rem;
    margin-right: 0.1rem;
  }
  .select-box .el-input__suffix{
    right: 0.1rem;
    height: .34rem;
  }
  .select-box .el-input__suffix span,.select-box .el-input__suffix span i{
    height: .34rem;
    line-height: .34rem;
  }
  .select-box>.set-btn{
    padding: 0;
    font-size: 0.14rem;
    background:#0098ff!important;
    @include  btn-style(
      $background:#0098ff,
      $border-radius:0.02rem,
      $width-size:1.3rem,
      $height-size:0.34rem
    );
  }
</style>
<script>
  export default {
    data () {
      return {
        bourse: ''
      }
    },
    computed: {
      seachData () {
        return this.$store.state.bazzer
      }
    },
    watch: {
      seachData () {
        setTimeout(() => {
          this.bourse = JSON.parse(localStorage.getItem('defaultMarket'))
        }, 500)
      }
    },
    mounted () {
      this.bourse = JSON.parse(localStorage.getItem('defaultMarket'))
    },
    methods: {
      setTerrace () {
        this.$messageTitle('默认平台设置成功', 'success');
        this.bourse.blanceList='';//清空存储的交易所的个人资产，防止重新登录后重新拿去，防止数据不准确
        localStorage.setItem('defaultMarket', this.bourse.id)
      }
    }
  }
</script>
