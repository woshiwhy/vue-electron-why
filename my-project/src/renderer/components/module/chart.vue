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
        chartHeight: '500px',
        chartWidth: '1000px'
      }
  },
    props: {
      chartType: {
        type: String,
        default () {
          // 图表类型 line/bar/pie
          return 'line'
        }
      },
      titleText: {
        type: String,
        default () {
          // 主标题
          return ''
        }
      },
      subText: {
        type: String,
        default () {
          // 次级标题
          return ''
        }
      },
      xText: {
        type: String,
        default () {
          // 横轴文本
          return 'x-text'
        }
      },
      yText: {
        type: String,
        default () {
          // 纵轴文本
          return 'y-text'
        }
      },
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
        let categoryData = []
        let values = []
        for (let i = 0; i < this.chartData.length; i++) {
          categoryData.push(this.chartData[i].splice(0, 1)[0])
          values.push(this.chartData[i])
        }
        return {
          categoryData: categoryData,
          values: values
        }
      },
      xAxisData () {
        return this.chartData.map(function (item) {
          return item[0]
        })
      },
      yAxisData () {
        return this.chartData.map(function (item) {
          return item[1]
        })
      }
    },
    methods: {
      result (dayCount) {
        let result = []
        for (let i = 0, len = this.categoryData.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-')
            continue
          }
          let sum = 0
          for (let j = 0; j < dayCount; j++) {
            sum += this.categoryData.values[i - j][1]
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
        let chart = echarts.init(document.getElementById(this.id))
        if (chart == undefined) {
          console.error(`echarts init dom id ${this.id} failed`)
          return
        }
        switch (this.chartType) {
          case 'line':
            chart.setOption(this.generatorLineOption())
            break
          case 'bar':
            chart.setOption(this.generatorBarOption())
            break
          case 'pie':
            chart.setOption(this.generatorPieOption())
            break
          case 'kandlie':
            chart.setOption(this.stockOption())
            break
          default:
            console.error(`chartType ${this.chartType} is invalid`)
            break
        }
        let work = null
        window.addEventListener('resize', () => {
          if (work == null) {
            work = setTimeout(function () {
              chart.resize()
              work = null
            }, 100)
          }
        })
      },
      generatorLineOption () {
        return {
          title: {
            text: this.titleText,
            subtext: this.subText,
            x: 'center'
          },
          xAxis: {
            type: 'category',
            data: this.xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.yAxisData,
              type: 'line'
            }
          ]
        }
      },
      generatorBarOption () {
        return {
          title: {
            text: this.titleText,
            subtext: this.subText,
            x: 'center'
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.xAxisData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: this.yText,
              type: 'bar',
              barWidth: '60%',
              data: this.yAxisData
            }
          ]
        }
      },
      generatorPieOption () {
        let pieData = []
        for (let index in this.xAxisData) {
          pieData.push({
            value: this.yAxisData[index],
            name: this.xAxisData[index]
          })
        }
        return {
          title: {
            text: this.titleText,
            subtext: this.subText,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.xAxisData
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      },
      stockOption () {
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
            }
          },

          legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            data: this.categoryData.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: {
              onZero: false,
              lineStyle: { // X轴设置
                color: '#9fa2af'
              }
            },
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          },
          yAxis: {
            position: 'right',
            scale: true,
            splitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#f5f5f5']
              }
            },
            axisLine: {
            //                show:false,//是否显示轴线
              lineStyle: { // Y轴设置
                color: '#9fa2af'
              }
            },
            splitArea: {
              show: false// 关闭网格
            }
          },
          dataZoom: [
            {
              type: 'inside',
              start: 50,
              end: 100
            },
            {
              show: true,
              type: 'slider',
              y: '90%',
              start: 50,
              end: 100
            }
          ],
          series: [
            {
              name: '日K',
              type: 'candlestick',
              data: this.categoryData.values,
              itemStyle: {
                normal: {
                  color: '#ec0000',
                  color0: '#00da3c', // 卖入柱状图
                  borderColor: '#8A0000',
                  borderColor0: '#008F28'
                }
              },
              markPoint: {
                label: {
                  normal: {
                    formatter: function (param) {
                      return param != null ? Math.round(param.value) : ''
                    }
                  }
                },
                data: [
                  {
                    name: 'XX标点',
                    coord: ['2013/5/31', 2300],
                    value: 2300,
                    itemStyle: {
                      normal: {color: 'rgb(41,60,85)'}
                    }
                  },
                  {
                    name: 'highest value',
                    type: 'max',
                    valueDim: 'highest'
                  },
                  {
                    name: 'lowest value',
                    type: 'min',
                    valueDim: 'lowest'
                  },
                  {
                    name: 'average value on close',
                    type: 'average',
                    valueDim: 'close'
                  }
                ],
                tooltip: {
                  formatter: function (param) {
                    return param.name + '<br>' + (param.data.coord || '')
                  }
                }
              },
              markLine: {
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
            //            {
            //              name: 'MA20',
            //              type: 'line',
            //              data: this.result(20),
            //              smooth: true,
            //              lineStyle: {
            //                normal: {opacity: 0.5}
            //              }
            //            },
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
            }

          ]
        }
      }
    },
    watch: {},
    created () {
      this.generatorWithAndHeight()
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
