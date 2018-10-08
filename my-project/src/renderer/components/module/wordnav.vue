<template>
  <div class="soller-box">
    <i class="el-icon-arrow-left" @click="sollerLeft"></i>
    <el-menu   ref="sollerBox" :default-active="activeNav" active-text-color="#0098ff" class="soller-nav" mode="horizontal">
      <template v-for="(item,index) in navList">
        <el-menu-item :index="item.id" @click="navselect(item,index)">{{item.name}}</el-menu-item>
      </template>
    </el-menu>
    <i class="el-icon-arrow-right" @click="sollerRight"></i>
  </div>
</template>
<style scoped>
  .active {
    color: #0098ff !important;
  }
</style>

<script>
  export default {
    data () {
      return {
        activeObj: '',
        activeNav: '0'
      }
  },
    computed: {
      navList () {
        return this.$store.state.bazzer
      }
    },
    watch: {
      navList (n, o) {
        this.activeNav = n[0].id
        this.$store.dispatch('activeBazzer', n[0])// 选中的市场
      }
    },
    mounted () {
      let bazzer_Obj = this.$route.query.bazzerObj
      if (this.navList.length != 0) {
        if (bazzer_Obj) { // 通过搜索市场跳转。
          this.activeNav = bazzer_Obj.id
          this.$store.dispatch('activeBazzer', bazzer_Obj)
          return
        }
        this.activeNav = this.navList[0].id
        this.$store.dispatch('activeBazzer', this.navList[0])
      }
    },
    methods: {
      sollerLeft () {
        this.sollerNumber('left')
      },
      sollerRight () {
        this.sollerNumber('right')
      },
      sollerNumber (type) {
        let sollerBox = this.$refs.sollerBox
        let sollerWidth = sollerBox.scrollWidth / this.navList.length
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
        this.$store.dispatch('activeBazzer', data)
      }
    }
  }
</script>
