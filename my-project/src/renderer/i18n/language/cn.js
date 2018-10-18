/**
 * Created by Administrator on 2018/6/28.
 */
// 注意：一定是 exports，不是 export，否则会报错，报错信息是下列的中的内容不是 string
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' //引入element语言包

const cn = {
    // 小标题
    headline: {
        common: '常用功能',
        query: '快捷查询',
        airdrop: '空投福利',
        innovate: '创新推荐',
        potential: '潜力推荐',
        arbitrage: '实时利润监控',
        rankinglist: '套利排行榜',
        news: '新闻',
        master: '大咖',
        platformset: '平台设置',
        balance: '账号资产',
        deal: '快捷交易',
        buydepth: '买盘深度',
        selldepth: '卖盘深度',
        market: '交易市场',
        comparison: '货币对',
        buy: '买盘',
        sell: '卖盘',
        buyHistory: '买入历史',
        sellHistory: '卖出历史',
        setPlan: '策略参数',
        planset: '策略设置',
        recommendPlan: '推荐方案',
        myPlan: '我的策略',
        runHistory: '执行历史',
        earnings: '盈利统计',
        personal: '个人信息',
        account: '账户信息',
        loginHistory: '登录历史',
        bind: '安全绑定'
    },
    // 提示语
    tip: {
        assets: '您在该交易所暂无资产',
        tip1: '您还未绑定该交易市场API',
        tip2: '马上前往',
        ratio: '触发利差比',
        maxNumber: '每次最多交易量',
        minNumber: '每次最少交易量',
        balance: '交易平衡',
        trigger: '自动触发平衡',
        tip3: '币对价值差超过',
        tip4: '已经有策略执行确认替换',
        tip5: '确认删除该方法？',
        tip6: '当前策略正在执行，是否取消并删除？',
        tip7: '删除成功',
        tip8: '交易量',
        tip9: '收益率',
        tip10: '累计利润',
        tip11: '暂无',
        tip12: '您的AIP密匙',
        tip13: '请填写API钥匙',
        tip14: '请填写密匙',
        account: '账号',
        passWord: '登录密码',
        email: '邮箱',
        phone: '手机',
        name: '昵称',
        sex: '性别',
        man: '男',
        woman: '女',
        resume: '个人简介',
        birth: '生日'
    },
    // 导航
    navName: {
        home: '首页',
        spot: '现货交易',
        auto: '自动交易',
        international: '国际行情',
        binding: '授权绑定',
        account: '账户设置'
    },
    // tab导航
    tabname: {
        all: '所有',
        today: '本日',
        week: '本周',
        month: '本月',
        kGraph: 'K线图',
        entry: '挂单',
        depth: '深度',
        history: '成交历史',
        account: '账户安全'
    },
    // 表格
    tableheder: {
        trendChart: '走势图',
        planName: '策略名称',
        number: '序号',
        time: '委托时间',
        beginTime: '开始时间',
        endTime: '结束时间',
        direction: '方向',
        wtwtsl: '委托数量',
        wtwtjg: '委托价格',
        turnover: '成交量',
        operation: '操作',
        addUp: '累计利润',
        type: '状态',
        profit: '利润',
        buybazaar: '买入市场',
        moneyfor: '币对',
        sellbazaar: '卖出市场',
        price: '价格',
        amount: '数量',
        bazaar: '交易所',
        interest: '利差比',
        Trigger: '触发平衡',
        timeMore: '24H最高价格',
        timeMin: '24H最低价格',
        increase: '涨幅',
        key: 'API钥匙',
        theKey: '密匙',
        currency: '币种',
        usable: '可用',
        usable1:'可使用',
        freeze: '冻结',
        LoginTime: '登录时间',
        address: '地点'
    },
    // 输入框提示
    placeholder: {
        bazzerName: '搜索默认交易所',
        currencyName: '搜索币对',
        seekBazzer: '请输入查找的交易所',
        planName: '新建策略名称',
        seekPlan: '请输入查找的方案',
        SelectDate: '选择日期'
    },
    // 按钮
    btnname: {
        addPlay: '新建策略',
        update: '更新资产',
        more: '更多',
        close: '关闭',
        bind: '绑定API',
        buy: '买入',
        sell: '卖出',
        default: '设置默认平台',
        language: '语言',
        save: '保存设置',
        saveInfor: '保存',
        runPlan: '执行策略',
        cancelPlan: '取消执行',
        tryOut: '试用',
        execute: '执行中',
        unExecute: '未执行',
        change: '修改'
    },
    task: {
        task: '任务中心',
        MyCredits: '我的积分',
        credits: '积分',
        Basic: '基础任务',
        BasicTitle: '完成任务赚取积分',
        doItnow: '马上完成',
        completed: '已完成',
        inviteFriends: '好友邀请',
        inviteTitle: '第一级邀请30积分;第二级邀请20积分',
        record: '我的战绩',
        Firstlevel: '一级好友数量',
        Secondary: '二级好友数量',
        copyLink: '复制链接',
        viewQRcode: '查看海报',
        obtion: '获得积分',
        rule: '邀请规则',
        rule1: '1、每邀请一个好友完成注册，你就可以获得30积分的奖励；',
        rule2: '2、你邀请的好友，其邀请一个好友完成注册，即二级好友，你将获得20积分；',
        rule3: '3、币巴士拥有法律范围内对于活动的最终解释权，并将严查虚假邀请行为，一经发现将取消奖励资格。'
    },
    lang: {
        eng: 'English',
        cng: '中文'
    },
    zhLocale
}

export default cn;

