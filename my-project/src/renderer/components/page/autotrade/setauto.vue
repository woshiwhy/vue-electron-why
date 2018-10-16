<template>
  <div class="small-box skin-bg" style="padding-left:  0.15rem; height: 100%">
    <h3 class="title-name" style="padding: 0">{{$t("headline.setPlan")}}</h3>
    <span class="add-new btn-color" @click="close">{{$t("btnname.addPlay")}}</span>
    <el-input class="left-input" v-model="setStrateg.name" :disabled="!loadingType" :placeholder='$t("placeholder.planName")'></el-input>
    <!--货币模糊搜索-->
    <el-autocomplete
      class="left-input"
      v-model="setStrateg.desc"
      :fetch-suggestions="querySearch"
      :placeholder='$t("placeholder.seekPlan")'
      @select="handleSelect"
      suffix-icon="el-icon-search"
      value-key="desc"
      :disabled="!loadingType"
    >
    </el-autocomplete>
    <div class="form-liest">
      <label>{{$t("tip.ratio")}}:</label>
      <div class="unit-icon">
        <el-input-number v-model="setStrateg.pricePercent" :disabled="!loadingType" :precision="2" :controls=false :max="100" :min="0.5"></el-input-number>
        <span class="icon-number" >%</span>
      </div>
    </div>
    <div class="form-liest">
      <label>{{$t("tip.maxNumber")}}:</label>
      <div class="unit-icon">
        <el-input-number v-model="setStrateg.singleMaxPercent" :precision="2" :controls=false :max="99"
                         :min="10" :disabled="!loadingType"></el-input-number>
        <span class="icon-number">%</span>
      </div>
    </div>
    <div class="form-liest">
      <label>{{$t("tip.minNumber")}}:</label>
      <div class="unit-icon">
        <el-input-number v-model="setStrateg.singleMinPercent"  :precision="8" :min="0.00000001" :controls=false :max="50"
                          :disabled="!loadingType"></el-input-number>
        <span class="icon-number">%</span>
      </div>
    </div>
    <h3 class="title-name" style="padding: 0;margin-top: .3rem;">{{$t("headline.planset")}}</h3>
    <div style="margin: 0 auto;">
      <div class="exchange-set">
        <label>{{$t("tip.balance")}}:</label>
        <span class="smll-title">{{$t("tip.tip3")}}:</span>
        <el-input-number v-model="setStrateg.balancePercent" :precision="0" :controls=false :max="100"
                         :min="50" :disabled="!loadingType"></el-input-number>
        <i class="fontclor">%</i>
        <span class="smll-title">{{$t("tip.trigger")}}</span>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button size="medium" class="auto-btn hover-btn save-btn" @click="save()" v-if="loadingType">
        {{$t("btnname.save")}}
      </el-button>
    </div>
    <div style="text-align: center;">
      <transition name="fade">
      <el-button size="medium" class="auto-btn hover-btn execute-btn"  v-if="loadingType" @click="carriedOut()"
                 :disabled="disableType">
        {{$t("btnname.runPlan")}}
      </el-button>
      <el-button size="medium" class="auto-btn hover-btn  execute-btn" v-else @click="cancelRun()" >
        {{$t("btnname.cancelPlan")}}
      </el-button>
      </transition>
    </div>
    <transition name="fade">
    <layer-box v-if="centerDialogVisible" :width="'3rem'" @close="closeLaye" @confirm="runPlay"
               :content='$t("tip.tip4")'></layer-box>
    </transition>
  </div>


