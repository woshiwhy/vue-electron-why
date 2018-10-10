<template>
  <div id="mytitle" class="skin-bg">
    <div  class="navList-box">
      <ul>
        <li :class="[{'active':item.type},item.type?item.activebg:item.class]"
            v-for="(item,index) in navList" @click="navClick(item.href,index)" :key="index">
          {{item.name}}
        </li>

      </ul>
    </div>
    <div class="pull-right maxmin-box">
      <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link hoverbtn setClr-btn"></span>
        <el-dropdown-menu slot="dropdown" style=" -webkit-app-region: no-drag;">
          <el-dropdown-item command="theme">主题设置</el-dropdown-item>
          <el-dropdown-item command="lang">语言设置</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <span class="hoverbtn min-btn" @click="maxMin(1)"></span>
      <span class="hoverbtn max-btn" @click="maxMin(2)" v-if="smallType"></span>
      <span class="hoverbtn back-btn" @click="maxMin(3)" v-else></span>
      <span class="hoverbtn close-btn" @click="maxMin(4)"></span>
    </div>
    <setClr-Box v-if="setClrBox" @langchat="langchat"  @closeBox="closeBox" :boxObj="boxObj"></setClr-Box>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/scss/app";

  #mytitle {
    width: 100%;
    height: 1.04rem;
    -webkit-app-region: drag;
    position: relative;
    box-shadow: 0px 0px 15px 0px rgba(12, 12, 12, 0.08);

    background-repeat: no-repeat;
    background-size: 2rem;
    background-position-y: center ;
    background-position-x: 0.3rem ;
  }

  .maxmin-box {
    position: absolute;
    top: 0;
    right: 0.09rem;
    -webkit-app-region: no-drag;
    span {
      display: inline-block;
      height: 0.25rem;
      width: 0.25rem;
      background-position: center;
      background-size: 60%;
      background-repeat: no-repeat;
      text-align: center;
      margin-top: .1rem;
    }
  }

  .hoverbtn {
    width: .20rem;
    height: .20rem;
  }

  .navList-box {

    margin-left: 4.2rem;
  }
  .navList-box>ul{
    -webkit-app-region: no-drag;
    display: inline-block;
  }
  .navList-box li {
    cursor: pointer;
    width: 1.2rem;
    height: 1.04rem;
    line-height: 1.4rem;
    text-align: center;
    display: inline-block;
    font-size: 0.16rem;
    background-size: 0.27rem;
    background-position: center 0.27rem;
    background-repeat: no-repeat;
  }

  .skin-one {
    .hoverbtn:hover {
      background-color: #262a4a;
    }
    .setClr-btn {
      background-image: url("../../../static/img/shezhi_white.svg");
    }
    .min-btn {
      background-image: url("../../../static/img/sx_white.svg");
    }
    .max-btn {
      background-image: url("../../../static/img/sf_white-01.svg");
    }

    .back-btn {
      background-image: url("../../../static/img/sx2_white.svg");
    }

    .close-btn {
      background-image: url("../../../static/img/gb_white.svg");
    }
    .personal-bg, .personal-active {
      background-size: 0.22rem !important;
      @include personal-active;
    }
    .home-bg, .home-active {
      @include home-active
    }
    .xianhuo-bg, .xianhuo-active {
      @include xianhuo-active;
    }
    .zidong-bg, .zidong-active {
      @include zidong-active;
    }
    .guoji-bg, .guoji-active {
      @include guoji-active;
    }
    .shouquan-bg, .shouquan-active {
      background-size: 0.28rem !important;
      @include shouquan-active;
    }
    .zhsz-bg, .zhsz-active {
      @include zhsz-active;
    }

  }

  .default-skin {
    .hoverbtn:hover {
      background-color: #e4e7ed;
    }
    .setClr-btn {
      background-image: url("../../../static/img/shezhi.svg");
    }
    .min-btn {
      background-image: url("../../../static/img/sx.svg");
    }
    .max-btn {
      background-image: url("../../../static/img/sf.svg");
    }

    .back-btn {
      background-image: url("../../../static/img/sf2.svg");
    }

    .close-btn {
      background-image: url("../../../static/img/gb.svg");
    }
    .personal-bg {
      background-size: 0.22rem !important;
      @include personal-bg;
    }

    .personal-bg:hover, .personal-active {
      background-size: 0.22rem !important;
      @include personal-active
    }

    .home-bg {
      @include home-bg;
    }

    .home-bg:hover, .home-active {
      @include home-active
    }

    .xianhuo-bg {
      @include xianhuo-bg
    }

    .xianhuo-bg:hover, .xianhuo-active {
      @include xianhuo-active;
    }

    .zidong-bg {
      @include zidong-bg;
    }

    .zidong-bg:hover, .zidong-active {
      @include zidong-active;
    }

    .guoji-bg {
      @include guoji-bg;
    }

    .guoji-bg:hover, .guoji-active {
      @include guoji-active;
    }

    .shouquan-bg {
      background-size: 0.28rem !important;
      @include shouquan-bg;
    }

    .shouquan-bg:hover, .shouquan-active {
      background-size: 0.28rem !important;
      @include shouquan-active;
    }

    .zhsz-bg {
      @include zhsz-bg;
    }

    .zhsz-bg:hover, .zhsz-active {
      @include zhsz-active;
    }

    .mored-bg {
      @include mored-bg;
    }

    .mored-bg:hover, .mored-active {
      @include mored-active;
    }
  }


