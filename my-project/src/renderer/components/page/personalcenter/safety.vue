<template>
    <div>
        <div>
            <div class="infor-header">{{$t("headline.account")}}</div>
            <div class="content-list">
                <span>{{$t("tip.account")}}</span>
                <span v-if="username">{{username}}</span>
            </div>
            <div class="content-list">
                <span>{{$t("tip.passWord")}}</span>
                <span>*******</span>
                <span class="change-btn edit-btn" @click="change(1)">{{$t("btnname.change")}}</span>
            </div>
        </div>
        <div>
            <div class="infor-header">{{$t("headline.bind")}}</div>
            <div class="content-list">
                <span>{{$t("tip.email")}}</span>
                <span v-if="userInfor.email ">{{userInfor.email | float}}</span>
                <span class="change-btn edit-btn" @click="change(2)">{{$t("btnname.change")}}</span>
            </div>
            <div class="content-list">
                <span>{{$t("tip.phone")}}</span>
                <span v-if="userInfor.phone ">{{userInfor.phone |float }}</span>
                <span class="change-btn edit-btn" @click="change(3)">{{$t("btnname.change")}}</span>
            </div>
            <pwd-box @pwdClone="pwdClone" v-if="pwdPage"></pwd-box>
            <mail-box @mailClone="mailClone" v-if="mailPage" @showEmail="showEmail"></mail-box>
            <phone-box @phoneClone="phoneClone" v-if="phonePage" @showPhone="showPhone"></phone-box>
        </div>
    </div>
</template>
<style>
    .infor-header {
        color: #ffffff;
        font-size: 0.16rem;
        padding: 0 0.32rem;
        height: 0.45rem ;
        line-height: 0.45rem;
    }
    /**/
    .content-list {
        padding: 0.18rem 0.7rem;
        /*background: #f2f6f9;*/
        color: #666666;
    }

    .content-list > span:first-child {
        display: inline-block;
        width: 2rem;
    }

    .edit-btn:hover {
        opacity: 0.7;
    }
    .edit-btn{
        float: right;
        color: #0098ff!important;
        cursor: pointer;
    }
    .content-list {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>

<script>
    import pwdMound from '~/personalcenter/pwdlayer'
    import mailMound from '~/personalcenter/maillayer'
    import PhoneMound from '~/personalcenter/phonelayer'

    export default {
        data() {
            return {
                pwdPage: false, // 密码修改弹窗
                mailPage: false, // 邮箱修改弹窗
                phonePage: false, // 手机修改弹窗
                userFrom: {},
                username: localStorage.getItem('username')
            }
        },
        components: {
            'mail-box': mailMound,
            'pwd-box': pwdMound,
            'phone-box': PhoneMound,
        },
        computed: {
            userInfor() {
                return this.$store.state.usersInfor
            },
        },
        filters: {
            float: function (value) {
                return value.replace(/^(\d{4})\d{4}(\d+)/, '$1****$2')
            }
        },
        methods: {
            // 修改电话
            showPhone(phone) {
                this.userInfor.phone = phone
                this.$store.dispatch('usersInfor', this.userInfor)
                this.phonePage = false
            },
            // 修改邮箱
            showEmail(email) {
                this.userInfor.email = email
                this.$store.dispatch('usersInfor', this.userInfor)
                this.mailPage = false
            },
            change(type) {
                switch (type) {
                    case 1: // 密码修改
                        this.pwdPage = true
                        break
                    case 2: // 邮箱修改
                        this.mailPage = true
                        break
                    case 3: // 手机修改
                        this.phonePage = true
                        break
                }
            },
            mailClone(data) {
                this.mailPage = data
            },
            pwdClone(data) {
                this.pwdPage = data
            },
            phoneClone(data) {
                this.phonePage = data
            },
            verifnumber(data, e) {
            }
        }
    }
</script>