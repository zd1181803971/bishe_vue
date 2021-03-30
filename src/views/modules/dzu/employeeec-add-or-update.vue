<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="员工工号" prop="eid">
      <el-input v-model="dataForm.eid" placeholder="员工工号"></el-input>
    </el-form-item>
    <el-form-item label="报工日期" prop="ecdate">
<!--      <el-input v-model="dataForm.ecdate" placeholder="报工日期"></el-input>-->
      <el-date-picker
        v-model="dataForm.ecdate"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="工作内容" prop="ecreason">
      <el-input v-model="dataForm.ecreason" placeholder="工作内容"></el-input>
    </el-form-item>
    <el-form-item label="工作时长" prop="ecpoint">
<!--      <el-input v-model="dataForm.ecpoint" placeholder="工作时长"></el-input>-->
      <el-select v-model="dataForm.ecpoint" placeholder="请选择" >
        <el-option
          v-for="item in ecpoints"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="报工情况" prop="ectype">
<!--      <el-input v-model="dataForm.ectype" placeholder="报工情况"></el-input>-->
      <el-select v-model="dataForm.ectype" placeholder="请选择" >
        <el-option
          v-for="item in ectypes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
        ectypes: [
          {
            label: '正常报工',
            value: 0
          },
          {
            label: '请假',
            value: 1
          },
          {
            label: '矿工',
            value: 2
          }
        ],
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
        visible: false,
        dataForm: {
          id: 0,
          eid: '',
          ecdate: '',
          ecreason: '',
          ecpoint: '',
          ectype: '',
          remark: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '员工工号不能为空', trigger: 'blur' }
          ],
          ecdate: [
            { required: true, message: '报工日期不能为空', trigger: 'blur' }
          ],
          ecreason: [
            { required: true, message: '工作内容不能为空', trigger: 'blur' }
          ],
          ecpoint: [
            { required: true, message: '工作时长不能为空', trigger: 'blur' }
          ],
          ectype: [
            { required: true, message: '报工情况不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/dzu/employeeec/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.employeeec.eid
                this.dataForm.ecdate = data.employeeec.ecdate
                this.dataForm.ecreason = data.employeeec.ecreason
                this.dataForm.ecpoint = data.employeeec.ecpoint
                this.dataForm.ectype = data.employeeec.ectype
                this.dataForm.remark = data.employeeec.remark
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
              url: this.$http.adornUrl(`/dzu/employeeec/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
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
