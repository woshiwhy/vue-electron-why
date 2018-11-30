<template>
  <div class="small-box skin-bg">
    <h3 class="title-name">{{$t("headline.news")}}</h3>
    <ul style="height: 90%; overflow: auto;" ref="sollerBox" @scroll="sollerFun">
      <li class="new-list" v-for="(item,index) in newList">
        <div class="ellipsis-2" @click="openNew(item)" :title="item.content">{{item.article}}</div>
        <div class="list-time">{{$timecycle(item.releaseDate)}}</div>
      </li>
      <li style="text-align: center;">
        <i class="el-icon-loading" v-if="loadingType" ></i>
        <span v-else style="color:#4e5b85;font-size: 0.12rem">没有更多</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .el-icon-loading{
    font-size: 0.2rem;
    color:#0098ff
  }
  .small-box{
    height: 3.9rem;
  }
  .new-list {
    padding: 0 0.3rem 0 0.15rem;
    margin-bottom: 0.15rem;
  }

  .ellipsis-2 {
    cursor: pointer;
  }

  .ellipsis-2:hover {
    color: #0098ff;
  }

  .list-time {
    margin-top: 0.1rem;
    padding-bottom: 0.1rem;
  }

  .new-list:last-child {
    margin-bottom: 0;
  }

  .new-list:last-child > .list-time {
    padding-bottom: 0;
    border-bottom: none;
  }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        newList: [],
          loadingType:false,
          pages:1,//总页数
          listPost:{
              eq: {journalism_classify:"1000-1003"},
              page: {
                  current: 0,
                  size:8
              }
          }
      }
    },
      created(){
        this.newListPost();
      },
    methods: {
          newListPost(){
              this.listPost.page.current++;
              if(this.listPost.page.current>this.pages){//当前页面大于总页数禁止请求
                 this.loadingType=false;
                  return
              }
              this.loadingType=true;
              this.$postAxios.newList(this.listPost).then((res) => {
                  if(res.data.code==200){
                      this.loadingType=false;
                      this.pages=res.data.data.pages;//总页数
                      if(this.listPost.page.current==1){//如果是第一页直接赋值
                          this.newList=res.data.data.records;
                          return
                      }
                      this.newList=this.newList.concat(res.data.data.records);//不是就合并
                  }
              })
          },
        sollerFun(data){
            let tagerObj=data.target;
            let clientOBj=tagerObj.clientHeight;//滑动条高度
            let offsetOBj=tagerObj.scrollHeight;//可视区域高度
            let offsetTop=tagerObj.scrollTop;//滑动条距离顶部距离
          if(clientOBj+offsetTop>=offsetOBj){
             this.newListPost();
          }
        },
      openNew (data) {
        if (window.require) {
            const {shell} = window.require('electron').remote;
            shell.openExternal(data.links+'?id='+data.id)
        }
      }
    }
  }
</script>
