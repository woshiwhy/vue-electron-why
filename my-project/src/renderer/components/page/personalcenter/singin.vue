<template>
  <el-dialog
    class="center-dialog isato"
    :title="singinTitle"
    :visible.sync="singInVisible"
    width="4.21rem"
    :before-close="close"
    center>
    <div>
      <p class="title">连续签到获取积分翻倍奖励</p>
      <el-steps :space="200" class="isatoH" :active="active" ref="sing">
        <el-step v-for="(item,index) in week" :title="item.description" :description="item.title"  :key="index"></el-step>
      </el-steps>
    </div>
  </el-dialog>
</template>
<style scoped>
  .title{
    text-align: center;
    margin-bottom: 0.3rem;
    margin-top: -0.24rem;
    color: #999999;
  }
  .isatoH{
    padding-left: 0.15rem;
  }
</style>
<script>
  export default {
    props: ['singinTitle', 'active'],
    data () {
      return {
        singInVisible: true,
        week: [
          {title: '+05', description: '第一天'},
          {title: '+10', description: '第二天'},
          {title: '+15', description: '第三天'},
          {title: '+20', description: '第四天'},
          {title: '+25', description: '第五天'},
          {title: '+30', description: '第六天'},
          {title: '+35', description: '第七天'}
        ]
      }
  },
    created () {
    },
    methods: {
      close () {
        this.$emit('closeSingin')
      }

    }
  }
</script>
