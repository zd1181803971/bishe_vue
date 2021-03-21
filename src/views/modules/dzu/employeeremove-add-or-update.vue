<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="eid">
      <el-input v-model="dataForm.eid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="调动后部门" prop="afterdepid">
      <el-input v-model="dataForm.afterdepid" placeholder="调动后部门"></el-input>
    </el-form-item>
    <el-form-item label="调动后职位" prop="afterjobid">
      <el-input v-model="dataForm.afterjobid" placeholder="调动后职位"></el-input>
    </el-form-item>
    <el-form-item label="调动日期" prop="removedate">
      <el-input v-model="dataForm.removedate" placeholder="调动日期"></el-input>
    </el-form-item>
    <el-form-item label="调动原因" prop="reason">
      <el-input v-model="dataForm.reason" placeholder="调动原因"></el-input>
    </el-form-item>
    <el-form-item label="" prop="remark">
      <el-input v-model="dataForm.remark" placeholder=""></el-input>
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
          afterdepid: '',
          afterjobid: '',
          removedate: '',
          reason: '',
          remark: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          afterdepid: [
            { required: true, message: '调动后部门不能为空', trigger: 'blur' }
          ],
          afterjobid: [
            { required: true, message: '调动后职位不能为空', trigger: 'blur' }
          ],
          removedate: [
            { required: true, message: '调动日期不能为空', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '调动原因不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/dzu/employeeremove/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.employeeremove.eid
                this.dataForm.afterdepid = data.employeeremove.afterdepid
                this.dataForm.afterjobid = data.employeeremove.afterjobid
                this.dataForm.removedate = data.employeeremove.removedate
                this.dataForm.reason = data.employeeremove.reason
                this.dataForm.remark = data.employeeremove.remark
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
              url: this.$http.adornUrl(`/dzu/employeeremove/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'eid': this.dataForm.eid,
                'afterdepid': this.dataForm.afterdepid,
                'afterjobid': this.dataForm.afterjobid,
                'removedate': this.dataForm.removedate,
                'reason': this.dataForm.reason,
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
