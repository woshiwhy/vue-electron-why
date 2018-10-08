<template>
  <el-container>
    <el-aside width="3.75rem">
     <set-box></set-box>
    </el-aside>
    <el-main class="main-width">
      <plan-box style="min-height: 5.51rem"></plan-box>
      <autoTab-box style="top: .01rem;" class="minHeig"></autoTab-box>
    </el-main>
    <el-aside width="3.1rem">
      <statistics-box></statistics-box>
    </el-aside>
  </el-container>
</template>
<style scoped>
  .main-width{
    margin-right: 0.1rem;
    width: -moz-calc(100% - 7.05rem);
    width: -webkit-calc(100% - 7.05rem);
    width: calc(100% - 7.05rem);
  }
  .minHeig{
    min-height: calc(100% - 5.64rem);
  }
</style>
<script>
  import setBox from '@/components/page/autotrade/setauto' // 策略设置
import Plan from '@/components/page/autotrade/plan' // 推荐策略
import AutoTab from '@/components/page/autotrade/autotab' // tab选项
import Statistics from '@/components/page/autotrade/statistics' // 统计
export default {
    data () {
      return {
        setStrateg: {
          strategyName: '',
          currency: ''
        }

      }
    },
    components: {
      'set-box': setBox,
      'plan-box': Plan,
      'autoTab-box': AutoTab,
      'statistics-box': Statistics
    }
  }
</script>
