<template>
  <div class="small-box skin-bg" style="height: 100%">
    <h3 class="title-name">{{$t("headline.earnings")}} <span class="title-tip">单位: USDT</span></h3>
    <div class="card-all">
      <el-card v-for="(item , index) in list" :key="index" :class="item.className">
        <div slot="header" class="clearfix">
         {{item.name}}
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip10")}}</span>
          <span class="list-content">{{item.profit || '0'}}</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip8")}}</span>
          <span class="list-content">{{item.tradeVolume || '0'}}</span>
        </div>
        <div class="list-margin">
          <span class="list-content">{{$t("tip.tip9")}}</span>
          <span class="list-content">{{ item.yieldRate | floatTwo }}%</span>
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
          ALL:[
              {dateType:'today',profit:'0',tradeVolume:'0',yieldRate:'0'},
              {dateType:'week',profit:'0',tradeVolume:'0',yieldRate:'0'},
              {dateType:'month',profit:'0',tradeVolume:'0',yieldRate:'0'},
              {dateType:'all',profit:'0',tradeVolume:'0',yieldRate:'0'}
              ]
      }
    },
    created () {
      this.tableVal();
    },
    filters: {
      floatTwo: function (value) {
        value = Number(value || 0);
        return value.toFixed(2)
      }
    },
      computed:{
        list(){
            let tody=this.ALL.filter(f => f.dateType == 'today')[0];
            let week=this.ALL.filter(f => f.dateType == 'week')[0];
            let month=this.ALL.filter(f => f.dateType == 'month')[0];
            let all=this.ALL.filter(f => f.dateType == 'all')[0];
            tody.className='red-card';
            tody.name=this.$t('tabname.today');
            week.className='build-card';
            week.name=this.$t('tabname.week');
            month.className='green-card';
            month.name=this.$t('tabname.month');
            all.className='black-card';
            all.name=this.$t('tabname.all');
            return this.ALL;
        }
      },
    methods: {
      // 自动交易盈利统计
      tableVal () {
        this.$postAxios.profitStatistics().then((res) => {
          if (res.data.code == 200) {
              this.ALL=res.data.data;
          }
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
      }

    }
  }
</script>
