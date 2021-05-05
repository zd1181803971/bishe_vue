<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
    <el-form-item label="营销机会ID" prop="saleChanceId">
      <el-input v-model="dataForm.saleChanceId" placeholder="营销机会ID"></el-input>
    </el-form-item>
    <el-form-item label="计划项内容" prop="planItem">
      <el-input v-model="dataForm.planItem" placeholder="计划项内容"></el-input>
    </el-form-item>
    <el-form-item label="计划时间" prop="planDate">
      <el-input v-model="dataForm.planDate" placeholder="计划时间"></el-input>
    </el-form-item>
    <el-form-item label="执行效果" prop="exeAffect">
      <el-input v-model="dataForm.exeAffect" placeholder="执行效果"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createDate">
      <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="" prop="updateDate">
      <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="" prop="isValid">
      <el-input v-model="dataForm.isValid" placeholder="是否有效"></el-input>
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
          saleChanceId: '',
          planItem: '',
          planDate: '',
          exeAffect: '',
          createDate: '',
          updateDate: '',
          isValid: ''
        },
        dataRule: {
          saleChanceId: [
            { required: true, message: '营销机会ID不能为空', trigger: 'blur' }
          ],
          planItem: [
            { required: true, message: '计划项内容不能为空', trigger: 'blur' }
          ],
          planDate: [
            { required: true, message: '计划时间不能为空', trigger: 'blur' }
          ],
          exeAffect: [
            { required: true, message: '执行效果不能为空', trigger: 'blur' }
          ],
          createDate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateDate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          isValid: [
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
              url: this.$http.adornUrl(`/dzu/salechanceplan/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.saleChanceId = data.saleChancePlan.saleChanceId
                this.dataForm.planItem = data.saleChancePlan.planItem
                this.dataForm.planDate = data.saleChancePlan.planDate
                this.dataForm.exeAffect = data.saleChancePlan.exeAffect
                this.dataForm.createDate = data.saleChancePlan.createDate
                this.dataForm.updateDate = data.saleChancePlan.updateDate
                this.dataForm.isValid = data.saleChancePlan.isValid
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
              url: this.$http.adornUrl(`/dzu/salechanceplan/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'saleChanceId': this.dataForm.saleChanceId,
                'planItem': this.dataForm.planItem,
                'planDate': this.dataForm.planDate,
                'exeAffect': this.dataForm.exeAffect,
                'createDate': this.dataForm.createDate,
                'updateDate': this.dataForm.updateDate,
                'isValid': this.dataForm.isValid
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
