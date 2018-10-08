<template>
  <div class="small-box skin-bg">
    <h3 class="title-name">{{$t("headline.news")}}</h3>
    <ul>
      <li class="new-list" v-for="(item,index) in newList">
        <div class="ellipsis-2" @click="openNew(item.href)" :title="item.content">{{item.content}}</div>
        <div class="list-time">{{item.time}}</div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .new-list {
    padding: 0 0.3rem 0 0.15rem;
    margin-bottom: 0.15rem;
  }

  .ellipsis-2 {
    cursor: pointer;
    height: 0.35rem;
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
        newList: [

          {
            content: '纽约大学已开始在美国开设第一个区块链课程',
            href: 'https://www.ccn.com/nyu-offers-first-crypto-major-in-us-sees-exponential-increase-in-interest/'
          },

          {
            content: '于以太坊的Brave浏览器被列为谷歌浏览器可行替代品',
            href: 'https://www.ccn.com/ethereum-based-brave-already-considered-as-viable-alternative-to-chrome/'
          },

          {
            content: '西反垄断监管机构—经济防卫行政委员会(CADE)最近发起了一项调查，调查该国的银行是否有意通过限制其业务来损害加密货币交易所',
            href: 'https://www.ccn.com/brazils-antitrust-watchdog-probes-banks-for-restricting-crypto-exchanges/'
          },

          {
            content: '球市场观察(Global market Insights)报告称：到2024年市场将达到160亿美元。报告指出，风险投资家对区块链技术的大量投资推动了亚太地区的增长',
            href: 'https://www.entrepreneur.com/article/320312/'
          },

          {
            content: '大利亚金融监管机构严厉打击“误导”ICO和加密基金',
            href: 'https://www.ccn.com/australias-financial-watchdog-cracks-down-on-misleading-icos-crypto-funds/'
          }
        ]
      }
    },
    methods: {
      openNew (href) {
        if (window.require) {
          const {shell} = window.require('electron').remote
          shell.openExternal(href)
        }
      }
    }
  }
</script>