</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../assets/scss/app";

  .auto-btn {
    padding: 0!important;
    margin-bottom: 0.1rem!important;
    font-size: 0.14rem!important;
    @include btn-style(
      $background: none,
      $border-radius: 0.03rem,
      $width-size: 2.85rem,
      $height-size: 0.4rem
    );
  }
  .save-btn{
    color: #ffffff!important;
    background: #0098ff!important;
  }
  .execute-btn {
    background: #ff2d08!important;
  }
  .execute-btn.is-disabled{
    background:#ffffff!important;
  }
  .exchange-set {
    padding-left: 1.1rem;
    margin-bottom: 0.15rem;
    padding-right: 0.02rem;
    position: relative;
    line-height: 0.3rem;
  }

  .exchange-set > label {
    font-weight: bold;
    position: absolute;
    left: 0;
    height: 0.3rem;
    line-height: 0.3rem;
    display: block;
    width: 1rem;
    text-align: right;
  }

  .exchange-set > .el-input-number {
    width: 0.6rem;
    line-height: 0.3rem;
  }

  .exchange-set input {
    padding: 0 !important;
    height: 0.3rem;
    font-size: 0.14rem;
  }

  .add-new {
    position: absolute;
    top: 0.2rem;
    right: 0.15rem;
    cursor: pointer;
  }

  .left-input {
    width: 2.92rem!important;
    margin: auto!important;
    display: block!important;
    margin-bottom: 0.15rem!important;
  }

  .form-liest {
    margin-bottom: 0.15rem;
  }

  .form-liest > label {
    display: inline-block;
    font-size: 0.14rem;
    width: 1.05rem;
    text-align: right;
    font-weight: bold;
    margin-right: 0.05rem;
  }

  .unit-icon {
    display: inline-block;
    position: relative;
  }

  .unit-icon > .el-input-number {
    width: 2.114rem;
    height: 0.38rem;
  }

  .unit-icon input {
    padding-right: 0.25rem !important;
  }

  .icon-number {
    font-size: 0.14rem;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    color: #4e5b85!important;
  }

  .el-aside .el-input__icon {
    font-size: .18rem;
    cursor: pointer;
  }
