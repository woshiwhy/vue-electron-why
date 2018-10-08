<!-- 线性图表 -->
<template>
  <div :id="id" class="chart" :style="{height:chartHeight,width:chartWidth}"></div>
</template>

<script>
  import echarts from 'echarts'
export default {
    name: 'line-chart',
    components: {},
    data () {
      return {
        id: this.generatorOnlyId(),
        defaultSkin: {
          xAxisYAxis: '#9fa2af'
        },
        skinOne: {
          xAxisYAxis: '#4e5b85'
        },
        chartHeight: '3rem',
        chartWidth: '50%',
        setOBj: {}
      }
  },
    props: {
      grid: {},
      showTye: {

      },
      color: {

      },
      xAxisData: {
        type: Array,
        default () {
          // 横坐标
          return []
        }
      },
      yAxisData: {
        type: Array,
        default () {
          // 图表数据
          return []
        }
      }
    },
    computed: {
      skinType () { // 皮肤状态
        return this.$store.state.skinType
      }
    },
    watch: {
      xAxisData (n, o) {
        this.chartDaw(this.setOBj)
      },
      skinType (n, o) {
        this.drawChart()
      }
    },
    methods: {
      chartDaw (obj) {
        clearTimeout(obj.throttle)
        obj.throttle = setTimeout(() => {
          this.drawChart()
        }, 100)
      },
      // 生成图表的唯一ID
      generatorOnlyId () {
        return (
        //          this.$moment().format("YYYYMMDDHHmmssSSS") +
          'chart' + Math.floor(Math.random() * 10000)
        )
      },
      // 绘制图表
      drawChart () {
        let chart = echarts.init(document.getElementById(this.id))
        let chartSkin = this.skinType == 0 ? this.defaultSkin : this.skinOne
        if (chart == undefined) {
          console.error(`echarts init dom id ${this.id} failed`)
          return
        }
        chart.setOption(this.generatorLineOption(chartSkin))
        window.addEventListener('resize', () => {
          this.chartResize(chart)
        })
      },
      chartResize (chart) {
        clearTimeout(chart.throttle)
        chart.throttle = setTimeout(function () {
          chart.resize()
        }, 1000)
      },
      generatorLineOption (skin) {
        const _this = this
        return {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData,
            axisLine: {
              onZero: false,
              lineStyle: { // X轴设置
                color: skin.xAxisYAxis
              }
            }

          },
          yAxis: {
            type: 'value',
            min: 0,
            max: function (val) {
              const buyNumber = _this.$store.state.sopttrading.maxBuy
              const sellNumber = _this.$store.state.sopttrading.maxSell
              if (val.max < 0) {
                return 0
              }
              if (_this.type == 'buy') {
                _this.$store.dispatch('maxBuy', val.max)
              } else {
                _this.$store.dispatch('maxSell', val.max)
              }
              return parseInt(buyNumber > sellNumber ? buyNumber : sellNumber)
            },
            show: this.showTye, //  不显示Y轴
            position: 'right',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: { // Y轴设置
                color: skin.xAxisYAxis
              }
            }
          },
          grid: this.grid, // 图形位置

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          series: [
            {
              name: '交易量',
              data: this.yAxisData,
              type: 'line',
              symbol: 'none',

              itemStyle: {
                normal: {
                  color: this.color
                }
              },
              areaStyle: {
                normal: {
                  color: this.color
                }
              }
            }
          ]
        }
      }
    },
    created () {
    //      this.generatorWithAndHeight();
    },
    mounted () {
      this.drawChart()
  }

  }
</script>

<style scoped>
  .chart {
    text-align: center;
    margin: 0 auto;
    /* position: relative;
    left: 50%;
    margin-left: -45%;
    box-shadow: 0 0 10px #726dd1;
    border-radius: 10px; */
  }
</style>
