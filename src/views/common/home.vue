<template>
  <div>
    <el-alert
      title="提示：开源不易，需要鼓励。去友情链接 点个 star 吧  [不再提示]？"
      type="warning"
      :closable="false">
    </el-alert>
    <div style="width: 30%;margin: 0 auto">
      <h1>{{empname}}</h1>
      <h2>欢迎来到运营支撑系统,请记得报工</h2>

      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
      <el-form-item label="员工工号：" prop="eid">
        <el-input disabled v-model="dataForm.eid" placeholder="员工编号"></el-input>
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
      <el-form-item label="工作时长：" prop="ecpoint">
        <!--        <el-input v-model="dataForm.ecpoint" placeholder="工作时长"></el-input>-->
        <el-select v-model="dataForm.ecpoint" placeholder="请选择" >
          <el-option
            v-for="item in ecpoints"
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
      <el-button type="primary" @click="dataFormSubmit()">立即报工</el-button>
    </span></div>

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
      ecpoints: [
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
      dataForm: {
        eid: this.$store.state.user.name,
        ecdate: '',
        ecreason: '',
        ecpoint: '',
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
        ecpoint: [
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
  },
  methods: {
    getEmpNameByJob () {
      this.$http({
        url: this.$http.adornUrl(`/dzu/employee/getIdNameByjob/${this.$store.state.user.name}`),
        method: 'get'
      }).then(({data}) => {
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
              'eid': this.dataForm.eid,
              'ecdate': this.dataForm.ecdate,
              'ecreason': this.dataForm.ecreason,
              'ecpoint': this.dataForm.ecpoint,
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
