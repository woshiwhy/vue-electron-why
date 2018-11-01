/**
 * Created by Administrator on 2018/6/28.
 */
// 注意：一定是 exports，不是 export，否则会报错，报错信息是下列的中的内容不是 string
import enLocale from 'element-ui/lib/locale/lang/en' //引入element语言包
const en = {
    // 小标题
    headline: {
        common: 'Functions',
        query: 'Search',
        airdrop: 'Airdrops',
        innovate: 'Newcomers',
        potential: 'BlackHorse',
        arbitrage: 'Real-Time Monitoring',
        rankinglist: 'Profit Ranking',
        news: 'News',
        master: 'Experts',
        platformset: 'Settings',
        balance: 'Balances',
        deal: 'Fast Trading',
        buydepth: 'Buying Depth',
        selldepth: 'Selling Depth',
        market: 'Market',
        comparison: 'Coin Pairs',
        buy: 'Long',
        sell: 'Short',
        buyHistory: 'Buying History',
        sellHistory: 'Selling History',
        setPlan: 'Strategy Parameters',
        planset: 'Strategy Setup',
        recommendPlan: 'Recommended Strategy',
        myPlan: 'My Strategy',
        runHistory: 'History',
        earnings: 'Profits',
        personal: 'Personal Information',
        account: 'Account Information',
        loginHistory: 'Login History',
        bind: 'Verifications'
    },
    // 提示语
    tip: {
        assets: 'You have no assets on the exchange',
        tip1: 'Selected exchange API has not been provided ',
        tip2: 'Go now',
        ratio: 'Execution Ratio',
        maxNumber: 'Max Volume PerTrade',
        minNumber: 'Mini Volume PerTrade',
        balance: 'AssetBalance',
        trigger: 'Trigger',
        tip3: 'If the coins value difference between exchanges exceeds',
        tip4: 'Do you wish to replace existing strategy',
        tip5: 'Are you sure that you wish to delete this strategy？',
        tip6: 'Selecting strategy is running, do you wish to terminate and delete this strategy ？',
        tip7: 'Deletion Success',
        tip8: 'Trading Volume',
        tip9: 'Return on Equity',
        tip10: 'Returns',
        tip11: 'Unavailable ',
        tip12: 'Your API keys',
        tip13: 'Please provide your API keys',
        tip14: 'Please provide your passwords ',
        account: 'Account',
        passWord: 'Password',
        email: 'Email',
        phone: 'Phone Number',
        name: 'Alias',
        sex: 'Sex',
        man: 'Male',
        woman: 'Female',
        resume: 'Profile',
        birth: 'Birthday'

    },
    // 导航
    navName: {
        home: 'Home',
        spot: 'Spot Market',
        auto: 'Auto Trading',
        international: 'MarketTrends',
        binding: 'Authorizations',
        account: 'Account'
    },
    // tab导航
    tabname: {
        all: 'All',
        today: 'Today',
        week: 'Week',
        month: 'Month',
        kGraph: 'Charts',
        entry: 'Orders',
        depth: 'Market Depth',
        history: 'History',
        account: 'Security'
    },
    // 表格
    tableheder: {// 应该是tableheader，不是tableheder，抬头的意思嘛//
        trendChart: 'Trend Chart',
        planName: 'Strategy Name',
        number: 'Ordering',
        time: 'Duration',
        beginTime: 'Starting Time',
        endTime: 'Ending Time',
        direction: 'Actions',
        wtwtsl: 'Amount',
        wtwtjg: 'Price',
        turnover: 'Turnover',
        operation: 'Operation',
        addUp: 'Total',
        type: 'Status',
        profit: 'Profit',
        spread:'spread',
        spreadrate:'Spread Rate',
        buybazaar: 'Buy Market',
        moneyfor: 'Coin Pair',
        sellbazaar: 'Sale Market',
        price: 'Price',
        amount: 'Amount',
        bazaar: 'Exchanges',
        interest: 'Returns',
        Trigger: 'Trigger Auto-Balance',
        timeMore: '24HHigh',
        timeMin: '24HLow',
        increase: 'Increases',
        key: 'APIKey',
        theKey: 'Exchange Key',
        currency: 'Coins',
        usable: 'Available',
        usable1: 'Available',
        freeze: 'Freeze',
        LoginTime: 'Log in Time',
        address: 'address'

    },
    // 输入框提示
    placeholder: {
        bazzerName: 'Default Exchanges',
        currencyName: 'Search by Coin Name',
        seekBazzer: 'Exchanges',
        planName: 'Strategy Name',
        seekPlan: 'Search by Strategy Name',
        SelectDate: ' Selecting a date'
    },
    // 按钮
    btnname: {
        addPlay: 'Add Strategy',
        update: 'Add Assets',
        more: 'More',
        sort: 'Sort',
        close: 'Close',
        bind: 'Associating API',
        buy: 'Buy',
        sell: 'Sell',
        default: 'Default Exchanges',
        language: 'Language',
        save: 'Save',
        saveInfor: 'Save Changes',
        runPlan: 'Execute Strategy ',
        cancelPlan: 'Terminate Strategy',
        tryOut: 'Trails',
        execute: 'Running',
        unExecute: 'Waiting',
        change: 'Modify'
    },
    task: {
        task: 'Task',
        MyCredits: ' My credits',
        credits: 'credits',
        Basic: 'Basic Quest',
        BasicTitle: 'Complete the task to earn points',
        doItnow: 'do it now',
        completed: 'completed',
        inviteFriends: 'Friends invite',
        inviteTitle: 'The first level invites 30 credits; the second level invites 20 credits',
        record: 'My record',
        Firstlevel: 'Number of first-level friends',
        Secondary: 'Number of second-level friends',
        copyLink: 'copy link',
        viewQRcode: 'View QR code',
        obtion: 'Get points',
        rule: 'Invite rules',
        rule1: '1、30 points reward,  everytime your direct invite (first tier invite) register at Bitbus；',
        rule2: "2、20 points reward, everytime your direct invite's direct invite(second tier invite) register at Bitbus；",
        rule3: '3、 all rights reserved to Bitbus regarding to invitation program, if fake invitation were found, violators will be disqualified.'
    },
    lang: {
        eng: 'English',
        cng: '中文'
    },
    enLocale
}

export default en;


