<template>
    <el-dialog
            :title="title"
            :visible.sync="upvShow"
            :before-close="close"
            width="4.21rem"
            class="center-dialog"
            center>
        <p class="setingBg">
            <span>{{message}}</span>
        </p>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm()">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        data(){
            return{
                title:'更新版本',
                message:'更新',
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