<template>
  <div class="small-box skin-bg">
    <ul class="tabcat-box skin-childer-nav">
      <template v-for="(item,index) in tabNav">
        <li :class="{'active':item.active}" @click="navClick(item.href,index)">{{item.name}}</li>
      </template>
    </ul>
    <router-view/>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .tabcat-box {
    padding-left: 0.15rem;
    margin-bottom: 0.2rem;
  }

  .tabcat-box > li {
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
        outIdex: '',
        outhref: '',
        index: 0
      }
  },
    computed: {
      tabNav () {
        let navList = [
          {name: this.$t('headline.myPlan'), href: '/myplan', active: false},
          // {name: '购买历史', href: '/byhistory', active: false},
          {name: this.$t('headline.runHistory'), href: '/executehistory', active: false}
        ]
        navList[this.index].active = true
        return navList
      }
    },
    methods: {
      navClick (href, index) {
        this.index = index
        for (let val of this.tabNav) {
          val.active = false
        };
        this.tabNav[index].active = true
        this.$router.push(href)
      }
    }
  }
</script>
