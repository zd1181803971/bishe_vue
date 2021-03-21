<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="员工编号" prop="eid">
      <el-input v-model="dataForm.eid" placeholder="员工编号"></el-input>
    </el-form-item>
    <el-form-item label="奖罚日期" prop="ecdate">
      <el-input v-model="dataForm.ecdate" placeholder="奖罚日期"></el-input>
    </el-form-item>
    <el-form-item label="奖罚原因" prop="ecreason">
      <el-input v-model="dataForm.ecreason" placeholder="奖罚原因"></el-input>
    </el-form-item>
    <el-form-item label="奖罚分" prop="ecpoint">
      <el-input v-model="dataForm.ecpoint" placeholder="奖罚分"></el-input>
    </el-form-item>
    <el-form-item label="奖罚类别，0：奖，1：罚" prop="ectype">
      <el-input v-model="dataForm.ectype" placeholder="奖罚类别，0：奖，1：罚"></el-input>
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
            { required: true, message: '员工编号不能为空', trigger: 'blur' }
          ],
          ecdate: [
            { required: true, message: '奖罚日期不能为空', trigger: 'blur' }
          ],
          ecreason: [
            { required: true, message: '奖罚原因不能为空', trigger: 'blur' }
          ],
          ecpoint: [
            { required: true, message: '奖罚分不能为空', trigger: 'blur' }
          ],
          ectype: [
            { required: true, message: '奖罚类别，0：奖，1：罚不能为空', trigger: 'blur' }
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
