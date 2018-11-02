<template>
    <el-dialog
            :title="$options.filters.$_messageList(messageOBj.type)"
            :visible.sync="upvShow"
            :before-close="close"
            width="4.21rem"
            class="center-dialog up-version"
            center>
       <div class="list">
           <p class="list-content">{{messageOBj.content}}</p>
       </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="affirm-btn" @click="confirm(messageOBj.type)">{{ messageOBj.type | $_executeStatus}} </el-button>
            <el-button type="primary" class="hover-btn clospay" @click="close()" v-if="messageOBj.type=='0004-0002'">取 消</el-button>
        </span>
    </el-dialog>
</template>
<style>
    .up-version .el-dialog__headerbtn{
        display: none!important;
    }
</style>
<style scoped>
.list{
    margin: 5px 10px;
    max-height: 240px;
    overflow-y: scroll;
}
    .list .list-content{
        word-wrap:break-word
    }
</style>
<script>
    export default {
        props:['messageOBj'],
        data(){
            return{
                upvShow:true
            }
        },
        methods:{
            confirm(type){
                this.$emit('messageType',type);
            },
            close(){
                this.$emit('close');
            }
        }
    }
</script>