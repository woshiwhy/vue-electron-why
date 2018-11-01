<template>
   <div>
      <!--//交易市场-->
     <el-autocomplete
       v-if="type"
       class="inline-input"
       v-model="state1"
       :fetch-suggestions="querySearch"
       :placeholder="seachData.placeholder"
       @select="handleSelect"
       suffix-icon="el-icon-search"
       value-key="name"
     >
     </el-autocomplete>
     <!--//货币-->
     <el-autocomplete
        v-else
       class="inline-input"
       v-model="state1"
       :fetch-suggestions="querySearch"
       :placeholder="seachData.placeholder"
       @select="handleSelect"
        @blur="handleBlur"
       suffix-icon="el-icon-search"
       value-key="uniteSymbol"
     >
     </el-autocomplete>
   </div>

</template>
<script>
  export default {
    props: ['type'], // bazzer,交易所搜索框，currenty||''货币搜索框
    data () {
      return {
        state1: ''
      }
  },
    computed: {
      seachData () {
        if (this.type == 'bazzer') {
          return {
            placeholder: this.$t('placeholder.seekBazzer'),
            val: this.$store.state.bazzer,
            key: 'uniteSymbol'
          }
        }
        return {
          placeholder: this.$t('placeholder.currencyName'),
          val: this.$store.state.currenty,
          key: 'name'
        }
      },
      selectBazzer () { // 选择的市场
        return this.$store.state.sopttrading.selectBazzer
      },
      selectCurrenty () {
        return this.$store.state.sopttrading.selectCurrenty
      },
        worldActive () { // 国际行情选中的市场
            return this.$store.state.world.activeBazzer.sysMark
        }
    },
    watch: {
        worldActive(){
            this.state1 = '';
        },
      selectBazzer () {
        this.state1 = ''
      },
      selectCurrenty (n, o) { //
        if (n.uniteSymbol != this.state1) {
          this.state1 = ''
        }
      }
    },
    methods: {
      querySearch (queryString, cb) {
        let restaurants = this.seachData.val;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (restaurant) => {
          if (this.type == 'bazzer') {
            return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
          }
          return (restaurant.uniteSymbol.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        this.$emit('searchData', item)
      },
      handleBlur (item) {
        this.$emit('blurData', item)
      }
    }
  }
</script>

