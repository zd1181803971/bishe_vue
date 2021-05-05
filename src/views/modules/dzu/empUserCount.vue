<template>
  <div class="mod-demo-echarts">
    <el-alert
      title="提示：数据展现的是公司员工分布情况"
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
      msgDataList: [],
      chartLine: null,
      chartBar: null,
      chartBar2: null,
      chartLineData: [],
      chartLineList: [],
      chartLineNumberList: [],
      ChartBarData: [],
      ChartBarList: [],
      titleIndex: 0
    }
  },
  mounted () {
    this.initChartLine()
    this.initChartBar()
    this.initChartBar2()
  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartLine) {
      this.chartLine.resize()
    }
    if (this.chartBar) {
      this.chartBar.resize()
    }
    if (this.chartBar2) {
      this.chartBar2.resize()
    }
  },
  methods: {
    initChartLine () {
      this.$http({
        url: this.$http.adornUrl('/dzu/employee/chartLine'),
        method: 'get'
      }).then(({data}) => {
        this.chartLineData = data.data
        for (let i = 0; i < Object.keys(this.chartLineData).length; i++) {
          this.chartLineList.push(Object.keys(this.chartLineData)[i])
        }
        for (let i = 0; i < Object.values(this.chartLineData).length; i++) {
          this.chartLineNumberList.push(Object.values(this.chartLineData)[i])
        }
        var option = {
          title: {
            text: '员工毕业院校',
            subtext: '展现的是员工所属毕业院校分布情况'
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
              data: this.chartLineList,
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

    // 1
    initChartBar () {
      this.$http({
        url: this.$http.adornUrl('/dzu/joblevel/getJobLeaveForm'),
        method: 'get'
      }).then(({data}) => {
        this.ChartBarData = data.JobleaveForm.list
        for (let i = 0; i < this.ChartBarData.length; i++) {
          if (this.ChartBarData[i].count !== 0 && this.ChartBarData[i].count !== null) {
            this.ChartBarList.push({
              value: this.ChartBarData[i].count,
              name: this.ChartBarData[i].name
            })
          }
        }

        var option = {
          title: {
            text: '员工职位人数',
            subtext: '展现的是所有员工职位分布情况',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.ChartBarList.map(item => {
              return item.name
            })
          },
          series: [
            {
              name: '员工人数',
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
        url: this.$http.adornUrl('/dzu/employee/getDeptAndEmpCount'),
        method: 'get'
      }).then(({data}) => {
        var option = {
          title: {
            text: '部门员工情况',
            subtext: '展现的是所有员工部门分布情况',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: data.deptAndEmpCount.map(d => d.name)
          },
          series: [
            {
              name: '员工人数',
              type: 'pie',
              radius: '50%',
              data: data.deptAndEmpCount,
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
