<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
    <el-form-item label="客户编号" prop="cusNumber">
      <el-input disabled v-model="dataForm.cusNumber" placeholder="客户编号"></el-input>
    </el-form-item>
    <el-form-item label="客户公司名" prop="cusName">
      <el-input disabled v-model="dataForm.cusName" placeholder="客户公司名"></el-input>
    </el-form-item>
    <el-form-item label="客户经理" prop="cusManager">
      <el-input disabled v-model="dataForm.cusManager" placeholder="客户经理"></el-input>
    </el-form-item>
      <el-form-item label="流失原因" prop="lossReason">
        <el-input v-model="dataForm.lossReason" placeholder="流失原因"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
<!--        <el-input v-model="dataForm.state" placeholder="状态 0暂缓流失 1流失"></el-input>-->
        <el-select v-model="dataForm.state" placeholder="请选择">
          <el-option
            v-for="item in states"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="最后下单时间" prop="lastOrderTime">
<!--      <el-input v-model="dataForm.lastOrderTime" placeholder="最后下单时间"></el-input>-->
      <el-date-picker
        v-model="dataForm.lastOrderTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="确认流失时间" prop="confirmLossTime">
<!--      <el-input disabled v-model="dataForm.confirmLossTime" placeholder="确认流失时间"></el-input>-->
      <el-date-picker
        v-model="dataForm.confirmLossTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="流失时间" prop="createDate">
<!--      <el-input v-model="dataForm.createDate" placeholder=""></el-input>-->
      <el-date-picker
        v-model="dataForm.createDate"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间">
      </el-date-picker>
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
        states: [
          {
            value: 0,
            label: '暂缓流失'
          },
          {
            value: 1,
            label: '确定流失'
          }
        ],
        visible: false,
        dataForm: {
          id: 0,
          cusNumber: '',
          cusName: '',
          cusManager: '',
          lastOrderTime: '',
          confirmLossTime: '',
          state: '',
          lossReason: '',
          isValid: '',
          createDate: '',
          updateDate: ''
        },
        dataRule: {
          cusNumber: [
            { required: true, message: '客户编号不能为空', trigger: 'blur' }
          ],
          cusName: [
            { required: true, message: '客户公司名不能为空', trigger: 'blur' }
          ],
          cusManager: [
            { required: true, message: '客户经理不能为空', trigger: 'blur' }
          ],
          lastOrderTime: [
            { required: true, message: '最后下单时间不能为空', trigger: 'blur' }
          ],
          confirmLossTime: [
            { required: true, message: '确认流失时间不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '状态 0暂缓流失 1流失不能为空', trigger: 'blur' }
          ],
          lossReason: [
            { required: true, message: '流失原因不能为空', trigger: 'blur' }
          ],
          isValid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createDate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateDate: [
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
              url: this.$http.adornUrl(`/dzu/customerloss/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.cusNumber = data.customerLoss.cusNumber
                this.dataForm.cusName = data.customerLoss.cusName
                this.dataForm.cusManager = data.customerLoss.cusManager
                this.dataForm.lastOrderTime = data.customerLoss.lastOrderTime
                this.dataForm.confirmLossTime = data.customerLoss.confirmLossTime
                this.dataForm.state = data.customerLoss.state
                this.dataForm.lossReason = data.customerLoss.lossReason
                this.dataForm.isValid = data.customerLoss.isValid
                this.dataForm.createDate = data.customerLoss.createDate
                this.dataForm.updateDate = data.customerLoss.updateDate
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
              url: this.$http.adornUrl(`/dzu/customerloss/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'cusNumber': this.dataForm.cusNumber,
                'cusName': this.dataForm.cusName,
                'cusManager': this.dataForm.cusManager,
                'lastOrderTime': this.dataForm.lastOrderTime,
                'confirmLossTime': this.dataForm.confirmLossTime,
                'state': this.dataForm.state,
                'lossReason': this.dataForm.lossReason,
                'isValid': this.dataForm.isValid,
                'createDate': this.dataForm.createDate,
                'updateDate': this.dataForm.updateDate
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
