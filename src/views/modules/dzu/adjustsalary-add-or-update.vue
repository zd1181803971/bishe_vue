<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="员工id" prop="eid">
      <el-input v-model="dataForm.eid" placeholder="员工id"></el-input>
    </el-form-item>
    <el-form-item label="调薪日期" prop="asdate">
      <el-input v-model="dataForm.asdate" placeholder="调薪日期"></el-input>
    </el-form-item>
    <el-form-item label="调前薪资" prop="beforesalary">
      <el-input v-model="dataForm.beforesalary" placeholder="调前薪资"></el-input>
    </el-form-item>
    <el-form-item label="调后薪资" prop="aftersalary">
      <el-input v-model="dataForm.aftersalary" placeholder="调后薪资"></el-input>
    </el-form-item>
    <el-form-item label="调薪原因" prop="reason">
      <el-input v-model="dataForm.reason" placeholder="调薪原因"></el-input>
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
          asdate: '',
          beforesalary: '',
          aftersalary: '',
          reason: '',
          remark: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '员工id不能为空', trigger: 'blur' }
          ],
          asdate: [
            { required: true, message: '调薪日期不能为空', trigger: 'blur' }
          ],
          beforesalary: [
            { required: true, message: '调前薪资不能为空', trigger: 'blur' }
          ],
          aftersalary: [
            { required: true, message: '调后薪资不能为空', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '调薪原因不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/dzu/adjustsalary/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.adjustsalary.eid
                this.dataForm.asdate = data.adjustsalary.asdate
                this.dataForm.beforesalary = data.adjustsalary.beforesalary
                this.dataForm.aftersalary = data.adjustsalary.aftersalary
                this.dataForm.reason = data.adjustsalary.reason
                this.dataForm.remark = data.adjustsalary.remark
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
              url: this.$http.adornUrl(`/dzu/adjustsalary/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'eid': this.dataForm.eid,
                'asdate': this.dataForm.asdate,
                'beforesalary': this.dataForm.beforesalary,
                'aftersalary': this.dataForm.aftersalary,
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
