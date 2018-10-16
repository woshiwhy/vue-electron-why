<template>
  <div class="tasktop">
    <h3 class="title-name tasknav spoBot">{{$t("task.MyCredits")}}
      <span>{{taskData.myIntegral}}{{$t("task.credits")}}</span></h3>
    <!-- 任务中心模块 -->
    <div class="bsmarket taskbox">
      <!--<div>-->
      <!--<img :src="imgVal" class="">-->
      <!--</div>-->
      <div>
        <div class="taskh3 taskbas">
          <img src="../../../../../static/img/infor/basis.png" alt="">
          <div>
            <p>{{$t("task.Basic")}}</p>
            <span>{{$t("task.BasicTitle")}}</span>
          </div>
        </div>
        <el-row :gutter="15" class="taskCard">
          <el-col :span="8" v-for="(item, index) in sortBasic" :key="index" class="colCrad">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;" class="card">
                <p>{{item.planTitle}}</p>
                <span>{{item.boldRemind}}</span>
                <div class="bottom">
                  <span v-if="item.status == 1" class="carryout"
                        @click="singin(item.planType)">{{$t("task.completed")}}</span>
                  <span class="button undone" v-else @click="unDone(item.planType)">{{$t("task.doItnow")}}</span>
                </div>
                <div class="bor">
                  <p>{{$t("task.credits")}}</p>
                  <p>{{item.rewardValue}}</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="taskh3">
          <img src="../../../../../static/img/infor/invite.png" alt="">
          <div>
            <p>{{$t("task.inviteFriends")}}</p>
            <span>{{$t("task.inviteTitle")}}</span>
          </div>
        </div>
        <div style="margin-top: 15px;display: flex" class="ivitcode">
          <p class="border-Ipt"><input type="text" v-model="taskData.inviteUrl" id="text"></p>
          <el-button type="primary" size="medium" class="oncopy" @click="onCopy()">
            {{$t("task.copyLink")}}
          </el-button>
          <el-button size="medium" plain class="generate" @click="showImg()">{{viewQRcode}}</el-button>
        </div>

        <div class="taskh3 taskbtom">

          <p>{{$t("task.record")}}</p>
        </div>
        <div class="friends">
          <div><p style="margin-right: 24px">{{$t("task.Firstlevel")}}：<span>{{taskData.firstLevelInviteNum}}</span></p>
            <p>{{$t("task.Secondary")}}：<span>{{taskData.secondLevelInviteNum}}</span></p>
          </div>
          <el-card shadow="always" class="myrecord">
            <p style="text-align: center;"> {{$t("task.obtion")}}</p>
            <p style="text-align: center;"><span>{{taskData.inviteIntegral}}</span></p>
          </el-card>
        </div>
        <div class="taskh3 taskbtom">
          <p>{{$t("task.rule")}}</p>
        </div>
        <ul v-for="(item,index) in ivintData" class="invitLi">
          <li v-text="item.title"></li>
        </ul>
      </div>
    </div>
    <el-dialog
            class="center-dialog poster"
            :visible.sync="qrcode"
            width="30%"
            height="100%"
            top="0vh"
            center>
      <div class="imgBox" v-loading="loadingImg" element-loading-text="海报拼命加载中">
        <a :href="imgVal" download v-if="loadingImg == false">
          <el-tooltip class="item" effect="light" content="点击下载海报" placement="left">
            <img :src="imgVal" alt="">
          </el-tooltip>
        </a>
      </div>
    </el-dialog>
    <singIn-box v-if="singInVisible" :active="active" :singinTitle="singinTitle"
                @closeSingin="closeSingin"></singIn-box>
    <mailMound-box v-if="emailVisible" @closeEmail="closeEmail"></mailMound-box>
    <PhoneMound-box v-if="phoneVisible" @closePhone="closePhone"></PhoneMound-box>
  </div>
