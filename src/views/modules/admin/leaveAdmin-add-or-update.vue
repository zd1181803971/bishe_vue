<template>
  <el-dialog
    :title="'审批页面'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
<!--    <el-form-item label="用户id" prop="eid">-->
<!--      <el-input v-model="dataForm.eid" placeholder="用户id"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="开始时间" prop="startTime">
      <el-input disabled v-model="dataForm.startTime" placeholder="开始时间"></el-input>
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime">
      <el-input disabled v-model="dataForm.end/Time" placeholder="结束时间"></el-input>
    </el-form-item>
    <el-form-item label="请假原因" prop="reason">
      <el-input disabled v-model="dataForm.reason" placeholder="请假原因"></el-input>
    </el-form-item>
    <el-form-item label="请假状态" prop="status">
<!--      <el-input v-model="dataForm.status" placeholder="请假状态 0未通过 1通过"></el-input>-->
      <el-select v-model="dataForm.status" placeholder="请选择" >
        <el-option
          v-for="item in statusSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注信息" prop="message">
      <el-input disabled v-model="dataForm.message" placeholder="备注信息"></el-input>
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
        statusSelect: [
          {
            value: 2,
            label: '不通过'
          },
          {
            value: 1,
            label: '通过'
          },
          {
            value: 0,
            label: '待审批'
          }
        ],
        dataForm: {
          id: 0,
          eid: '',
          starttime: '',
          endtime: '',
          reason: '',
          status: '',
          message: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          starttime: [
            { required: true, message: '开始时间不能为空', trigger: 'blur' }
          ],
          endtime: [
            { required: true, message: '结束时间不能为空', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '请假原因不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请假状态 0未通过 1通过不能为空', trigger: 'blur' }
          ],
          message: [
            { required: true, message: '备注信息不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/dzu/leave/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.leave.eid
                this.dataForm.startTime = data.leave.startTime
                this.dataForm.endTime = data.leave.endTime
                this.dataForm.reason = data.leave.reason
                this.dataForm.status = data.leave.status
                this.dataForm.message = data.leave.message
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
              url: this.$http.adornUrl(`/dzu/leave/update`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'eid': this.dataForm.eid,
                'startTime': this.dataForm.startTime,
                'endTime': this.dataForm.endTime,
                'reason': this.dataForm.reason,
                'status': this.dataForm.status,
                'message': this.dataForm.message
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
