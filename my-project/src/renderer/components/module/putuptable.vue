<template>
  <!--挂单-->
  <el-table
    class="table-list table bg-table"
    :data="tableValInfor"
    height="7rem"
    v-loading="loadingType"
    style="width: 100%"
    element-loading-background="rgba(0, 0, 0, 0)"
    stripe
  >
    <template v-for="(item,index) in tableName">
      <el-table-column
              show-overflow-tooltip
        :width="item.width"
        :label="item.name">
        <template slot-scope="scope">
          <div slot="reference" :class="item.class">
            <span v-if="item.val=='status'">
              {{ scope.row.status | $_filterDealType}}
            </span>
            <span  v-else-if="item.val=='operation'">
                <span class="btn-color" @click="operation(scope)">{{ scope.row.status | $_dealName}}</span>
            </span>
            <span v-else-if="item.val=='type'">
                  <span :style="{'color':scope.row.type=='buy'?'green':'red'}">{{ scope.row.type | $_dealName}}</span>
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
