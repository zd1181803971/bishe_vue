<template>
  <div class="mod-config">
    <h3>个人薪资信息</h3>
    <h4>您的姓名：{{dataForm.name}}</h4>
    <h4>您的工号：{{dataForm.jobnumber}}</h4>
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="getDataList()"
             label-width="auto">
      <el-form-item label="基本工资：" prop="basicsalary">
        {{dataForm.basicsalary}}
      </el-form-item>
      <el-form-item label="项目奖金：" prop="bonus">
        {{dataForm.bonus}}
      </el-form-item>
      <el-form-item label="午餐补助：" prop="lunchsalary">
        {{dataForm.lunchsalary}}
      </el-form-item>
      <el-form-item label="交通补助：" prop="trafficsalary">
        {{dataForm.trafficsalary}}
      </el-form-item>
      <h3>      <el-form-item label="应发工资：" prop="allsalary">
        {{dataForm.allsalary}}
      </el-form-item></h3>
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