</style>

<script type="text/javascript">
  import setClr from '@/components/module/setClr'
  export default {
    props: ['destroy'], // resizable禁止缩放
    components: {
      'setClr-Box': setClr
    },
    data () {
      return {
          boxObj:{
            title:'设置',
              radioArry:[],
          },
        languageType: 'cn',
        smallType: true,
        setClrBox: false,
        navList: [
          {
            name: this.$t('navName.home'),
            href: '/home',
            class: 'home-bg',
            type: false,
            activebg: 'home-active'
          },
          {
            name: this.$t('navName.spot'),
            href: '/spottrading',
            class: 'xianhuo-bg',
            type: false,
            activebg: 'xianhuo-active'
          },
          {
            name: this.$t('navName.auto'),
            href: '/outotrade',
            class: 'zidong-bg',
            type: false,
            activebg: 'zidong-active'
          },
          {
            name: this.$t('navName.international'),
            href: '/worldmarket',
            class: 'guoji-bg',
            type: false,
            activebg: 'guoji-active'
          },
          {
            name: this.$t('navName.binding'),
            href: '/binding',
            class: 'shouquan-bg',
            type: false,
            activebg: 'shouquan-active'
          },
          {
            name: this.$t('navName.account'),
            href: '/accountset',
            class: 'personal-bg',
            type: false,
            activebg: 'personal-active'
          }
        //              {name:'更多',href:'/',active:false,class:'mored-bg',activebg:'mored-active'}
        ]
      }
    },
    computed: {
      navActive () {
        return [
          {
            name: this.$t('navName.home'),
            href: '/home',
            class: 'home-bg',
            type: false,
            activebg: 'home-active'
          },
          {
            name: this.$t('navName.spot'),
            href: '/spottrading',
            class: 'xianhuo-bg',
            type: false,
            activebg: 'xianhuo-active'
          },
          {
            name: this.$t('navName.auto'),
            href: '/outotrade',
            class: 'zidong-bg',
            type: false,
            activebg: 'zidong-active'
          },
          {
            name: this.$t('navName.international'),
            href: '/worldmarket',
            class: 'guoji-bg',
            type: false,
            activebg: 'guoji-active'
          },
          {
            name: this.$t('navName.binding'),
            href: '/binding',
            class: 'shouquan-bg',
            type: false,
            activebg: 'shouquan-active'
          },
          {
            name: this.$t('navName.account'),
            href: '/accountset',
            class: 'personal-bg',
            type: false,
            activebg: 'personal-active'
          }
        //              {name:'更多',href:'/',active:false,class:'mored-bg',activebg:'mored-active'}
        ]
      },
      skinType () { // 皮肤状态
        return this.$store.state.skinType
      },
      navType22 () { // 导航状态
        return this.$store.state.navType
      }

    },
    watch: {
      navType22 (n, o) {
        this.navChange(this.navList)
      },
      navActive (n, o) {
        this.navList = this.navChange(n)
      },
      skinType (n, o) {
        this.skinChange(n) // 改变皮肤
      }
    },
    created () { //  初始化检查默认语言设置
      let language = localStorage.getItem('languageType')
      this.langchat(language)
    },
    mounted () {
      this.$store.dispatch('navType', sessionStorage.getItem('navType') || 0)
    },
    methods: {
        handleCommand(type){
            this.boxObj.type=type;
            switch (type){
                case 'theme':
                    this.boxObj.title='主题设置';
                    this.boxObj.radioArry=[
                        {
                            name:"白色",
                            val:0
                        },
                        {
                            name:'黑色',
                            val:1
                        }
                    ];
                   break
                case 'lang':
                    this.boxObj.title='语言选择';
                    this.boxObj.radioArry=[
                        {
                            name:this.$t('lang.cng'),
                            val:'cn'
                        },
                        {
                            name:this.$t('lang.eng'),
                            val:"en"
                        }
                    ];
                    break

            }
            this.setClrBox = true
        },
      langchat (language) {
        if (language == 'en') {
          this.$i18n.locale = 'en';
          this.languageType = 'en';
          return
        }
        this.languageType = 'en';
        this.$i18n.locale = 'cn'
      },
      skinChange (type) {
        let Obj = document.getElementById('change-skin');
        if (type == 1) { // 1是黑色
          Obj.classList.remove('default-skin');
          Obj.classList.add('skin-one');
          return
        }
        Obj.classList.remove('skin-one');
        Obj.classList.add('default-skin')
      },
      // 关闭弹出框
      closeBox () {
        this.setClrBox = false
      },
      navClick (href, index) {
        this.$router.push(href);
        this.$store.dispatch('navType', index)
      },
      navChange (Obj) {
        for (let val of Obj) {
          val.type = false
        }
        Obj[this.navType22].type = true;
        return Obj
      },
      maxMin (type) { // 1是最小，2是全屏，3是还原，4是关闭
        if (window.require) {
          const ipc = window.require('electron').ipcRenderer;
          if (type == 2) {
            this.smallType = false
          } else if (type == 3) {
            this.smallType = true
          }
          ipc.send('maxmin', type)
        }
      }
    }
  }
</script>
