<template>
  <div class="mod-config">
    <h2>个人薪资信息</h2>
    <h3>姓名：{{dataForm.name}}</h3>
    <h3>工号：{{dataForm.jobnumber}}</h3>
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="getDataList()"
             label-width="auto" style="padding: 0 40%">
      <div class="tagMsg">
        <el-tag>基本工资：</el-tag>
        <el-tag type="info">{{dataForm.basicsalary}}元</el-tag>
      </div>
      <div class="tagMsg">
        <el-tag>项目奖金：</el-tag>
        <el-tag type="info">{{dataForm.bonus}}元</el-tag>
      </div >
      <div class="tagMsg">
        <el-tag>午餐补助：</el-tag>
        <el-tag type="info">{{dataForm.lunchsalary}}元</el-tag>
      </div>

     <div class="tagMsg">
       <el-tag>交通补助：</el-tag>
       <el-tag type="info">{{dataForm.trafficsalary}}元</el-tag>
     </div>
      <div class="tagMsg">
        <el-tag>应发工资：</el-tag>
        <el-tag type="danger">{{dataForm.allsalary}}元</el-tag>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
      }
    }
  },
  activated () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      this.$http({
        url: this.$http.adornUrl(`/dzu/salary/formList`),
        method: 'get',
        params: this.$http.adornParams({
          'jobNumber': this.$store.state.user.name
        }
        )
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          if (data.page.list.length !== 0) {
            this.dataForm = data.page.list[0]
          } else {
            this.$message.error('没有您的工资表，请联系管理员')
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.tagMsg {
  padding-top: 60px;
}
</style>
