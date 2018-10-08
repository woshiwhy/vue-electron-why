<template>
  <div class="robot-box">
    <el-table
      class="table-list"
      :data="tableData"
      style="width: 100%"
      stripe>
      <el-table-column
        :label='$t("tableheder.LoginTime")'>
        <template slot-scope="scope">
          <div slot="reference">
            <span>{{scope.row.createTime | floatTime}}</span>
          </div>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--label="IP">-->
        <!--<template slot-scope="scope">-->
          <!--<div slot="reference">-->
            <!--<span>{{scope.row.ip | floatIP}}</span>-->
          <!--</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="address"
        :label='$t("tableheder.address")'>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .robot-box{
    padding: 0 0.15rem;
  }

</style>
<script>
  export default {
    data () {
      return {
        tableData: []
      }
    },
    created () {
      this.onSubmit()
    },
    filters: {
      floatTime: function (value) { // 时间
        return value.slice(5, 16)
      },
      floatIP: function (value) { // Ip
        let a = value.substr(0, 7) + '***'
        return a
      }
    },
    methods: {
      onSubmit () {
        this.$loginAjax.loginQuery({}).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
          } else {
            this.$messageTitle(res.data.msg, 'error')
          }
        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试', 'error')
        })
      }
    }
  }
</script>
