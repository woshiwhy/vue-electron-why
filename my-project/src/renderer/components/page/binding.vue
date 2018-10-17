<template>
  <el-container style="height: 100%">
      <div class="bind-box skin-bg">
          <div class="header-title">
            <span class=" title-name">{{$t("tip.tip12")}}</span>
          </div>
        <el-table class="table-list  lg-table bg-table" :data="seachData" stripe style="width: 100%">
          <el-table-column :label='$t("tableheder.bazaar")'>
            <template slot-scope="scope">
            <div slot="reference" class="bazzer-name">
              <img :src="scope.row.src" class="logo-small">
              {{scope.row.siteName}}
            </div>
            </template>
          </el-table-column>
          <el-table-column :label='$t("tableheder.key")'>
          <template slot-scope="scope">
          <div slot="reference">
           <span v-if="scope.row.id">{{scope.row.apiKey}}</span>
           <span v-else class="banckColr">{{$t("tip.tip13")}}</span>
          </div>
          </template>
          </el-table-column>
          <el-table-column :label='$t("tableheder.theKey")'>
            <template slot-scope="scope">
              <div slot="reference">
                <span v-if="scope.row.id">{{scope.row.secretKey}}</span>
                <span v-else class="banckColr">{{$t("tip.tip14")}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label='$t("tableheder.operation")'>
            <template slot-scope="scope">
              <i class="el-icon-edit set-btn change-btn" @click="handleOk(scope.row)"></i>
              <i class="el-icon-delete set-btn" :class="{'disabled-btn': !scope.row.id}" disabled="!scope.row.id"
                 @click="handledele(scope.$index, scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <layer-box v-if="centerDialogVisible" :width="'3rem'" @close="close" @confirm="deleBtn" :content="deleContent"></layer-box>
    <layerWright-box v-if="wirghtApk" :width="'4.5rem'" @close="close" @confirm="close" :changeObj="changeObj"></layerWright-box>
  </el-container>
</template>
<style>
.lg-table .el-table__body  .cell {
  height: 0.7rem!important;
  line-height: 0.7rem!important;
}
  .disabled-btn{
    color: #4e5b85!important;
    cursor: not-allowed!important;
  }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/scss/app";
  .bind-box{
    width: 100%;
  }
  .logo-small{
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.08rem;
    width: 0.24rem;
    height: 0.24rem;
  }
  .bazzer-name{
    min-width: 0.8rem;
    display:inline-block;
    text-align: left!important;
  }
  .header-title{
    padding: 0.15rem 0 0.2rem 0;
  }
  .bind-box .set-btn{
    font-size: 0.18rem;
    color: #0098ff;
    cursor: pointer;

  }
  .bind-box .change-btn{
   margin-right: 0.1rem;
  }
</style>
<script>
  import layerBox from '@/components/module/layer'
import layerWright from '@/components/module/layerinput'
export default {
    data () {
      return {
        seachData: [],
        delectObj: '', // 删除数据的下标
        centerDialogVisible: false,
        wirghtApk: false,
        deleContent: '清空密匙,该交易所将不可交易，是否删除？',
        changeObj: '',
        webVal: {
          'site': 'hub',
          'event': '',
          'channel': 'depth_monitor',
          'symbol': ''
        }
      }
    },
    computed: {
      playPlan () { // 正在执行的策略
        return this.$store.state.auto.playPlan
      },
      wsObj () {
        return this.$store.state.webSocket
      }
    },
    components: {
      'layer-box': layerBox,
      'layerWright-box': layerWright
    },
    created () {
      if (this.$store.state.bindApi.length) {
        this.seachData = this.$store.state.bindApi
        return
      }
      this.postApi()
  },
    methods: {
      postApi () {
        this.$postAxios.apiAxios().then((res) => {
          let data_Val = res.data
          if (data_Val.code == 200) {
            for (let v of data_Val.data) {
              const bazzer_Name = v.siteId;
              switch (bazzer_Name) {
                case '3':
                  this.$set(v, 'src', './static/img/bazzer/zb.png');
                  break;
                case '2':
                  this.$set(v, 'src', './static/img/bazzer/huobi.png');
                  break;
                case '4':
                  this.$set(v, 'src', './static/img/bazzer/hitbtc.png');
                  break;
                case '1':
                  this.$set(v, 'src', './static/img/bazzer/okex.png');
                  break
              }
            }
            this.$store.dispatch('bindApi', data_Val.data);
            this.seachData = data_Val.data
          }
        }).catch((res) => {})
      },
      handledele (index, item) { // 删除
        if (!item.id) { // 如果没有ID，则是没有数据禁止删除
          return
        }
        this.centerDialogVisible = true;
        this.delectObj = index
      },
        deleBtn () {
        let deleData = this.seachData[this.delectObj]; // 获取当前删除对象
        this.$postAxios.unbindAxios(deleData.siteId).then((ref) => {
          if (ref.data.code == 200) {
            this.$messageTitle('解绑成功', 'success');
            this.$balancePost({siteId: deleData.siteId}); // 更新资产
            this.$store.dispatch('bindApi', []);
            deleData.id = '';
            return
          }
          this.$messageTitle(ref.data.msg || '解绑失败', 'error')
        }).catch((ref) => {
          this.$messageTitle('网络错误，请稍后重试', 'error')
        })
        this.close()
      },
      close () {
        this.centerDialogVisible = false;
        this.wirghtApk = false
      },
      handleOk (item) { // 确认
        this.changeObj = item;// 传递当前编辑的对象。
        this.wirghtApk = true
      }
    }
  }
  </script>
