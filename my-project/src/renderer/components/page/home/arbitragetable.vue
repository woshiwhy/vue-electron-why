<template>
  <div class="small-box skin-bg" ref="arbitragebox" style="min-height: 4.3rem;margin-bottom: 0">
    <h3 class="title-name">{{$t("headline.rankinglist")}}</h3>
    <ul class="table-list-nav skin-childer-nav">
      <li :class="{'active':item.active}"
          v-for="(item,index) in tableNav" @click="navClick(index,item.id)" :key="index">
        {{item.name}}
      </li>
    </ul>
    <div class="more-btn">
      <span class="btn-color" v-if="$store.state.home.homeMore"
            @click="morerList(false,100)">{{$t("btnname.more")}}</span>
      <span class="btn-color" v-else @click="morerList(true,7)">{{$t("btnname.close")}}</span>
    </div>
    <el-table
      class="table-list bg-table"
      :data="tableData"
      style="width: 100%"
      :max-height="maxHeight"
      :min-height="maxHeight"
      v-loading="loadingType"
      element-loading-background="rgba(0, 0, 0, 0)"
      stripe>
      <el-table-column
              prop="profit"
              :label="$t('tableheder.profit')">
      </el-table-column>
      <el-table-column
              prop="avgProfitRate"
              :label="$t('tableheder.spreadrate')">
      </el-table-column>
      <el-table-column
        prop="symbol"
        :label="$t('tableheder.moneyfor')">
      </el-table-column>
      <el-table-column
              prop="name"
        :label="$t('tableheder.bazaar')">
        <template slot-scope="scope">
          <span class="arbitrageCol">{{scope.row.name}} </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
  .fadbox {
    -webkit-animation-name: fadeInOut;
    -moz-animation-name: fadeInOut;
    -o-animation-name: fadeInOut;
    animation-name: fadeInOut;
    -webkit-animation-timing-function: ease-in-out;
    -moz-animation-timing-function: ease-in-out;
    -o-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: 1;
    -moz-animation-iteration-count: 1;
    -o-animation-iteration-count: 1;
    animation-iteration-count: 1;
    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    -o-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-direction: alternate;
    -moz-animation-direction: alternate;
    -o-animation-direction: alternate;
    animation-direction: alternate;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    51% {
      opacity: 0.1;
    }
    53% {
      opacity: 0.3;
    }
    56% {
      opacity: 0.5;
    }
    58% {
      opacity: 0.7;
    }
    60% {
      opacity: 1;
    }
  }

  .table-list-nav {
    position: absolute;
    top: 0.13rem;
    left: 1.9rem;
  }

  .table-list-nav > li {
    display: inline-block;
    padding: 0.04rem 0.15rem;
    cursor: pointer;
    margin-left: 0.1rem;
  }

  .more-btn {
    position: absolute;
    top: 0.22rem;
    color: #0098ff;
    cursor: pointer;
    right: 0.2rem;
  }
</style>
<script>
  export default {
    data () {
      return {
        maxHeight: 480,
        tableData: [],
        tableLIst: {
          today: [],
          week: [],
          month: []
        },
        loadingType: false,
        postData: {
            eq:{type:'today'},
            page:{
                size: 7
            }
        }
      }
    },
    computed: {
      tableNav () {
        return [
          {
            name: this.$t('tabname.today'),
            active: true,
            id: 'today'
          },
          {
            name: this.$t('tabname.week'),
            active: false,
            id: 'week'
          },
          {
            name: this.$t('tabname.month'),
            active: false,
            id: 'month'
          }
        ]
      }
    },
    beforeDestroy () { // 组件销毁，打开套利
      this.$store.dispatch('homeMore', true)
  },
    created () {
      this.postAjax()
    },
    methods: {
      postAjax () {
        this.loadingType = true;
          this.tableData = [];
        this.$postAxios.rankingList(this.postData).then((ref) => {
          const dataVal = ref.data;
          this.loadingType = false;
          if (dataVal.code == 200) {
            this.tableLIst[this.postData.eq.type] = dataVal.data.records;
            this.tableData = dataVal.data.records;
            return
          }
          this.$messageTitle(dataVal.msg, 'error')
        }).catch((err) => {
          this.loadingType = false;
        })
      },
      navClick (index, id) {
        for (let v of this.tableNav) {
          v.active = false
        }
        this.postData.eq.type= id;
        this.tableNav[index].active = true;
        if (this.tableLIst[id].length) { //  如果有值就不请求
          this.tableData = this.tableLIst[id];
          return
        }
        this.postAjax()
      },
      morerList (data, number) { //  false更多
        this.postData.size = number;
        this.tableLIst = {
          today: [],
          week: [],
          month: []
        };
        this.postAjax();
        this.$refs.arbitragebox.classList.add('fadbox');
        this.$store.dispatch('homeMore', data);
        setTimeout(() => { // 动画过度完删除Class
          this.$refs.arbitragebox.classList.remove('fadbox')
        },
        1000
        );
        if (!data) {
          this.$refs.arbitragebox.setAttribute('style', 'min-height:100%');
          this.maxHeight = this.$refs.arbitragebox.clientHeight - 87;
          return
        }
        this.maxHeight = 500;
        this.$refs.arbitragebox.setAttribute('style', 'min-height:4.3rem')
      }
    }
  }
</script>
