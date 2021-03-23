<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="员工工号" prop="eid">
        <el-input disabled :value="jobName" placeholder=""></el-input>
      </el-form-item>
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
        <el-input disabled v-model="dataForm.allsalary" placeholder="应发工资"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      jobName: this.$store.state.user.name,
      visible: false,
      dataForm: {
        id: 0,
        eid: '',
        basicsalary: 0,
        bonus: 0,
        lunchsalary: 0,
        trafficsalary: 0,
        allsalary: 0
      },
      dataRule: {
        eid: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        basicsalary: [
          {required: true, message: '基本工资不能为空', trigger: 'blur'}
        ],
        bonus: [
          {required: true, message: '奖金不能为空', trigger: 'blur'}
        ],
        lunchsalary: [
          {required: true, message: '午餐补助不能为空', trigger: 'blur'}
        ],
        trafficsalary: [
          {required: true, message: '交通补助不能为空', trigger: 'blur'}
        ],
        allsalary: [
          {required: true, message: '应发工资不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/dzu/salary/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.eid = data.salary.eid
              this.dataForm.basicsalary = data.salary.basicsalary
              this.dataForm.bonus = data.salary.bonus
              this.dataForm.lunchsalary = data.salary.lunchsalary
              this.dataForm.trafficsalary = data.salary.trafficsalary
              this.dataForm.allsalary = data.salary.basicsalary + data.salary.bonus + data.salary.lunchsalary + data.salary.trafficsalary
            }
          })
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
              'allsalary': this.dataForm.allsalary
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
  },
  watch: {
    'dataForm.basicsalary': function (val) {
      this.dataForm.allsalary = parseFloat(this.dataForm.trafficsalary) + parseFloat(this.dataForm.lunchsalary) + parseFloat(this.dataForm.bonus) + parseFloat(this.dataForm.basicsalary)
    },
    'dataForm.bonus': function (val) {
      this.dataForm.allsalary = parseFloat(this.dataForm.trafficsalary) + parseFloat(this.dataForm.lunchsalary) + parseFloat(this.dataForm.bonus) + parseFloat(this.dataForm.basicsalary)
    },
    'dataForm.trafficsalary': function (val) {
      this.dataForm.allsalary = parseFloat(this.dataForm.trafficsalary) + parseFloat(this.dataForm.lunchsalary) + parseFloat(this.dataForm.bonus) + parseFloat(this.dataForm.basicsalary)
    },
    'dataForm.lunchsalary': function (val) {
      this.dataForm.allsalary = parseFloat(this.dataForm.trafficsalary) + parseFloat(this.dataForm.lunchsalary) + parseFloat(this.dataForm.bonus) + parseFloat(this.dataForm.basicsalary)
    }
  }
}
</script>
