<template>
  <div style="min-height: 0.8rem">
    <ul class="currency-nav aside-nav" v-if="type==2">
      <template v-for="(item,index) in currencyList">
        <li  @click="searchGain(item)">
          {{ item.uniteSymbol}}
        </li>
      </template>
    </ul>
      <ul class="bazzer-nav aside-nav" v-else>
        <template v-for="(item,index) in currency">
          <li  @click="searchGain(item)">
            <img :src="item.src" class="logo-small">
            {{item.name}}
          </li>
        </template>
      </ul>
  </div>

</template>
<style scoped>
  .logo-small{
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.08rem;
    width: 0.24rem;
    height: 0.24rem;
  }
  .currency-nav>li,.bazzer-nav>li{
    cursor: pointer;
    display: inline-block;
    line-height: 0.36rem;
    height: 0.36rem;
  }
  .bazzer-nav>li{
    width: 33.333%;
    text-indent: 5%;
  }
  .currency-nav>li{
    width: 1.25rem;
    text-align: center;
  }

</style>
<script type="text/javascript">
  import searchBox from '@/components/module/searchbox'
export default {
    props: ['currency', 'type'], // type==1能交易所，type==2货币
    computed: {
      bazzerList () {
        return this.$store.state.bazzer
      },
        currencyList(){
          return this.currency
        }
    },
    methods: {
      searchGain (data) { // 搜索选择的值
        switch (this.type) {
          case '1':
            this.$router.push({name: 'worldmarket', query: {bazzerObj: data}})// 给国际市场发送选择的市场
            this.$store.dispatch('navType', '3')
            break
          case '2':
            for (let v of this.bazzerList) {
              if (v.id == data.siteId) { // 先查看推荐的交易所。
                this.$store.dispatch('selectBazzer', v);// 存储选中市场
                this.$store.dispatch('selectCurrenty', data);
                break
              }
            }
            this.$router.push({name: 'spottrading'}) // 默认的币种
            this.$store.dispatch('navType', '1')
        }
      }
    }
  }
  </script>
