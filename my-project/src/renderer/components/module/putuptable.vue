<template>
  <!--挂单-->
  <el-table
    class="table-list table bg-table"
    :data="tableValInfor"
    height="7rem"
    v-loading="loadingType"
    element-loading-background="rgba(0, 0, 0, 0)"
    stripe
  >
    <template v-for="(item,index) in tableName">
      <el-table-column
        :width="item.width"
        :label="item.name">
        <template slot-scope="scope">
          <div slot="reference" :class="item.class">
            <span v-if="item.val=='status'">
              {{
              scope.row.status==0?'待成交':
              scope.row.status==1?'部分成交':
              scope.row.status==2?'完全成交':
              scope.row.status==3?'撤单中':
              scope.row.status==4?'已撤销':'过期'
              }}
            </span>
            <span  v-else-if="item.val=='operation'">
                <span v-if=" scope.row.status=='0'|| scope.row.status=='1'" class="btn-color" @click="operation(scope)">撤单</span>
            </span>
            <span v-else-if="item.val=='type'">
                  <span v-if="scope.row.type=='sell'" style="color: red">卖出</span>
                  <span v-else-if="scope.row.type=='buy'" style="color:green">买入</span>
            </span>
            <span v-else>
              {{scope.row[item.val]}}
            </span>
          </div>
        </template>
      </el-table-column>
    </template>

  </el-table>
</template>

<script>
  export default {
    props: ['tableName', 'tableVal', 'loadingType'],
    computed: { //  监听选中值
      tableValInfor () {
        return this.tableVal
      }
    },
    methods: {
      operation (scope) {
        this.$emit('operation', scope)
      }
    }
  }
</script>
