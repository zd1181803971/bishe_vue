<template>
  <el-dialog
    :title="'进行请假'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="开始时间" prop="starttime">
<!--      <el-input v-model="dataForm.starttime" placeholder="开始时间"></el-input>-->
      <el-date-picker
        v-model="dataForm.starttime"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="endtime">
<!--      <el-input v-model="dataForm.endtime" placeholder="结束时间"></el-input>-->
      <el-date-picker
        v-model="dataForm.endtime"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="请假原因" prop="reason">
<!--      <el-input v-model="dataForm.reason" placeholder="请假原因"></el-input>-->
      <el-select v-model="dataForm.reason" placeholder="请选择">
        <el-option
          v-for="item in workstates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请假状态" prop="status">
      <el-input disabled  placeholder="待批准"></el-input>
    </el-form-item>
    <el-form-item label="备注信息" prop="message">
      <el-input v-model="dataForm.message" placeholder="备注信息"></el-input>
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
      // 校验开始日期是否在当前日期之后
      var validateTime1 = (rule, value, callback) => {
        // 获取系统当前时间
        const nowTime = new Date().getTime()
        // 获取页面选择的开始时间
        const start = new Date(this.dataForm.starttime).getTime()
        // 开始时间与当前时间做比较
        if (start >= nowTime) {
          // 开始时间大于当前时间则成功回调
          callback()
        } else {
          // 否则返回错误回调，并携带错误信息
          return callback(new Error('请假开始时间要在当前时间之后'))
        }
      }
      // 校验结束时间是否在开始时间之后
      var validateTime2 = (rule, value, callback) => {
        // 获取页面选择的开始时间
        const start = new Date(this.dataForm.starttime).getTime()
        // 获取页面选择的结束时间
        const end = new Date(this.dataForm.endtime).getTime()
        // 开始时间与结束时间比较
        if (start <= end) {
          // 结束时间大于开始时间，成功回调
          callback()
        } else {
          // 否则错误回调，并返回错误信息
          return callback(new Error('请假结束时间要在请假开始时间之后'))
        }
      }
      return {
        workstates: [
          {
            value: '病假',
            label: '病假'
          },
          {
            value: '事假',
            label: '事假'
          },
          {
            value: '婚假',
            label: '婚假'
          },
          {
            value: '其他',
            label: '其他'
          }
        ],
        visible: false,
        dataForm: {
          id: 0,
          eid: '',
          starttime: '',
          endtime: '',
          reason: '',
          status: 0,
          message: ''
        },
        dataRule: {
          starttime: [
            { required: true, message: '开始时间不能为空', trigger: 'blur' },
            { validator: validateTime1, trigger: 'blur' }
          ],
          endtime: [
            { required: true, message: '结束时间不能为空', trigger: 'blur' },
            { validator: validateTime2, trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '请假原因不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请假状态不能为空', trigger: 'blur' }
          ],
          message: [
            { required: true, message: '备注信息不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.clear()
    },
    methods: {
      clear () {
        this.dataForm.eid = ''
        this.dataForm.starttime = ''
        this.dataForm.endtime = ''
        this.dataForm.reason = ''
        this.dataForm.message = ''
      },
      init (id) {
        this.visible = true
        this.dataForm.eid = id
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/dzu/leave/save`),
              method: 'post',
              data: this.$http.adornData({
                'eid': this.dataForm.eid,
                'startTime': this.dataForm.starttime,
                'endTime': this.dataForm.endtime,
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
