<template>
<div>
  <el-table class="table-list bg-table" :data="tableData" stripe style="width: 100%">
    <el-table-column label="币对" prop="name">
      <template slot-scope="scope">
        <div slot="reference">
          <span >{{scope.row.name}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="交易所" prop="name">
      <template slot-scope="scope">
        <div slot="reference">
        <span style="color:#0098ff;" class='bymarket' v-for='item in scope.row.nua'>{{item}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="数量" prop="name">
      <template slot-scope="scope">
        <div slot="reference">
          <span >{{scope.row.name}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="预计利润" prop="name">
      <template slot-scope="scope">
        <div slot="reference">
        <span style="color:#0fc45b;">{{scope.row.name}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="状态" prop="name">
      <template slot-scope="scope">
        <div slot="reference">
        <span   v-if="scope.row.day==0" class="red">已过期</span>
        <span   v-else style="color:#999999">剩余{{scope.row.day}}天</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
          <div slot="reference">
            <span   v-if="scope.row.type==1" class="bulid pointer" @click="intoUse(scope.$index, scope.row)">开始使用</span>
            <span  v-else-if="scope.row.type==2" class="red">已过期</span>
            <span  v-else class="bulid pointer" @click="stopUse(scope.$index, scope.row)">暂停使用</span>
          </div>
        </template>
    </el-table-column>
  </el-table>
   <!-- 分页 -->
      <div style="text-align:center;margin-top:.035rem;margin-bottom: -0.13rem;" v-if="total>5">
         <el-pagination
          :page-size="5"
          :pager-count="5"
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="total">
         </el-pagination>
      </div>
      </div>
</template>
<script>
  export default {
    data () {
      return {
        centerDialogVisible: false,
        tableData: [// 1是开始使用，2是已经过期，3是暂停使用。
          {name: 'btc', nua: ['ETH', 'GXS'], number: '666', money: '3333', type: '2', day: 0},
          {name: 'btc', nua: ['ETH', 'GXS'], number: '', money: '44', type: '1', day: 22},
          {name: 'btc', nua: ['ETH', 'GXS'], number: '666', money: '3333', type: '2', day: 0},
          {name: 'btc', nua: ['ETH', 'GXS'], number: '', money: '44', type: '1', day: 22},
          {name: 'btc', nua: ['ETH', 'GXS'], number: '', money: '44', type: '3', day: 23}
        ],
        deleVal: {
          index: '',
          item: ''
        },
        total: 100
      }
    },
    methods: {
      // 开始使用
      /* intoUse(index,item){
        beginPlan().then((res) => {
          this.tableData[index].type=3;
          this.$messageTitle('方案启动成功','success');

        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试','error');
        });
      },
      //暂停使用
      stopUse(index,item){
        stopPlan().then((res) => {
          this.tableData[index].type=1;
          this.$messageTitle('方案已暂停','success');

        }).catch((err) => {
          this.$messageTitle('网络错误，请稍后再试','error');
        });
      }, */
      // 分页
      currentChange () {
        console.log('分页')
      }
    }
  }
</script>