</template>
<style scoped>
  .tasktop {
    margin-top: 0.15rem;
  }

  .title {
    text-align: center;
    margin-bottom: 0.3rem;
    margin-top: -0.2rem
  }

  .tasknav {
    width: 2.2rem;
    height: .40rem;
    padding-left: 0;
    line-height: .4rem;
    border-radius: .03rem;
    margin-left: .29rem;
    display: flex;
    justify-content: space-around;
  }

  .imgBox {
    min-height: 8rem;
  }

  .taskh3 {
    display: flex;
    height: .48rem;
    width: 100%;
    line-height: .48rem;
    margin-bottom: .24rem;
    margin-top: .5rem;
  }

  .taskCard {
    max-width: 10.8rem;
    margin-right: .1rem !important;
  }

  .card {
    position: relative;
  }

  .colCrad {
    max-width: 3.6rem;
    min-width: 2.78rem;
    margin-bottom: .1rem;
  }

  .card p, .taskh3 div p {
    margin-bottom: .05rem;
  }

  .taskh3 div {
    margin-left: .1rem;
    height: .38rem;
    line-height: .38rem;
  }

  .taskh3 div p, .card p {
    height: .15rem;
    font-size: .14rem;
  }

  .taskh3 div span, .card span {
    font-size: .12rem;
  }

  .taskbox {
    padding-left: .3rem;
  }

  .bottom {
    margin-top: .2rem;
  }

  .bottom .el-button {
    padding: .1rem .08rem;
  }

  .bottom span {
    height: .12rem;
    font-size: .12rem;
    line-height: .2rem;
    padding: .04rem .12rem;
    border-radius: 5rem;
  }

  .bor {
    width: .65rem;
    height: .65rem;
    border-radius: 50%;
    position: absolute;
    right: .15rem;
    top: 0.2rem;
    text-align: center;
    line-height: .5rem
  }

  .invitLi li {
    line-height: .36rem;
    height: .36rem;
  }

  .border-Ipt {
    text-align: center;
    line-height: .3976rem;
    border-top-left-radius: .05rem;
    border-bottom-left-radius: .05rem;
    width: 4.4rem;
    min-width: 4.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .border-Ipt input {
    width: 100%;
    padding: 0 .1rem;
    outline: none;
    border: none;
  }

  .myrecord {
    height: .7rem;
    width: 1.58rem;
    margin-top: .18rem;
  }

  .myrecord .el-card__body {
    padding: .15rem;
    width: 1.57rem;
    height: .7rem;
  }

  .taskbtom {
    margin-top: .24rem;
    margin-bottom: 0;
  }

  .taskbas {
    margin-top: .24rem;
  }

  .oncopy {
    margin-left: .1rem;
    margin-right: .1rem;
  }

  .friends > div {
    display: flex;
  }

  .undone {
    cursor: pointer;
  }
</style>
<script>
  import mailMound from "@/components/page/personalcenter/maillayer";
  import PhoneMound from "@/components/page/personalcenter/phonelayer";
  import singIn from "@/components/page/personalcenter/singin";

  export default {
    components: {
      'mailMound-box': mailMound,
      'PhoneMound-box': PhoneMound,
      'singIn-box': singIn
    },
    props: [ 'qrCode', 'imgUrl'],
    data() {
      return {
        imgVal: '',
        emailVisible: false,
        phoneVisible: false,
        qrcode: false,
        loadingImg: false,
        singInVisible: false,
        singinTitle: '',
        active: 0,
      }
    },
    computed: {
        basicData(){ //基本任务
            return this.$store.state.userTasks;
        },
        taskData(){ //用户积分
            return this.$store.state.integral;
        },
      sortBasic() {
        return this.sortByKey(this.basicData, 'status');
      },
      ivintData() {
        let ivintMl = [
          {title: this.$t('task.rule1')},
          {title: this.$t('task.rule2')},
          {title: this.$t('task.rule3')}
        ];
        return ivintMl
      },
      viewQRcode() {
        return this.$t('task.viewQRcode')
      },
    },
    updated() {
      this.coedeBg()
    },
    methods: {
      coedeBg() {  //  带海报的二维码
        let canvas = document.createElement("canvas");
        let codeImg = new Image();
        let imgBg = new Image();
        codeImg.setAttribute("crossOrigin", 'anonymous');  // 跨域请求图片
        imgBg.src = "./static/img/ceshi.jpg";
        codeImg.onload = () => {
          canvas.width = 350;
          canvas.height = 800;
          var canvasBox = canvas.getContext("2d");

          canvasBox.drawImage(imgBg, 0, 0, 350, 800); //绘制图像进行拉伸

          canvasBox.drawImage(codeImg, 137, 670, 80, 80);
          var dataURL = canvas.toDataURL('image/png');
          this.imgVal = dataURL;
        }
        codeImg.src = this.imgUrl;
      },
      //显示海报
      showImg() {
        this.qrcode = true;
        (this.imgVal != '' && this.imgUrl != '') ? this.loadingImg = false : this.loadingImg = true;
      },
      //对基本任务完成度排序:
      sortByKey(array, key) {
          if(array.length != 0){
              return array.sort(function (a, b) {
                  var x = a[key];
                  var y = b[key];
                  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
              });
          }
      },
      onCopy() {
        let input = document.getElementById("text");
        input.value = this.taskData.inviteUrl; // 修改文本框的内容
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        this.$messageTitle('复制成功', "success")
      },
      unDone(index) {
        switch (index) {
          case 'SINGLE_PHONE_PERFECT':
            this.phoneVisible = true
            break;
          case 'SINGLE_EMAIL_PERFECT':
            this.emailVisible = true
            break;
          case 'DAILY_SIGN':
            this.userSign();
            break;

        }
      }
      ,
      //  关闭邮箱
      closeEmail(idx) {
        if (idx == 1) {
          for (var i = 0; i < this.basicData.length; i++) {
            if (this.basicData[i].planType == "SINGLE_EMAIL_PERFECT") {
              this.basicData[i].status = 1;
              this.taskData.myIntegral += Number(this.basicData[i].rewardValue)
            }
          }
        }
        this.emailVisible = false
      }
      ,
      //  关闭手机号
      closePhone(idx) {
        if (idx == 1) {
          for (var i = 0; i < this.basicData.length; i++) {
            if (this.basicData[i].planType == "SINGLE_PHONE_PERFECT") {
              this.basicData[i].status = 1;
              this.taskData.myIntegral += Number(this.basicData[i].rewardValue)
            }
          }
        }
        this.phoneVisible = false
      },
      signInfo() { //获取本周签到记录
        this.$loginAjax.signInfo({}).then((res) => {
          if (res.data.code == 200) {
            this.active = res.data.data
            this.singinTitle = '已连续签到' + this.active + '天';
            this.singInVisible = true;
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //  用户每日签到
      userSign() {
        this.$loginAjax.userSign({}).then((res) => {
          if (res.data.code == 200) {
            this.$messageTitle(res.data.msg, "success")
            for (var i = 0; i < this.basicData.length; i++) {
              if (this.basicData[i].planType == "DAILY_SIGN") {
                this.basicData[i].status = 1;
                this.taskData.myIntegral += Number(this.basicData[i].rewardValue);
                this.signInfo();
                this.singInVisible = true;
              }
            }
          }
          else {
            this.$messageTitle(res.data.msg, "error")
          }
        }).catch((err) => {
          this.$messageTitle('网络错误请稍后重试', "error")
        })
      },
      singin(status) {
        if (status == 'DAILY_SIGN') {
          this.signInfo()
        }
      },
      close() { //关闭
        this.singInVisible = false;
      },
      closeSingin() {
        this.singInVisible = false;
      }
    },
  }
</script>
