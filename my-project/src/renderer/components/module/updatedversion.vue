<template>
    <el-dialog
            :title="title"
            :visible.sync="upvShow"
            :before-close="close"
            width="4.21rem"
            class="center-dialog"
            center>
       <div>
           <div v-for="(item,index) in msgData" :key="index">
               <p class="list">{{item.message}}</p>
           </div>
       </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm()">确 定</el-button>
            <el-button type="primary" @click="close()">取 消</el-button>
        </span>
    </el-dialog>
</template>
<style scoped>
.list{
    margin: 5px 10px;
}
</style>
<script>
    export default {
        data(){
            return{
                title:'更新版本',
                msgData:[{message:'更新1'},
                    {message:'更新2'},
                    {message:'更新3'}],
                upvShow:true
            }
        },
        methods:{
            confirm(){
                    this.upvShow = false;
            },
            close(){
                    this.upvShow = false;
            }
        }
    }
</script>