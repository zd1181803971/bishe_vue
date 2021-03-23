<template>
  <div class="mod-demo-echarts">
    <h2>企业运营支撑</h2>
<!--    <el-alert-->
<!--      title="提示："-->
<!--      type="warning"-->
<!--      :closable="false">-->
<!--      <div slot-scope="description">-->
<!--        <p class="el-alert__description">1. 此Demo只提供ECharts官方使用文档，入门部署和体验功能。具体使用请参考：http://echarts.baidu.com/index.html</p>-->
<!--      </div>-->
<!--    </el-alert>-->

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartBarBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chartLine: null,
      chartBar: null,
      chartLineData: [],
      chartLineList: [],
      chartLineNumberList: [],
      ChartBarData: [],
      ChartBarList: []
    }
  },
  mounted () {
    this.initChartLine()
    this.initChartBar()
  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartLine) {
      this.chartLine.resize()
    }
    if (this.chartBar) {
      this.chartBar.resize()
    }
  },
  methods: {
    // 折线图
    initChartLine () {
      let sum = 0
      this.$http({
        url: this.$http.adornUrl('/dzu/employee/chartLine'),
        method: 'get'
      }).then(({data}) => {
        this.chartLineData = data.data
        for (let i = 0; i < Object.keys(this.chartLineData).length; i++) {
          this.chartLineList.push(Object.keys(this.chartLineData)[i])
        }
        for (let i = 0; i < Object.values(this.chartLineData).length; i++) {
          sum += parseInt(Object.values(this.chartLineData)[i])
          this.chartLineNumberList.push(Object.values(this.chartLineData)[i])
        }
        this.chartLineList.push('总计')
        this.chartLineNumberList.push(sum)

        var option = {
          title: {
            text: '公司人口总量',
            subtext: '员工毕业院校'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
              data: ['西安电子科技学校', '海南侨中', '武汉大学', '西北大学', '哈尔滨理工大学', '华胥中学', '深圳大学', '清华大学', '总计'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              boundaryGap: [0, 0.01],
              minInterval: 1,
              axisLabel: {
                formatter: '{value} 人'
              }
            }
          ],
          series: [
            {
              name: '员工人数',
              type: 'bar',
              barWidth: '60%',
              data: this.chartLineNumberList
            }
          ]
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
        this.chartLine.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      })
    },
    // 柱状图
    initChartBar () {
      this.$http({
        url: this.$http.adornUrl('/dzu/salary/getChartBar'),
        method: 'get'
      }).then(({data}) => {
        this.ChartBarData = data.salaryData
        for (let i = 0; i < Object.keys(this.ChartBarData).length; i++) {
          this.ChartBarList.push({
            value: Object.values(this.ChartBarData)[i],
            name: Object.keys(this.ChartBarData)[i]
          })
        }

        var option = {
          title: {
            text: '员工薪资水平',
            subtext: '绝对真实',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['2k-3k', '3k-5k', '5k-8k', '8k-10k', '10k以上']
          },
          series: [
            {
              name: '薪资水平',
              type: 'pie',
              radius: '50%',
              data: this.ChartBarList,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
        this.chartBar.setOption(option)
        window.addEventListener('resize', () => {
          this.chartBar.resize()
        })
      })
    }

  }
}
</script>

<style lang="scss">
.mod-demo-echarts {
  > .el-alert {
    margin-bottom: 10px;
  }
  > .el-row {
    margin-top: -10px;
    margin-bottom: -10px;
    .el-col {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .chart-box {
    min-height: 400px;
  }
}
</style>
