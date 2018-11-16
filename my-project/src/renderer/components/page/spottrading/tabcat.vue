<template>
<div>
  <ul class="tabcat-box skin-childer-nav">
    <template v-for="(item,index) in tabNav">
      <li :class="{'active':item.active}" @click="navClick(item.href,index)">{{item.name}}</li>
    </template>
  </ul>
  <router-view />
</div>

</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/app";
  .tabcat-box{
    margin-bottom: 0.2rem;
  }
  .tabcat-box>li{
    display: inline-block;
    width: 1.35rem;
    padding: 0;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    font-size: 0.16rem;
    margin-right: 0.1rem;
    cursor: pointer;
  }

</style>
<script>
  export default {
    data () {
      return {
        index: 0
      }
    },
    computed: {
      tabNav () {
        let navList = [{name: this.$t('tabname.kGraph'), href: '/Ktable', active: false}, {name: this.$t('tabname.entry'), href: '/putup', active: false},
          {name: this.$t('tabname.depth'), href: '/deepness', active: false}, {name: this.$t('tabname.history'), href: '/history', active: false}]
        navList[this.index].active = true;
        return navList
      }
    },
    methods: {
      navClick (href, index) {
        this.index = index;
        for (let val of this.tabNav) {
          val.active = false
        }
        this.tabNav[index].active = true;
        this.$router.push(href)
      }
    }
  }
</script>
