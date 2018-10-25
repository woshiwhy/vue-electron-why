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
        defaultSkin: {
          xAxisYAxis: '#9fa2af',
          yAxisLine: '#f5f5f5'
        },
        skinOne: {
          xAxisYAxis: '#4e5b85',
          yAxisLine: 'rgba(78,91,133,0.1)'
        },
        chartsObj: '',
        id: this.generatorOnlyId(),
        chartHeight: '500px',
        chartWidth: '1000px'
      }
  },
    props: {

      chartData: {
        type: Array,
        default () {
          // 图表数据
          return []
        }
      },
      width: {
        default: 0
      },
      height: {
        default: 0
      }
    },
    computed: {
      categoryData () {
        let categoryData = [];
        let values = [];
        let volumes = [];
        for (let i = 0; i < this.chartData.length; i++) {
          categoryData.push(this.chartData[i].slice(0, 1)[0]);
          values.push(this.chartData[i].slice(1, 5));
          volumes.push([i, this.chartData[i][5], this.chartData[i][1] > this.chartData[i][2] ? 1 : -1]);// 开收比较，如果收大于开=1；
        }
        return {
          categoryData: categoryData,
          values: values,
          volumes: volumes
        }
      },

      skinType () { // 皮肤状态
        return this.$store.state.skinType
      }
    },
    watch: {
      categoryData: function (n, o) {
        this.cratedObj();
        this.drawChart()
      },
      skinType (n, o) {
        this.drawChart()
      }
    },
    methods: {
      result (dayCount) {
        let result = []
        for (let i = 0, len = this.categoryData.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue
          }
          let sum = 0
          for (let j = 0; j < dayCount; j++) {
            sum += parseFloat(this.categoryData.values[i - j][1])
          }

          result.push(sum / dayCount)
        }

        return result
      },
      // 生成图表的唯一ID
      generatorOnlyId () {
        return (
        //          this.$moment().format("YYYYMMDDHHmmssSSS") +
          'chart' + Math.floor(Math.random() * 10000)
        )
      },
      // 生成渲染图表div的宽度与高度
      generatorWithAndHeight () {
        this.chartWidth = `${
          this.width ? this.width : '50%'
        }`
        this.chartHeight = `${
          this.height ? this.height : '400px'
        }`
      },
      // 绘制图表
      drawChart () {
        let chart = echarts.init(document.getElementById(this.id));
        let chartSkin = this.skinType == 0 ? this.defaultSkin : this.skinOne;
        this.chartsObj = chart;
        if (chart == undefined) {
          console.error(`echarts init dom id ${this.id} failed`);
          return
        }
        chart.setOption(this.stockOption(chartSkin))
        window.addEventListener('resize', () => {
          this.chartResize(chart)
        })
      },
      chartResize (chart) {
        clearTimeout(chart.throttle)
        chart.throttle = setTimeout(function () {
          chart.resize()
        }, 100)
      },
      stockOption (skin) { // k线图
        const _this = this
        return {
        //          backgroundColor: '#1b1b1b',//背景色
          title: {
            text: '',
            left: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            formatter (a, b, c) {
              _this.inforData(a)
            }
          },
          axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
              backgroundColor: '#777'
            }
          },
          legend: {
            data: [ 'MA5', 'MA10', 'MA30'],
            left: 0,
            top: 20,
            textStyle: {
              fontSize: 12,
              color: ['#90cd99', '#aec9e8']
            }
          },
          visualMap: {
            show: false,
            seriesIndex: 4,
            dimension: 2,
            pieces: [{
              value: 1,
              color: '#ee1e3b'
            }, {
              value: -1,
              color: '#0bbe89'
            }]
          },

          grid: [{
            left: '3%',
            right: '8%',
            height: '55%'
          },
          {
            left: '3%',
            right: '8%',
            top: '80%',
            height: '10%'
          }],
          xAxis: [ {
            type: 'category',
            data: this.categoryData.categoryData,
            scale: true,
            boundaryGap: true,
            axisLine: {
              onZero: false,
              lineStyle: { // X轴设置
                color: skin.xAxisYAxis
              }
            },
            splitLine: {show: false},
            splitNumber: 2,
            min: 'dataMin',
            max: 'dataMax'
          },
          {
            type: 'category',
            gridIndex: 1,
            data: this.categoryData.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 2,
            min: 'dataMin',
            max: 'dataMax'
          }
          ],
          yAxis: [
            {
              position: 'right',
              scale: true,
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: skin.yAxisLine
                }
              },
              axisLine: {
              //                show:false,//是否显示轴线
                lineStyle: { // Y轴设置
                  color: skin.xAxisYAxis
                }
              },
              splitArea: {
                show: false// 关闭网格
              }
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 1,
              axisLabel: {show: false},
              axisLine: {show: false},
              axisTick: {show: false},
              splitLine: {show: false}
            }
          ],
          dataZoom: [// 缩放
            {
              type: 'inside',
              xAxisIndex: [0, 1],
              start: 38,
              filterMode: 'empty', // 防止折线乱掉
              end: 100,
              minSpan: 50
            },
            {
              show: true,
              xAxisIndex: [0, 1],
              type: 'slider',
              y: '100%',
              start: 0,
              end: 100
            }
          ],

          series: [
            {
              name: '',
              type: 'candlestick',
              data: this.categoryData.values,
              itemStyle: {
                normal: {
                  color: '#0bbe89 ',
                  color0: '#ee1e3b', // 卖入柱状图
                  borderColor: '#0bbe89 ',
                  borderColor0: '#ee1e3b'
                }
              },

              markLine: {// 最大值最小值
                symbol: ['none', 'none'],
                data: [
                  [
                    {
                      name: 'from lowest to highest',
                      type: 'min',
                      valueDim: 'lowest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        normal: {show: false},
                        emphasis: {show: false}
                      }
                    },
                    {
                      type: 'max',
                      valueDim: 'highest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        normal: {show: false},
                        emphasis: {show: false}
                      }
                    }
                  ],
                  {
                    name: 'min line on close',
                    type: 'min',
                    valueDim: 'close'
                  },
                  {
                    name: 'max line on close',
                    type: 'max',
                    valueDim: 'close'
                  }
                ]
              }
            },
            {
              name: 'MA5',
              type: 'line',
              symbol: 'none',
              data: this.result(5),
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#90cd99', // 折线原点颜色
                  lineStyle: {
                    color: '#90cd99' // 折线颜色
                  }
                }
              }
            },
            {
              name: 'MA10',
              type: 'line',
              symbol: 'none',
              data: this.result(10),
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#aec9e8', // 折线原点颜色
                  lineStyle: {
                    color: '#aec9e8' // 折线颜色
                  }
                }
              }
            },
            {
              name: 'MA30',
              type: 'line',
              symbol: 'none',
              data: this.result(30),
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#d470b6', // 折线原点颜色
                  lineStyle: {
                    color: '#d470b6' // 折线颜色
                  }
                }
              }
            },
            {
              name: '量',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: this.categoryData.volumes
            }

          ]
        }
      },
      inforData (a) {
        const line_Arrey = []
        for (let v of a) {
          let json_K = {}
          const json_name = v.seriesName
          const json_data = v.data
          if (json_name == '') { // 当前hove得数据
            for (let i = 1, maxLength = json_data.length; i < maxLength; i++) {
              json_K = {}
              switch (i) {
                case 1:
                  json_K.name = '开'
                  json_K.data = json_data[i]
                  line_Arrey.push(json_K)
                  break
                case 2:
                  json_K.name = '收'
                  json_K.data = json_data[i]
                  line_Arrey.push(json_K)
                  break
                case 3:
                  json_K.name = '高'
                  json_K.data = json_data[i]
                  line_Arrey.push(json_K)
                  break
                case 4:
                  json_K.name = '低'
                  json_K.data = json_data[i]
                  line_Arrey.push(json_K)
                  break
              }
            }
          } else {
            json_K.name = json_name

            if (v.seriesName == '量') {
              json_K.data = json_data[1]
              line_Arrey.unshift(json_K)
            } else {
              json_K.data = json_data
              line_Arrey.push(json_K)
            }
          }
        }
        this.$store.dispatch('lineVal', line_Arrey)
      },
      cratedObj () {
        if (this.chartData.length == 0) {
          return
        }
        let newArrey = this.chartData.slice(this.chartData.length - 1, this.chartData.length)
        let objArry = [
          {
            seriesName: '量',
            data: this.categoryData.volumes[this.categoryData.volumes.length - 1]
          },
          {
            seriesName: '',
            data: newArrey[0]
          },
          {
            seriesName: 'MA5',
            data: this.result(5)[this.result(5).length - 1]
          },
          {
            seriesName: 'MA10',
            data: this.result(10)[this.result(10).length - 1]
          },
          {
            seriesName: 'MA30',
            data: this.result(30)[this.result(30).length - 1]
          }

        ]
        this.inforData(objArry)
      }
    },

    created () {
      this.generatorWithAndHeight()
  },
    mounted () {
      this.cratedObj();
      this.drawChart();
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
