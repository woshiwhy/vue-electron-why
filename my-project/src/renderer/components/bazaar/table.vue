<template>
  <div class="hello" @click="back">
      {{msg}}{{one}}{{two}}{{three}}{{four}}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: this.$store.state.author,
        one: this.$route.query.id,
        two: '1',
        three: '2',
        four: '3'
      }
    },
    created () {
      this.websocket()
  console.log(this.$route.query)
  },
    methods: {
      back () {
        this.$router.push({path: '/'})
      },
      websocket () {
        let ws = new WebSocket('ws://118.25.40.163:8088')
        ws.onopen = () => {
          this.two = '数据发'
          // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send('Holle')
          console.log('数据发送中...')
        }
        ws.onmessage = evt => {
          this.three = '数据已接收'
          console.log('数据已接收...')
        }
        ws.onclose = function () {
          // 关闭 websocket
          this.four = '连接已关闭'
          console.log('连接已关闭...')
        }
        // 路由跳转时结束websocket链接
        this.$router.afterEach(function () {
          ws.close()
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  h1, h2 {
    /*background:$red-color;*/
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
