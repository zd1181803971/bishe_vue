<template>
  <div class="mod-demo-echarts">
    <el-alert
      title="提示：这里展现的是公司员工工资分布情况以及今日报工情况"
      type="warning"
      :closable="false">

    </el-alert>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div id="J_chartBarBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartBar2Box" class="chart-box"></div>
        </el-card>
      </el-col>
<!--      <el-col :span="24">-->
<!--        <el-card>-->
<!--          <div id="J_chartLineBox" class="chart-box"></div>-->
<!--        </el-card>-->
<!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      msgDataList: [],
      chartLine: null,
      chartBar: null,
      chartBar2: null,
      chartBar2Data: [],
      chartBar2List: [],
      chartLineData: [],
      chartLineList: [],
      chartLineNumberList: [],
      ChartBarData: [],
      ChartBarList: [],
      titleIndex: 0
    }
  },
  mounted () {
    // this.initChartLine()
    this.initChartBar()
    this.initChartBar2()
  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    // if (this.chartLine) {
    //   this.chartLine.resize()
    // }
    if (this.chartBar) {
      this.chartBar.resize()
    }
    if (this.chartBar2) {
      this.chartBar2.resize()
    }
  },
  methods: {

    // 小的那俩
    initChartBar () {
      this.$http({
        url: this.$http.adornUrl('/dzu/salary/getChartBar'),
        method: 'get'
      }).then(({data}) => {
        this.ChartBarData = data.salaryData
        for (let i = 0; i < Object.keys(this.ChartBarData).length; i++) {
          if (Object.values(this.ChartBarData)[i] !== 0) {
            this.ChartBarList.push({
              value: Object.values(this.ChartBarData)[i],
              name: Object.keys(this.ChartBarData)[i]
            })
          }
        }

        var option = {
          title: {
            text: '员工薪资水平',
            subtext: '展现的是所有员工薪资分布情况',
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
              name: '薪资水平人数',
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
    },
    initChartBar2 () {
      this.$http({
        url: this.$http.adornUrl('/dzu/employeeec/getEmpClock'),
        method: 'get'
      }).then(({data}) => {
        this.chartBar2Data = data.list
        for (let i = 0; i < Object.keys(this.chartBar2Data).length; i++) {
          this.chartBar2List.push({
            value: Object.values(this.chartBar2Data)[i],
            name: Object.keys(this.chartBar2Data)[i]
          })
        }
        var option = {
          title: {
            text: '员工报工情况',
            subtext: '展现的是所有员工今日报工情况',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.chartBar2List.map(item => {
              return item.name
            })
          },
          series: [
            {
              name: '员工人数',
              type: 'pie',
              radius: '50%',
              data: this.chartBar2List,
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
        this.chartBar2 = echarts.init(document.getElementById('J_chartBar2Box'))
        this.chartBar2.setOption(option)
        window.addEventListener('resize', () => {
          this.chartBar2.resize()
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
