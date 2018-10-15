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
        searchShow: false,
          dataPost:{
              eq:{type:''},
              size:6
          }
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
      if (!this.recommendCurrent.innovate) {

          this.innovate()
      }
        if (!this.recommendCurrent.potential ) {
            this.potential()
        }
    },
    methods: {
        innovate(){
            this.dataPost.eq.type='0003-0001';//创新推荐
            this.currenty('innovate');
        },
        potential(){
            this.dataPost.eq.type='0003-0002';//潜力 推荐
            this.currenty('potential');
        },
      currenty (type) {
        this.$postAxios.recommendCurrenty(this.dataPost).then((res) => {
          const data_Obj = res.data;
          if (data_Obj.code == 200) {
            // 创新推荐innovate
            // 潜力推荐potential
               this.recommendCurrent[type]=data_Obj.data.records;

            this.$store.dispatch('recommendCurrent', this.recommendCurrent)
          }
        }).catch((res) => {
        })
      }
    }

  }
</script>
