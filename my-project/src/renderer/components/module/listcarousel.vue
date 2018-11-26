<template>
    <ul  ref="box"   @mouseleave="Up()" class="stope-anmion"  @mouseenter="clearInterval()">
      <li class="ellipsis-2 hove-list"   v-for='(item,index) in items' :key="index" @click="openWind(item)">{{item.title}}</li>
    </ul>
</template>
<style scoped>
  ::-webkit-scrollbar
  {
    width: 0;
    height: 0;
  }
  .stope-anmion{
    height:100%;
    overflow: auto;
  }
  .hove-list:hover{
    color: #0098ff;
  }
  .stope-anmion li{
    cursor: pointer;
    line-height: 0.24rem;
    margin-bottom: 0.28rem;
    font-size: 0.14rem;
    text-align: justify;
  }

</style>
<script>
  export default {
    props: ['items'],
    data () {
      return {
        setTimeObj: '',
        time: '50'
      }
    },
    mounted () {
      this.Up()
  },
    beforeDestroy () {
      this.clearInterval()
    },
    methods: {
      ScrollUp () {
        let boxObj = this.$refs.box;
        if (boxObj.scrollTop + boxObj.clientHeight >= boxObj.scrollHeight) {
          boxObj.scrollTop = 0
        } else {
          boxObj.scrollTop++
        }
      },
      Up () {
        this.setTimeObj = setInterval(() => {
          this.ScrollUp()
        }, this.time)
      },
      clearInterval () {
        clearInterval(this.setTimeObj)
      },
      openWind (data) {
        if (window.require) {
          const {shell} = window.require('electron').remote;
            shell.openExternal(data.links+'?id='+data.id)
        }
      }

    }
  }
</script>
