<template>
  <div>
    <el-alert
      title="提示：欢迎来到运营支撑系统"
      type="warning"
      :closable="false">
    </el-alert>
    <div style="width: 30%;margin: 0 auto">
      <h1>员工姓名：{{empname}}</h1>
      <h2>欢迎登录运营支撑系统,请及时报工</h2>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
      <el-form-item label="员工工号：" prop="name">
        <el-input disabled v-model="dataForm.name" placeholder="员工编号"></el-input>
      </el-form-item>
      <el-form-item label="报工日期：" prop="ecdate">
        <!--        <el-input v-model="dataForm.ecdate" placeholder="报工日期"></el-input>-->
        <el-date-picker
          v-model="dataForm.ecdate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作内容：" prop="ecreason">
        <el-input v-model="dataForm.ecreason" placeholder="工作内容"></el-input>
      </el-form-item>
      <el-form-item label="工作时长：" prop="echour">
        <!--        <el-input v-model="dataForm.echour" placeholder="工作时长"></el-input>-->
        <el-select v-model="dataForm.echour" placeholder="请选择" >
          <el-option
            v-for="item in echours"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="报工情况" prop="ectype">-->
      <!--        <el-input v-model="dataForm.ectype" placeholder="报工情况"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
      <span>
      <el-button :disabled="empFlag" type="primary" @click="dataFormSubmit()">立即报工</el-button>
    </span>
      <span v-if="empFlag"><el-tag type="danger">今日报工已完成！</el-tag></span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    var validateTime1 = (rule, value, callback) => {
      const nowTime = new Date().getDate()
      const start = new Date(this.dataForm.ecdate).getDate()
      if (start === nowTime) {
        callback()
      } else {
        return callback(new Error('只能报当天的工作！'))
      }
    }
    return {
      empFlag: false,
      entity: '',
      echours: [
        {
          label: '7小时',
          value: 7
        }, {
          label: '8小时',
          value: 8
        }, {
          label: '9小时',
          value: 9
        },
        {
          label: '10小时',
          value: 10
        }
      ],
      empname: '',
      msgDataList: [],
      visible: false,
      empId: '',
      dataForm: {
        name: this.$store.state.user.name,
        ecdate: '',
        ecreason: '',
        echour: '',
        ectype: 0,
        remark: ''
      },
      dataRule: {
        ecdate: [
          { required: true, message: '报工日期不能为空', trigger: 'blur' },
          { validator: validateTime1, trigger: 'blur' }
        ],
        ecreason: [
          { required: true, message: '工作内容不能为空', trigger: 'blur' }
        ],
        echour: [
          { required: true, message: '工作时长不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  activated () {
    this.open()
    this.getEmpNameByJob()
    this.getDataEntity()
  },
  methods: {
    getDataEntity () {
      this.$http({
        url: this.$http.adornUrl(`/dzu/employeeec/getEmpClockByEid/${this.$store.state.user.name}`),
        method: 'get'
      }).then(({data}) => {
        if (data.entity !== null) {
          this.empFlag = true
          this.entity = data.entity
          this.dataForm.ecdate = this.entity.ecdate
          this.dataForm.ecreason = this.entity.ecreason
          this.dataForm.echour = this.entity.echour
          this.dataForm.ectype = this.entity.ectype
          this.dataForm.remark = this.entity.remark
        }
      })
    },
    getEmpNameByJob () {
      this.$http({
        url: this.$http.adornUrl(`/dzu/employee/getIdNameByjob/${this.$store.state.user.name}`),
        method: 'get'
      }).then(({data}) => {
        this.empId = data.empIdNameDto.id
        this.empname = data.empIdNameDto.name
      })
    },
    open () {
      this.$http({
        url: this.$http.adornUrl('/dzu/msgcontent/list'),
        method: 'get',
        params: this.$http.adornParams({
        })
      }).then(({data}) => {
        this.msgDataList = data.page.list
        for (let i = 0; i < this.msgDataList.length; i++) {
          this.$notify.info({
            title: this.msgDataList[i].title,
            message: this.msgDataList[i].message,
            offset: 55
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/dzu/employeeec/save`),
            method: 'post',
            data: this.$http.adornData({
              'eid': this.empId,
              'ecdate': this.dataForm.ecdate,
              'ecreason': this.dataForm.ecreason,
              'echour': this.dataForm.echour,
              'ectype': this.dataForm.ectype,
              'remark': this.dataForm.remark
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '报工成功',
                type: 'success',
                duration: 1500
              })
              this.getDataEntity()
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
