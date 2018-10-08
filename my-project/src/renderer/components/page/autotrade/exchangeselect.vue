<template>
  <div class="select-boxadd form-liest">
    <label>添加交易所</label>
    <el-select v-model="bourse" filterable placeholder="搜索交易所">
      <el-option
        mini
        v-for="(item,index) in selectVal"
        :key="item.value"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
    <i class="el-icon-circle-plus-outline add-exchange" @click="add"></i>
      <ul class="exchange-list">
        <li v-for="(item,index) in selectData">
          {{item}}
          <i class="el-icon-close" @click="deleList(index)"></i>
        </li>
      </ul>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .select-boxadd input{
    width: 1.75rem;
    height: 0.38rem;
    margin-right: 0.1rem;
  }
  .select-boxadd .el-input__suffix{
    right: 0.1rem;
  }
  .add-exchange{
    cursor: pointer;
    font-weight: bold;
    font-size: 0.22rem;
    color:#0098ff ;
    text-align: center;
  }
  .exchange-list{

    margin-left:1.15rem;
  }
  .exchange-list>li{
    margin-top: 0.15rem;
    margin-right: 0.05rem;
    font-size: 0.12rem;
    display: inline-block;
    padding:0.05rem 0.05rem;
    border-radius: 2px;
    color:#0098ff ;
    border: solid 1px #0098ff;
  }

</style>
<script>
  export default {
    props: ['activData'],
    data () {
      return {
        selectVal: this.$store.state.bazzer,
        bourse: '',
        selectList: [],
        selectData: []
      }
    },
    computed: {
      activVal () {
        return this.activData
      },
      seachData () {
        return this.$store.state.bazzer
      }
    },
    watch: {
      activVal (n, o) {
        if (n instanceof Array) {
          this.selectData = n
        }
      },
      seachData (n, o) {
        this.selectVal = n
      }
    },
    methods: {
      handleParentClick () {
        this.selectList = []
        this.selectData = []
      },
      deleList (index) { //  删除交易所
        this.selectList.splice(index, 1)
        this.selectData.splice(index, 1)
        this.$emit('selectList', this.selectData) // 传递选中的交易所
      },
      add () { // 添加交易所
        let selectVal = this.bourse.value
        if (this.selectData.length == 2) {
          this.$message({
            showClose: true,
            message: '交易所只能选择2所',
            type: 'error'
          })
          return
        }
        if (!selectVal) {
          this.$message({
            showClose: true,
            message: '请选择交易所',
            type: 'error'
          })
          return
        }
        for (let val of this.selectData) {
          if (val === selectVal) {
            this.$message({
              showClose: true,
              message: '该交易所已经添加',
              type: 'error'
            })
            return
          }
        }

        this.selectList.push(this.bourse)
        this.selectData.push(this.bourse.value)
        this.$emit('selectList', this.selectData) // 传递选中的交易所
        this.bourse = ''
      }
    }
  }
</script>
