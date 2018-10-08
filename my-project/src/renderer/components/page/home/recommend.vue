<template>
  <div class="small-box skin-bg" style="margin-bottom: 0">
    <div style="margin-bottom: 0.1rem">
      <h3 class="title-name">{{$t("headline.innovate")}}</h3>
      <currencyName-box :type="'2'" :currency="recommendCurrent.innovate"></currencyName-box>
    </div>
    <h3 class="title-name">{{$t("headline.potential")}}</h3>
    <currencyName-box :type="'2'" :currency="recommendCurrent.potential"></currencyName-box>
  </div>
</template>
<script>
  import CurrencyName from '@/components/page/home/currencyname'
export default {
    data () {
      return {
        searchShow: false
      }
    },
    components: {
      'currencyName-box': CurrencyName
    },
    computed: {
      recommendCurrent () { // 推荐的币种
        return this.$store.state.home.recommendCurrent
      }
    },
    created () {
      if (this.recommendCurrent.length == 0) {
        this.currenty()
      }
    },
    methods: {
      currenty () {
        this.$postAxios.recommendCurrenty({size: '6'}).then((res) => {
          const data_Obj = res.data
          if (data_Obj.code == 200) {
            // 创新推荐innovate
            // 潜力推荐potential
            this.$store.dispatch('recommendCurrent', data_Obj.data)
          }
        }).catch((res) => {
        })
      }
    }

  }
</script>
