<template>
  <!--个人资产-->
  <div>
    <transition name="fade">
      <!--没有绑定-->
      <div v-if="bindType" class="unbind-tip">
        <p class="banckColr">{{$t("tip.tip1")}}</p>
        <p class="banckColr">
          {{$t("tip.tip2")}}
          <span class="unskip" @click="navChange">{{$t("btnname.bind")}}</span>
        </p>
      </div>
      <!--绑定有值-->
      <el-table
        v-else-if="myBalance.length"
        class="table-list"
        :data="myBalance"
        stripe>
        <template v-for="(item,index) in tableTr">
          <el-table-column
            :width="item.width"
            :label="item.name">
            <template slot-scope="scope">
              <div slot="reference" :class="item.class">
                {{scope.row[item.val]}}
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <!--绑定没值-->
      <div v-else class="unbind-tip">
        <p class="banckColr">{{$t("tip.assets")}}</p>
      </div>
    </transition>
  </div>
</template>
<style scoped>
  .unbind-tip {
    font-size: 0.14rem;
    color: #333333;
    line-height: 0.24rem;
    top: 1.2rem;
    position: absolute;
    width: 100%;
    text-align: center;
  }

  .unbind-tip a {
    text-decoration: none;
  }

  .unskip {
    color: #0098ff;
    cursor: pointer;
  }

</style>
<style>
  .blue {
    color: rgb(0, 152, 255);
  }

  .gree {
    color: green;
  }
</style>
<script>
  export default {
    props: ['bindType'],
    computed: { //  监听选中值
        tableTr(){
            return [
                {name: this.$t('tableheder.currency'), val: 'symbolName'},
                {name: this.$t('tableheder.amount'), val: 'total'},
                {name: this.$t('tableheder.usable'), val: 'available', class: 'blue'}
            ]
        },
      myBalance () {
        return this.$store.state.sopttrading.myBalance
      }
    },
    methods: {
      navChange () {
        this.$store.dispatch('navType', '4')
        this.$router.push('/binding')
      }
    }
  }
</script>
