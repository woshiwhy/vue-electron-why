<template>
  <el-select class="sel-lang"  v-model="value"  size="mini" @change="change" :placeholder="this.$t('btnname.language')">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
  export default {
    data () {
      return {
        options: [{
          value: 'cn',
          label: this.$t('lang.cng')
        }, {
          value: 'en',
          label: this.$t('lang.eng')
        }],
        value: localStorage.getItem('languageType') || 'cn'
      }
    },
    methods: {
      change (val) {
        localStorage.setItem('languageType', val)
        this.$emit('langchat', val)
      }
    }
  }
</script>
<style>
  .el-scrollbar__view{
    -webkit-app-region: no-drag;
  }
  .sel-lang{
    top: -0.07rem;
    width: 0.5rem;

  }
  .sel-lang input{
    border: none;
    padding:0 !important;
    text-align: center;
  }

  .sel-lang span{
   display: none!important;
  }
</style>
