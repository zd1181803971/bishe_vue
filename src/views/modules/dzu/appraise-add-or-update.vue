<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="员工id" prop="eid">
      <el-input v-model="dataForm.eid" placeholder="员工id"></el-input>
    </el-form-item>
    <el-form-item label="考评日期" prop="appdate">
      <el-input v-model="dataForm.appdate" placeholder="考评日期"></el-input>
    </el-form-item>
    <el-form-item label="考评结果" prop="appresult">
      <el-input v-model="dataForm.appresult" placeholder="考评结果"></el-input>
    </el-form-item>
    <el-form-item label="考评内容" prop="appcontent">
      <el-input v-model="dataForm.appcontent" placeholder="考评内容"></el-input>
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
          appdate: '',
          appresult: '',
          appcontent: '',
          remark: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '员工id不能为空', trigger: 'blur' }
          ],
          appdate: [
            { required: true, message: '考评日期不能为空', trigger: 'blur' }
          ],
          appresult: [
            { required: true, message: '考评结果不能为空', trigger: 'blur' }
          ],
          appcontent: [
            { required: true, message: '考评内容不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/dzu/appraise/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.appraise.eid
                this.dataForm.appdate = data.appraise.appdate
                this.dataForm.appresult = data.appraise.appresult
                this.dataForm.appcontent = data.appraise.appcontent
                this.dataForm.remark = data.appraise.remark
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
              url: this.$http.adornUrl(`/dzu/appraise/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'eid': this.dataForm.eid,
                'appdate': this.dataForm.appdate,
                'appresult': this.dataForm.appresult,
                'appcontent': this.dataForm.appcontent,
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
