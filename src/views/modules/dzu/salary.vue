<template>
  <div class="mod-config">
    <h3>个人薪资信息</h3>
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="auto">

      <el-form-item label="基本工资" prop="basicsalary">
        <el-input v-model="dataForm.basicsalary" placeholder="基本工资"></el-input>
      </el-form-item>
      <el-form-item label="奖金" prop="bonus">
        <el-input v-model="dataForm.bonus" placeholder="奖金"></el-input>
      </el-form-item>
      <el-form-item label="午餐补助" prop="lunchsalary">
        <el-input v-model="dataForm.lunchsalary" placeholder="午餐补助"></el-input>
      </el-form-item>
      <el-form-item label="交通补助" prop="trafficsalary">
        <el-input v-model="dataForm.trafficsalary" placeholder="交通补助"></el-input>
      </el-form-item>
      <el-form-item label="应发工资" prop="allsalary">
        <el-input v-model="dataForm.allsalary" placeholder="应发工资"></el-input>
      </el-form-item>
      <el-form-item label="养老金基数" prop="pensionbase">
        <el-input v-model="dataForm.pensionbase" placeholder="养老金基数"></el-input>
      </el-form-item>
      <el-form-item label="养老金比率" prop="pensionper">
        <el-input v-model="dataForm.pensionper" placeholder="养老金比率"></el-input>
      </el-form-item>
      <el-form-item label="启用时间" prop="createdate">
        <el-input v-model="dataForm.createdate" placeholder="启用时间"></el-input>
      </el-form-item>
      <el-form-item label="医疗基数" prop="medicalbase">
        <el-input v-model="dataForm.medicalbase" placeholder="医疗基数"></el-input>
      </el-form-item>
      <el-form-item label="医疗保险比率" prop="medicalper">
        <el-input v-model="dataForm.medicalper" placeholder="医疗保险比率"></el-input>
      </el-form-item>
      <el-form-item label="公积金基数" prop="accumulationfundbase">
        <el-input v-model="dataForm.accumulationfundbase" placeholder="公积金基数"></el-input>
      </el-form-item>
      <el-form-item label="公积金比率" prop="accumulationfundper">
        <el-input v-model="dataForm.accumulationfundper" placeholder="公积金比率"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        eid: '',
        basicsalary: '',
        bonus: '',
        lunchsalary: '',
        trafficsalary: '',
        allsalary: '',
        pensionbase: '',
        pensionper: '',
        createdate: '',
        medicalbase: '',
        medicalper: '',
        accumulationfundbase: '',
        accumulationfundper: '',
        name: ''
      }
    }
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      this.$http({
        url: this.$http.adornUrl(`/dzu/salary/salaryEid/${this.$store.state.user.eid}`),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataForm.basicsalary = data.salary.basicsalary
          this.dataForm.bonus = data.salary.bonus
          this.dataForm.lunchsalary = data.salary.lunchsalary
          this.dataForm.trafficsalary = data.salary.trafficsalary
          this.dataForm.allsalary = data.salary.allsalary + this.dataForm.trafficsalary + this.dataForm.lunchsalary + this.dataForm.bonus + this.dataForm.basicsalary
          this.dataForm.pensionbase = data.salary.pensionbase
          this.dataForm.pensionper = data.salary.pensionper
          this.dataForm.createdate = data.salary.createdate
          this.dataForm.medicalbase = data.salary.medicalbase
          this.dataForm.medicalper = data.salary.medicalper
          this.dataForm.accumulationfundbase = data.salary.accumulationfundbase
          this.dataForm.accumulationfundper = data.salary.accumulationfundper
          this.dataForm.name = data.salary.name
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/dzu/salary/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'eid': this.dataForm.eid,
              'basicsalary': this.dataForm.basicsalary,
              'bonus': this.dataForm.bonus,
              'lunchsalary': this.dataForm.lunchsalary,
              'trafficsalary': this.dataForm.trafficsalary,
              'allsalary': this.dataForm.allsalary,
              'pensionbase': this.dataForm.pensionbase,
              'pensionper': this.dataForm.pensionper,
              'createdate': this.dataForm.createdate,
              'medicalbase': this.dataForm.medicalbase,
              'medicalper': this.dataForm.medicalper,
              'accumulationfundbase': this.dataForm.accumulationfundbase,
              'accumulationfundper': this.dataForm.accumulationfundper,
              'name': this.dataForm.name
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
