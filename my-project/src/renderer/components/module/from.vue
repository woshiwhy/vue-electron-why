<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="noLable?'0':'100px'" class="demo-ruleForm"
           :validateField="verify">
    <template v-for="(item,index) in fromListch">
      <el-form-item :label="item.title" :prop="item.name">
        <div class="title-name" :class="{'bule-color':item.blurType}">{{item.titleNme}}</div>
        <el-col :class="{'verify-inputfrom':item.verify}">
          <el-input :type="item.type" :placeholder="item.placeholder"
                    @keyup.enter.native="submitForm('ruleForm',$event)"
                    v-model="ruleForm[item.name]" @focus="focusType(item)" @blur="blurType(item)"></el-input>
        </el-col>
        <button v-if="item.verify && disabledVerfy == false" :class="[item.class,{'bule-color':item.blurType}]"
              @click="verify(item.verifyTyp,$event)" type="button" class="verifyBtu" :disabled="disabled">{{item.verify}}</button>
        <el-button v-else-if="item.verify && disabledVerfy == true"
                type="button" class="verifyBtu coed-btn" :loading="true" plain></el-button>
      </el-form-item>
    </template>
    <el-form-item v-if="remember">
      <el-checkbox @change="handleCheckedCitiesChange" v-model="acutchecked">
        <span style="margin-left: 6px;" class="forgin-btn">记住账户 </span>
      </el-checkbox>
      <span class="forgin-btn pull-right forgin-hover" @click="forginPwd">忘记密码？</span>
    </el-form-item>
    <el-form-item v-else-if="resfort == 2" class="changlab">
      <el-checkbox v-model="pwdchecked" class="title-left">
        <span style="color: #4e5b85">我已阅读并同意</span><span class="cursor-pointer btn-color"  @click="openwidon">《币前线媒体平台服务协议》</span>
      </el-checkbox>
    </el-form-item>
    <el-form-item class="text-center">
      <el-button size="medium" class="submint-btn" :class="btnName.class" @click="submitForm('ruleForm',$event)" v-if="disableBtn">
        {{btnName.name||'提 交'}}
      </el-button>
      <el-button size="medium" class="submint-btn" :class="btnName.class" :loading="true" v-else>
      </el-button>
    </el-form-item>
    <!--弹出层-->
    <el-dialog
      title="币前线媒体平台服务协议"
      :visible.sync="dialogVisible"
      :center=true
      top="5vh"
      class="agreement-box"
      width="90%">
      <p>
      【导言】欢迎您使用币前线媒体平台！
      为使用币前线媒体平台服务（以下简称“本服务”），您应当阅读并遵守《币前线平台服务协议》（以下简称“本协议”）。请您务必审慎阅读、充分理解各条款内容，
      特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。 除非您已阅读并接受本协议及相关协议的所有条款，
      否则您无权使用本服务。您对本服务的登录、查看、发布信息等行为即视为您已阅读并同意本协议的约束。
      如果您未满18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议，并特别注意未成年人使用条款。
      </p>
      <p>
        一、【范围】<br>
        1本协议是您与币前线之间关于您使用币前线媒体平台服务所订立的协议。“币前线”是指成都众汇新谷网络科技有限公司及其相关服务可能存在的运营关联单位。
        “平台用户”是指注册、登录、使用币前线媒体平台帐号的个人或组织，在本协议中更多地称为“您”。“其他用户”是指包括订阅用户等除平台用户本人外与本服务相关的用户。<br>
        2 本服务以包括但不限于币前线网、币前线软件、币前线M站等币前线业务平台为传播渠道,由币前线针对个人或企业推出的信息发布和品牌推广服务。平台用户注册币前线媒体平台帐号后可以通过币前线媒体平台进行信息发布、
        品牌推广以及订阅用户评论管理等操作。
      </p>
      <p>
        二、【注册及权限】<br>
        1.您在使用本服务前需要注册一个币前线媒体平台帐号，币前线媒体平台帐号为手机号码或者邮箱<br>
        2.币前线媒体平台将对您的注册帐号信息进行审查。您应当对您提供的帐号资料的真实性、合法性、准确性和有效性独立承担责任。如因此给币前线或第三方造成损害的，您应当依法予以赔偿。<br>
        3.币前线有权将您通过币前线媒体平台所发布的消息（包括但不限于文字、图片、视频、图表等）进行不改变原意的修改，
        并在包括但不限于币前线网、币前线软件、币前线M站等币前线业务平台上推送给公众。币前线及其关联方、合作方对您通过币前线媒体平台所上传发布的任何内容具有全世界范围内的、永久的、不可撤销的、免费的、非独家的使用权。<br>
        使用本服务，您可获得以下权限：<br>
        1．通过币前线媒体平台进行消息管理及与订阅用户进行互动；<br>
        2. 获取您的币前线媒体平台帐号的订阅用户量及消息点击次数量；<br>
        3. 在得到币前线同意的情况下，您有权通过币前线媒体平台进行发布品牌推广信息和/或付费订阅等商业活动。您亦同意，币前线有权就您通过币前线媒体平台进行商业活动收取技术服务成本费。
      </p>
      <p>
        三、【平台用户个人信息保护】<br>

        1.您在申请本服务的过程中，可能需要提供一些必要的信息，请保持这些信息的真实、准确、合法、有效并注意及时更新，以便币前线向您提供及时有效的帮助，
        或更好地为您提供服务。根据相关法律法规和政策，请您填写真实的身份信息。若您填写的信息不完整或不准确，则可能无法使用本服务或在使用过程中受到限制。<br>
        2.币前线与平台用户一同致力于个人信息的保护，保护平台用户个人信息是币前线的一项基本原则。未经你的同意，币前线不会向币前线以外的任何公司、组织或个人披露你的个人信息，但法律法规另有规定的除外。<br>
        3.您应对通过本服务了解、接收或可接触到的包括但不限于其他用户在内的任何人的个人信息予以充分尊重，您不应以搜集、复制、存储、传播或以其他任何方式使用其他用户的个人信息，否则，由此产生的后果由您自行承担。
      </p>
      <p>
        四、【内容规范】<br>
        1本条所述平台内容是指您使用本服务过程中所制作、复制、发布、传播的任何内容，包括但不限于币前线媒体平台帐号头像、名称、平台用户说明等注册信息，
        或文字、语音、图片、视频、图文等发送、回复或自动回复消息和相关链接页面，以及其他使用币前线媒体平台帐号或币前线媒体平台服务所产生的内容。<br>
        2您在使用本服务时需遵守法律法规、社会主义制度、国家利益、公民合法权益、社会公共秩序、道德风尚及信息真实性等“七条底线”要求。<br>
        您不得利用本服务制作、复制、发布、传播如下法律、法规和政策禁止的内容：<br>
        (1) 反对宪法所确定的基本原则的；<br>
        (2) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br>
        (3) 损害国家荣誉和利益的；(4) 煽动民族仇恨、民族歧视，破坏民族团结的；<br>
        (5) 破坏国家宗教政策，宣扬邪教和封建迷信的；<br>
        (6) 散布谣言，扰乱社会秩序，破坏社会稳定的；<br>
        (7) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>
        (8) 侮辱或者诽谤他人，侵害他人合法权益的；<br>
        (9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；<br>
        (10)以非法民间组织名义活动的；<br>
        (11) 含有法律、法规和政策禁止的其他内容的信息。<br>
        3．您理解并同意，币前线一直致力于为平台用户提供文明健康、规范有序的网络环境，您不得利用本服务制作、复制、发布、传播如下干扰企鹅媒体平台正常运营，以及侵犯其他用户或第三方合法权益的内容：<br>
        (1) 含有任何性或性暗示的；<br>
        (2) 广告、骚扰、垃圾信息的；<br>
        (3) 涉及他人隐私、个人信息或资料的；<br>
        (4) 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；<br>
        (5) 含有其他干扰企鹅媒体平台正常运营和侵犯其他用户或第三方合法权益内容的信息。
      </p>
      <p>
        五、【平台使用规则】<br>
        1．本条所述平台使用是指您使用本服务所进行的任何行为，包括但不限于注册登录、帐号运营推广以及其他使用币前线媒体平台帐号或币前线媒体平台服务所进行的行为。<br>
        2． 您不得利用币前线媒体平台帐号或币前线媒体平台服务进行如下行为：<br>
        (1) 提交、发布虚假信息，或冒充、利用他人名义的；<br>
        (2) 强制、诱导其他用户关注、点击链接页面或分享信息的；<br>
        (3) 虚构事实、隐瞒真相以误导、欺骗他人的；<br>
        (4) 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；<br>
        (5) 未经币前线书面许可利用币前线媒体平台帐号为第三方进行推广的（包括但不限于加入第三方链接、广告等行为）；<br>
        (6) 未经币前线书面许可使用插件、外挂或其他第三方工具、服务接入本服务和相关系统；<br>
        (7) 利用币前线媒体平台帐号或币前线媒体平台服务从事任何违法犯罪活动的；<br>
        (8) 制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；<br>
        (9) 其他违反法律法规规定、侵犯其他用户合法权益、干扰产品正常运营或币前线未明示授权的行为。
      </p>
      <p>
        六、【帐号管理】<br>
        1.币前线媒体平台帐号的所有权归成都众汇新谷网络科技有限公司所有，平台用户完成申请注册手续后，获得币前线媒体平台帐号的使用权，
        该使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。成都众汇新谷科技因经营需要，有权终止本服务。<br>
        2.您有责任妥善保管注册帐户信息及帐户密码的安全，您需要对注册帐户以及密码下的行为承担法律责任。您同意在任何情况下不向他人透露帐户或密码信息。在您怀疑他人在使用您的帐户或密码时，
        您同意立即通知成都众汇新谷网络科技有限公司。<br>
        3.您应遵守本协议的各项条款，正确、适当地使用本服务，如您违反本协议中的任何条款，成都众汇新谷网络科技有限公司有权依据本协议终止对您的币前线媒体平台帐号提供服务。
        同时，币前线保留在任何时候收回币前线媒体平台帐号、平台用户名的权利。<br>
      </p>
      <p>
        七、【数据的储存】<br>
        1 币前线不对你在本服务中相关数据的删除或储存失败负责。<br>
        2币前线有权根据实际情况自行决定单个平台用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。你可根据自己的需要自行备份本服务中的相关数据。<br>
        3如果你停止使用本服务或服务被终止或取消，币前线可以从服务器上永久地删除你的数据。服务停止、终止或取消后，币前线没有义务向你返还任何数据。<br>
      </p>
      <p>
        八、【风险及免责】<br>
        1.您理解并同意，本服务仅为平台用户提供信息分享、传播及获取的平台，您必须为自己注册帐户下的一切行为负责，
        包括您所发表内容的真实性、合法性、准确性、有效性，以及承担因本服务使用行为产生的结果。平台用户应对币前线媒体平台中的内容自行加以判断，并承担因使用内容而引起的所有风险，
        包括因对内容真实性、合法性、准确性、有效性的依赖而产生的风险。币前线无法且不会对因平台用户行为而导致的损失或损害承担责任。<br>
        如果你发现任何人违反本协议规定或以其他不当的方式使用币前线媒体平台服务，请立即向币前线媒体平台举报或投诉，我们将依法进行处理。<br>
        2.您理解并同意，因业务发展需要，币前线保留单方面对本服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销的权利，平台用户需承担此风险。<br>
      </p>
      <p>
        九、【知识产权声明】<br>
        1.币前线在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归币前线所有，平台用户在使用本服务中所产生的内容的知识产权归平台用户或相关权利人所有。<br>
        2. 除另有特别声明外，币前线提供本服务时所依托软件的著作权、专利权及其他知识产权均归币前线所有。<br>
        3.币前线在本服务中所使用的“币前线”等商业标识，其著作权或商标权归技术呢财经所有。<br>
        4.上述及其他任何本服务包含的内容的知识产权均受到法律保护，未经币前线、平台用户或相关权利人书面许可，任何人不得以任何形式进行使用或创造相关衍生作品。<br>
      </p>
      <p>
        十、【法律责任】<br>
        1.如果币前线发现或收到他人举报或投诉平台用户违反本协议约定的，币前线有权不经通知随时对相关内容进行删除，
        并视行为情节对违规帐号处以包括但不限于警告、删除部分或全部订阅用户、限制或禁止使用全部或部分功能、帐号封禁直至注销的处罚，并公告处理结果。<br>
        2.您理解并同意，腾讯有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何人士采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，平台用户应独自承担由此而产生的一切法律责任。<br>
        3.您理解并同意，因您违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，您应当赔偿币前线与合作公司、关联公司，并使之免受损害。<br>
      </p>
      <p>
        十一、【协议的生效与变更】<br>
        1. 您使用本服务即视为您已阅读并同意受本协议的约束。<br>
        2. 币前线有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的协议条款。<br>
        3.本协议条款变更后，如果您继续使用币前线媒体平台服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用本服务。<br>
      </p>
      <p>
        十二、【其他】<br>
        1. 本协议签订地为中华人民共和国成都市高新区。<br>
        2.本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。<br>
        3.若您和币前线之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。<br>
        4. 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。<br>
        5. 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。<br>
      </p>
      <span slot="footer" class="dialog-footer">
    <el-button class="foterBtn" type="primary" @click="closewidon()">确 定</el-button>
  </span>
    </el-dialog>
  </el-form>
</template>
<style>
  .agreement-box > .el-dialog {
    height: 90%;
    min-height: 500px;
    font-size: .18rem;
  }
.agreement-box  .el-dialog__headerbtn {
  height: .3rem!important;
  background: none;
  top: .14rem;
}
  .agreement-box > .el-dialog > .el-dialog__header, .agreement-box > .el-dialog > .el-dialog__footer {
    height: 8%;
    padding: 0;
    position: relative;
  }

  .agreement-box .el-dialog__title, .agreement-box .dialog-footer {
    display: block;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
  }

  .agreement-box .dialog-footer {
    margin-top: -20px;
  }

  .agreement-box .el-dialog__title {
    margin-top: -12px;
  }

  .agreement-box > .el-dialog > .el-dialog__body {
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    height: 84%;
    overflow: auto;
  }

  .width-59 {
    width: 65% !important;
  }

  .width-59 input {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-right: none;
  }

  .none-btn {
    width: 35%;
    border-left: none !important;
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
    background-color: #1ba1ff;
    border-color: #1ba1ff;
    color: #FFFFff !important;
    text-align: center;
    padding: 12px 0 !important;
  }

  .submint-btn {
    width: 100%;
    color: #FFFFff!important;

  }
  .el-checkbox__label{
    padding: 0!important;
  }
  .verifyBtu{
    top:.25rem!important;
    height: .36rem!important;
    background: #222842 !important;
    border: none!important;
    padding-top: .08rem;
  }
  .verifyBtu:focus{
    border: none !important;
    outline: none;
  }
  .title-left .el-checkbox__label{
    margin-left: .1rem;
  }
  .title-left .cursor-pointer{
    color: #06c5d2;
  }
  .verifyBtu:before{
    background-color: rgb(34, 40, 66)!important;
  }
  .changlab{
    margin: -10px 0 0 0;
  }
  @media screen and (max-width: 454px) {
    .verifyBtu {
      top: .5rem !important;
      font-size: 0.16rem;
    }

    .foterBtn {
      height: .36rem !important;
      margin-top: .08rem !important;
      line-height: 0rem !important;
    }

    .el-dialog__body p {
      font-size: .18rem;
    }
    .agreement-box > .el-dialog{
      margin-top: 1vh!important;
    }
    .changlab .el-form-item__content{
      line-height: 20px!important;
    }
    .changlab{
      margin-top: 0;
    }
  }
</style>
<script>
  export default {
    props: ['fromVal', 'fromListch', 'changeFrom', 'noLable', 'btnName', 'checkType', 'remember', 'resfort', 'disableBtn', 'disabledVerfy', 'disabled'],
    data () {
      var phone = (rule, value, callback) => {
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!value) {
          return callback(new Error('请输入手机号'))
        } else if (!myreg.test(value)) {
          return callback(new Error('手机号不正确'))
        } else {
          callback()
        }
      }
      var name = (rule, value, callback) => {
        const myreg = /[\u4e00-\u9fa5]/
        if (!value) {
          return callback(new Error('请输入姓名'))
        } else if (!myreg.test(value)) {
          return callback(new Error('请输入中文'))
        } else {
          callback()
        }
      }
      var idCard = (rule, value, callback) => {
        const myreg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
        if (!value) {
          return callback(new Error('请输入身份证'))
        } else if (!myreg.test(value)) {
          return callback(new Error('身份证输入有误'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        // const regPaw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        const regPaw = /^[^ ]+$/
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 8) {
          callback(new Error('密码长度不少于8位'))
        } else if (value.length > 16) {
          callback(new Error('密码长度不超出16位'))
        } else if (!regPaw.test(value)) {
          callback(new Error('密码中不能包含空格'))
        } else {
          if (this.ruleForm.checkPass !== '' && this.ruleForm.checkPass) {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var confirmPhoen = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认手机号'))
        } else if (value !== this.ruleForm.newPhone) {
          callback(new Error('两次输入手机号不一致!'))
        } else {
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var coder = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入验证码'))
        } else if (value.length < 6) {
          return callback(new Error('验证码字数为6位'))
        } else {
          callback()
        }
      }
      var email = (rule, value, callback) => {
        const myreg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!value) {
          return callback(new Error('输入邮箱'))
        } else if (!myreg.test(value)) {
          return callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      }
      var account = (rule, value, callback) => {
        const myreg = /^[0-9]*$/// 纯数字就验证手机，不是就验证邮箱
        const phone = /^[1][3,4,5,7,8][0-9]{9}$/
        const email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!value) {
          return callback(new Error('输入手机或邮箱'))
        }
        if (myreg.test(value)) {
          if (!phone.test(value)) {
            return callback(new Error('手机格式不正确'))
          }
        } else if (!email.test(value)) {
          return callback(new Error('邮箱格式不正确'))
        }
        callback()
      }
      return {
        dialogVisible: false,
        ruleForm: this.fromVal,
        checked: false,
        pwdchecked: true,
        acutchecked: false,
        disableType: false,
        rules: {
          account: [
            {validator: account, trigger: 'blur'}
          ],
          name: [
            {validator: phone, trigger: 'blur'}
          ],
          idNum: [
            {validator: idCard, trigger: 'blur'}
          ],
          phone: [
            {validator: phone, trigger: 'blur'}
          ],
          pwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          code: [
            {validator: coder, trigger: 'blur'}
          ],
          mail: [
            {validator: email, trigger: 'blur'}
          ],
          newPhone: [
            {validator: phone, trigger: 'blur'}
          ],
          checknewPhone: [
            {validator: confirmPhoen, trigger: 'blur'}
          ]
        }
      }
    },
    mounted: function () {
      localStorage.getItem('acutchecked') == 'true' ? this.acutchecked = true : this.acutchecked = false
      this.$emit('activenumber', '3')
  },
    computed: {
      pokerHistory () {
        return this.changeFrom
        return this.fromVal
      }
    },
    watch: {
      changeFrom (newValue, oldValue) {
        if (newValue) {
          this.$refs['ruleForm'].resetFields()
        }
      },
      fromVal (newValue, oldValue) { // 监听不同的登录方式
        if (newValue) {
          this.ruleForm = newValue
          this.$refs['ruleForm'].resetFields()
        }
      }
    },
    methods: {
      handleCheckedCitiesChange (data) {
        this.$emit('cheacked', data)
      },
      forginPwd () {
        this.$emit('forgetPWd', '/forget')
      },
      focusType (item) {
        item.blurType = true
      },
      blurType (item) {
        item.blurType = false
      },
      submitForm: function (formName, even) {
        let _this = this
        _this.$refs[formName].validate(function (valid) {
          if (valid) {
            if (_this.checkType && !_this.checked) {
              _this.$message.error('请接受协议')
              return
            }
            _this.$emit('submintFun', _this.ruleForm, even.currentTarget, _this.$refs[formName], _this.pwdchecked)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      verify: function (name, obj) { // 发送验证码
        let _this = this
        this.$refs.ruleForm.validateField(name, function (data) {
          if (!data) {
            _this.$emit('loginStaus')
            _this.$emit('verifnumber', obj.currentTarget, _this.ruleForm)
          }
        })
      },
      openwidon () { // 协议弹窗
        this.dialogVisible = true
      },
      closewidon (done) { // 关闭协议弹出框
        this.dialogVisible = false
        this.pwdchecked = true
      }
    }
  }
</script>