</style>
<script>
import layerBox from '@/components/module/layer'
export default {
    data () {
      return {
        centerDialogVisible: false,
        loadingType: true, // true执行策略，false取消策略
        webVal: {
          'site': 'hub',
          'event': '',
          'channel': 'depth_monitor',
          'symbol': ''
        },
        disableType: true, //
        setStrateg: {
          id: '',
          name: '', // 策略名称
          balancePercent: '', // 触发利差
          singleMaxPercent: '', // 交易最大量
          singleMinPercent: '', // 交易最小量
          //          scanRate: '',//扫描频率
          desc: '',
          monitorId: '', // 策略id
          askSite: '', // 买方站点
          bidSite: '', // 卖方站点
          symbol: '', // 币对
          pricePercent: ''
        }
      }
  },
    created () {
        if(!this.myPlan){ //  没有系统策略缓存，就请求。
            this.selectPlan()
        }
    },
    computed: {
      playPlan () { // 正在执行的策略
        return this.$store.state.auto.playPlan
      },
      changePlan () { // 当前要修改的方案
        return this.$store.state.auto.changePlan
      },
      myPlan () { // 下拉策略
        return this.$store.state.auto.myplan
      },
      wsObj () {
        return this.$store.state.webSocket
      },
      fromClear () { //  表格清空状态
        return this.$store.state.auto.fromClear
      }
    },
    watch: {
      changePlan (n, o) { // 当前选中的策略
        const type_Run = n.status; //  是否正在执行
        if (n.name) { // 推荐方案没有名字，需要保持设置
          this.disableType = false;// 执行策略按钮可用
        } else {
          this.disableType = true
        }
        for (let v in this.setStrateg) {
          this.setStrateg[v] = n[v] || ''
        }
        if (type_Run == 1) { // 1正在执行
          this.loadingType = false;
          return
        }
        this.loadingType = true
      },
      fromClear () {
        const delePlanId = this.$store.state.auto.delePlan;
        const changePlanId = this.changePlan.id;
        if (delePlanId == changePlanId) { //  当前删除的策略和修改的策略ID相同，清空表单
          this.close()
        }
      }
    },
    components: {
      'layer-box': layerBox,
    },
    methods: {
      close () { // 新建情况表
        this.disableType = true;
        this.loadingType = true;
        const save_Data = this.setStrateg;
        for (let v in save_Data) {
          save_Data[v] = ''
        }
      },
      // 保存策略
      save () {
        const save_Data = this.setStrateg;
        const postDat = {}
        for (let v in save_Data) {
          let required_Name = save_Data[v];
          postDat[v] = save_Data[v]
          switch (v) {
            case 'name':
              if (!required_Name) {
                this.$messageTitle('请输入方案名', 'error');
                return
              }
              break
            case 'monitorId':
              if (!required_Name) {
                this.$messageTitle('请选择策略', 'error');
                return
              }
              break
            case 'pricePercent':
              if (!required_Name) {
                this.$messageTitle('请输入触发利差比', 'error');
                return
              }
              break
            case 'singleMaxPercent':
              if (!required_Name) {
                this.$messageTitle('请输入单手最大交易量', 'error');
                return
              }
              break
            case 'singleMinPercent':
              if (!required_Name) {
                this.$messageTitle('请输入单手最小交易量', 'error');
                return
              }
              break
            case 'balancePercent':
              if (!required_Name) {
                this.$messageTitle('请输入交易平衡', 'error');
                return
              }
              break
          }
        }
        let savaData = {}
        savaData.id = postDat.id;
        savaData.balancePercent = postDat.balancePercent;
        savaData.monitorId = postDat.monitorId;
        savaData.name = postDat.name;
        savaData.pricePercent = postDat.pricePercent;
        savaData.singleMaxPercent = postDat.singleMaxPercent;
        savaData.singleMinPercent = postDat.singleMinPercent;
        savaData.desc = postDat.desc;
        this.$postAxios.saveStrategy(savaData).then((res) => {
          if (res.data.code == 200) {
            savaData.id = res.data.data;// 保存新建返回的策略ID；
            this.refreshTable()// 刷新表格
            this.$messageTitle('设置保存成功', 'success');
            this.$store.dispatch('changePlan', savaData);
            this.disableType = false;
            return
          }
          this.$messageTitle(res.data.msg, 'error')
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
        })
      },
      refreshTable () { // 刷新方案表格
        this.$store.dispatch('seaveType', !this.$store.state.auto.seaveType)// 刷新表格
      },
      // 取消执行
      cancelRun () {
        this.$postAxios.cancelPlan({strategyId:this.setStrateg.id}).then((res) => {
          if (res.data.code == 200) {
            this.webVal.symbol = this.setStrateg.monitorId;
            this.webVal.event = 'unsubscribe';
            if (this.wsObj.readyState == 1) { // 1，链接成功。
              this.wsObj.send(JSON.stringify(this.webVal))
            }
            this.loadingType = true;
            this.disableType = false;
            this.$store.dispatch('playPlan', '');// 清空正在执行的策略
            this.refreshTable();
            this.$messageTitle('取消成功', 'success');
            return
          }
          this.$messageTitle(res.data.msg, 'error')
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
        })
      },
      //  执行策略
      carriedOut () {
        const auto_Id = this.playPlan.monitorId;// 自动交易方案Id;
        if (auto_Id) { // 如果有值，证明已经有方案执行。
          this.centerDialogVisible = true;
          return
        }
        this.runPlay()
      },
      // 有策略执行先取消/订阅
      deleBtn () {
        const auto_Id = this.playPlan.monitorId;// 自动交易方案Id;
        if (this.wsObj.readyState == 1) { // 1，链接成功。
          if (auto_Id) { // 如果有值，证明已经有方案执行。需要先取消webstorker；
            this.webVal.symbol = auto_Id
            this.webVal.event = 'unsubscribe'
            this.wsObj.send(JSON.stringify(this.webVal))
          }

          this.webVal.symbol = this.setStrateg.monitorId;
          this.webVal.event = 'subscribe'
          this.wsObj.send(JSON.stringify(this.webVal))
        }
        let plan = {}
        for (let v in this.setStrateg) { // 浅拷贝，不然 this.setStrateg值修改会自动改变存储的值
          plan[v] = this.setStrateg[v]
        }
        this.$store.dispatch('playPlan', plan);// 存储当前执行的策略
      },
      runPlay () { // 执行策略接口
        this.centerDialogVisible = false
        this.$postAxios.playPlan({strategyId: this.setStrateg.id, strategyName: this.setStrateg.name}).then((res) => {
          if (res.data.code == 200) {
            this.deleBtn();
            this.refreshTable();

            this.loadingType = false;

            this.$messageTitle('执行成功', 'success');
            return
          }
          this.$messageTitle(res.data.msg, 'error')
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
        })
      },
      closeLaye () {
        this.centerDialogVisible = false
      },
      // 可供选择的策略方案
      selectPlan () {
          let data = {
              page:{
                  size:9999
              }
          };
        this.$postAxios.plan(data).then((res) => {
          if (res.data.code == 200) {
            this.$store.dispatch('myplan', res.data.data.records)
          }
        }).catch((err) => {
        })
      },
      querySearch (queryString, cb) {
        let restaurants = this.myPlan;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.desc.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        this.setStrateg.monitorId = item.id;// 只需要当前策略ID;
      }
    }
  }
</script>
