<template>
  <div class="small-box skin-bg" style="height: 100%">
    <h3 class="title-name">{{$t("headline.earnings")}} <span class="title-tip">单位: USDT</span></h3>
    <div class="card-all">
      <el-card class="red-card">
        <div slot="header" class="clearfix">
          {{$t("tabname.today")}}
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip8")}}</span>
          <span class="list-content" v-if="today != ''">{{today.sum}}</span>
          <span class="list-content" v-else>0</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip10")}}</span>
          <span class="list-content" v-if="today != ''">{{today.profit}}</span>
          <span class="list-content" v-else>0</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip9")}}</span>
          <span class="list-content" v-if="today != ''">{{today.rate | floatTwo}}%</span>
          <span class="list-content" v-else>0%</span>
        </div>
      </el-card>
      <el-card class="build-card">
        <div slot="header" class="clearfix">
          {{$t("tabname.week")}}
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip8")}}</span>
          <span class="list-content" v-if="week != ''">{{week.sum}}</span>
          <span class="list-content" v-else>0</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip10")}}</span>
          <span class="list-content" v-if="week != ''">{{week.profit}}</span>
          <span class="list-content" v-else>0</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip9")}}</span>
          <span class="list-content" v-if="week != ''">{{week.rate | floatTwo}}%</span>
          <span class="list-content" v-else>0%</span>
        </div>
      </el-card>
      <el-card class="green-card">
        <div slot="header" class="clearfix">
          {{$t("tabname.month")}}
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip8")}}</span>
          <span class="list-content" v-if="month != ''">{{month.sum}}</span>
          <span class="list-content" v-else>0</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip10")}}</span>
          <span class="list-content" v-if="month != ''">{{month.profit}}</span>
          <span class="list-content" v-else>0</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip9")}}</span>
          <span class="list-content" v-if="month != ''">{{month.rate | floatTwo}}%</span>
          <span class="list-content" v-else>0</span>
        </div>
      </el-card>
      <el-card class="black-card">
        <div slot="header" class="clearfix">
          {{$t("tabname.all")}}
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip8")}}</span>
          <span class="list-content" v-if="all != ''">{{all.sum}}</span>
          <span class="list-content" v-else>0</span>

        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip10")}}</span>
          <span class="list-content" v-if="all != ''">{{all.profit}}</span>
          <span class="list-content" v-else>0</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip9")}}</span>
          <span class="list-content" v-if="all != ''">{{all.rate | floatTwo}}%</span>
          <span class="list-content" v-else>0%</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style>
  .card-all {
    padding: 0 0.2rem;
  }

  .card-all > div {
    margin-bottom: 0.15rem;
  }

  .card-all .el-card__header {
    padding: 0.11rem 0;
    text-align: center;
  }

  .card-all .el-card__body {
    padding: 0.15rem 0.15rem 0;
  }

  .card-all .el-card__header > .clearfix {
    color: #ffffff !important;
    font-size: 0.16rem;
  }
.title-tip{
  float: right;
  font-size: 0.12rem;
  font-weight: 500;
  display: inline-block;
  margin-top: 0.02rem;
  color: #4e5b85!important;
}
  .card-all .list-content {
    display: inline-block;
    width: 49%;
    text-align: center;
  }

  .card-all .list-margin {
    margin-bottom: 0.15rem;
  }

  .red-card > .el-card__header {
    background: #ff2d08;
  }

  .red-card {
    border: 2px solid #ff2d08!important;
  }

  .build-card > .el-card__header {
    background: #0098ff;
  }

  .build-card {
    border: 2px solid #0098ff!important;
  }

  .green-card > .el-card__header {
    background: #0fc482;
  }

  .green-card {
    border: 2px solid #0fc482!important;
  }

  .black-card > .el-card__header {
    background: #537d9a;
  }

  .black-card {
    border: 2px solid #537d9a!important;
  }
</style>
<script>
  export default {
    data () {
      return {
        sendData: '',
        receiveData: '',
        shutDownData: '',
        today: [], // 今日盈利
        week: [], // 本周盈利
        month: [], // 本月盈利
        all: []// 所有盈利
      }
    },
    created () {
      this.tableVal()
    },
    filters: {
      floatTwo: function (value) {
        value = Number(value)
        return value.toFixed(2)
      }
    },
    mounted () {
      // this.tableVal()
    },
    methods: {
      // 自动交易盈利统计
      tableVal () {
        let data = {}
        this.$postAxios.profitStatistics(data).then((res) => {
          if (res.data.code == 200) {
            this.today = res.data.data.today
            this.week = res.data.data.week
            this.month = res.data.data.month
            this.all = res.data.data.all
          }
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
      }

    }
  }
</script>
