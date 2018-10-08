<template>
  <div :id="id" class="chart" style="height:0.7rem;width: 100%;"></div>
</template>

<script>
  import echarts from 'echarts'
export default {
    props: ['id', 'newaddVal'],
    data () {
      return {
        setOBj: {}
      }
    },
    computed: {
      charketData () {
        return this.newaddVal
      },
      skinType () { // 皮肤状态
        return this.$store.state.skinType
      }
    },
    watch: {
      charketData (n, o) {
        this.chartDaw(this.setOBj)
        this.drawChart()
      },
      skinType (n, o) {
        this.drawChart()
      }
    },
    mounted () {
      this.drawChart()
  },
    methods: {
      chartDaw (obj) {
        clearTimeout(obj.throttle)
        obj.throttle = setTimeout(() => {
          this.drawChart()
        }, 100)
      },
      drawChart () {
        let chart = echarts.init(document.getElementById(this.id))
        let chartSkin = this.skinType == 0 ? '#8cb0f8' : '#4470c8'
        chart.setOption(this.generatorLineOption(chartSkin))
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
      generatorLineOption (chartSkin) {
        return {
          xAxis: {
            type: 'category',
            data: this.charketData.time,
            show: false,
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            splitNumber: 5,
            min: 'dataMin',
            max: 'dataMax',
            show: false,
            splitLine: {
              show: false
            }
          },
          grid: {
            height: '50%',
            top: '25%'
          },
          series: [{
            data: this.charketData.price,
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
              color: chartSkin
            }
          }]
        }
      }

    }
  }
  </script>
