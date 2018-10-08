<template>
  <div class="soller-box" >
    <i class="el-icon-arrow-left" @click="sollerLeft"></i>
    <el-menu   ref="sollerBox" :default-active="bazzerActive" active-text-color="#0098ff" mode="horizontal" class="soller-nav">
      <template  v-for="(item,index) in bazzerList">
        <el-menu-item  :index="item.id" @click="navselect(item)">{{item.name}}</el-menu-item>
      </template>
    </el-menu>

    <i class="el-icon-arrow-right" @click="sollerRight"></i>
  </div>
</template>

<script>
  export default {
    props: ['navType'], // navType导航类型，1：交易市场导航，2：货币导航，3：国际行情导航。
    computed: {
      bazzerActive () {
        return this.$store.state.sopttrading.selectBazzer.id
      },
      bazzerList () {
        return this.$store.state.bazzer
      }
    },
    watch: {
      bazzerList (n, o) {
        this.defaultActive()
      }
    },
    beforeDestroy () { // 组件销毁前清空值。
      this.$store.dispatch('selectBazzer', '')
  },
    created () {
      if (this.bazzerList.length != 0) {
        this.defaultActive()
      }
    },
    methods: {
      defaultActive () {
        if (this.bazzerActive) { // vuex存值就不再取值,
          return
        }
        const local_Obj = localStorage.getItem('defaultMarket')
        if (local_Obj != 'undefined' && local_Obj) { // 查看是否存储默认市场
          this.$store.dispatch('selectBazzer', JSON.parse(local_Obj))// vux存储默认市场
          return
        }
        if (this.$store.state.bazzer[0]) {
          localStorage.setItem('defaultMarket', JSON.stringify(this.$store.state.bazzer[0]))// 如果没设置，默认第一个为默认市场
          this.$store.dispatch('selectBazzer', this.$store.state.bazzer[0])// vux存储默认市场
        }
      },
      sollerLeft () {
        this.sollerNumber('left')
      },
      sollerRight () {
        this.sollerNumber('right')
      },
      sollerNumber (type) {
        let sollerBox = this.$refs.sollerBox
        let sollerWidth = sollerBox.scrollWidth / this.bazzerList.length
        let number = 1
        let soller = setInterval(() => {
          number++
          if (type == 'left') {
            sollerBox.scrollLeft--
          } else {
            sollerBox.scrollLeft++
          }
          if (number >= sollerWidth) {
            clearInterval(soller)
          }
        }, 5)
      },
      navselect (data) { // 存储选中的值
        this.$store.dispatch('selectBazzer', data)
      }
    }
  }
</script>
