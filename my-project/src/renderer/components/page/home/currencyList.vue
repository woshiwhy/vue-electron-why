<template>
  <div class="small-box skin-bg">
    <h3 class="title-name">{{$t("headline.query")}}</h3>
    <!--<div class="rapid-search">-->
      <!--<search-Box v-if="searchShow" :type="'bazzer'" class="rapid-box" @searchData="searchGain"></search-Box>-->
      <!--<i v-else class="el-icon-search" @click="openSearch"></i>-->
    <!--</div>-->
    <currencyName-box :currency="bazzerList" :type="'1'"></currencyName-box>
  </div>
</template>
<style>
  .rapid-search input{
    height: 0.28rem;
  }
  .rapid-search .el-input__icon{
    line-height: 0.28rem;
    font-size: 0.16rem;
  }
</style>
<style scoped>
  .rapid-search{
    position: absolute;
    top:0.15rem;
    right: 0.2rem;
  }
  .rapid-search>i{
    cursor: pointer;
    font-size: 0.18rem;
  }
.rapid-search .el-input__inner{
  border-radius: .16rem;
}
</style>
<script type="text/javascript">
  import searchBox from '@/components/module/searchbox'
import CurrencyName from '@/components/page/home/currencyname'
export default {
    data () {
      return {
        searchShow: false,
        bazzer: []
      }
    },
    components: {
//      'search-Box': searchBox,
      'currencyName-box': CurrencyName
    },
    computed: {
      bazzerList () {
        let bazzer_List = this.$store.state.bazzer
        for (let v of bazzer_List) {
          const bazzer_Name = v.sysMark
          // 图片logo写死
          switch (bazzer_Name) {
            case 'zb':
              this.$set(v, 'src', './static/img/bazzer/zb.png')
              break
            case 'huobi':
              this.$set(v, 'src', './static/img/bazzer/huobi.png')
              break
            case 'hitbtc':
              this.$set(v, 'src', './static/img/bazzer/hitbtc.png')
              break
            case 'okex':
              this.$set(v, 'src', './static/img/bazzer/okex.png')
              break
          }
        }

        return bazzer_List
      }
    },
    watch: {
      bazzerList (n, o) {
        this.bazzer = n
        this.storageList()
      }
    },
    created () {
      this.storageList()
  },
    methods: {
      storageList () {
        let valueLocal = localStorage.getItem('bazzerList')
        if (valueLocal == null && this.bazzerList.length != 0) { // 如果没有存储，AJAX请求
          localStorage.setItem('bazzerList', JSON.stringify(this.bazzer))
          return
        }
        this.bazzer = JSON.parse(valueLocal) // 有就取存储的值
      },
      searchGain (data) { // 搜索选择的值
        let bazzer_List = []
        this.$router.push({name: 'worldmarket', query: {bazzerObj: data}})// 给国际市场发送选择的货币
        this.$store.dispatch('navType', '3')
        for (let valName of this.bazzer) {
          bazzer_List.push(valName) // 浅拷贝，
          if (valName.name == data.name) { // 如果列表已经有了就不进行操作
            return
          }
        }
        this.bazzer_List.pop()// 删除货币列表最后一个货币
        this.bazzer_List.unshift(data)// 删除货币列表最后一个货币
        this.bazzer = bazzer_List
        localStorage.setItem('bazzerList', JSON.stringify(bazzer_List))// 存储
      },
      openSearch () { // 打开搜索框
        this.searchShow = true
      }
    }
  }
</script>
