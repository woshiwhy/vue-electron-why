<template>
  <el-main>
    <div class="small-box skin-bg">
      <div style="margin-bottom: 0.2rem">
        <h3 class="title-name spoBot">{{$t("headline.market")}}</h3>
        <nav-box :navType="'bazzer'"></nav-box>
      </div>
      <div style="position: relative">
        <h3 class="title-name spoBot">{{$t("headline.comparison")}}</h3>
        <currenty-box :navType="'currer'" :searchVal="searchVal"></currenty-box>
        <search-Box class="search-box"    @searchData="searchData"></search-Box>
      </div>
    </div>
    <div class="small-box skin-bg bottom-box">
      <tabcat-box style=" padding: 0 0.15rem;"></tabcat-box>
    </div>
  </el-main>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/scss/app";
  .search-box{
    position: absolute;
    top: -0.07rem;
    right: 0.2rem;
    width: 2.23rem;
    height: 0.34rem;
  }
  .bottom-box{
    min-height: -moz-calc(100% - 2rem);
    min-height: -webkit-calc(100% - 2rem);
    min-height: calc(100% - 2rem);
  }
</style>
<script>
  import ChilderNav from '&/bazzernav'
import currentynavBox from '&/currentynav'
import searchBox from '&/searchbox'
import TabCat from '~/spottrading/tabcat'
export default {
    data () {
      return {
        searchVal: ''
      }
    },
    components: {
      'nav-box': ChilderNav,
      'currenty-box': currentynavBox,
      'search-Box': searchBox,
      'tabcat-box': TabCat
    },
    methods: {
      searchData (data) {
        this.searchVal = data;
        this.$store.dispatch('selectCurrenty', data)
      }
    }
  }
</script>
