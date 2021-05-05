<template>
  <el-dialog
    :title="'客户开发计划详情'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
      <el-form-item label="机会来源" prop="chanceSource">
        <el-input disabled v-model="dataForm.chanceSource" placeholder="机会来源"></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input disabled v-model="dataForm.customerName" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item label="成功几率" prop="probability">
        <!--      <el-input v-model="dataForm.probability" placeholder="成功几率"></el-input>-->
        <el-progress :percentage="dataForm.probability"></el-progress>
      </el-form-item>
      <el-form-item label="概要" prop="overview">
        <el-input disabled v-model="dataForm.overview" placeholder="概要"></el-input>
      </el-form-item>
      <el-form-item  label="联系人" prop="linkMan">
        <el-input disabled v-model="dataForm.linkMan" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系号码" prop="linkPhone">
        <el-input disabled v-model="dataForm.linkPhone" placeholder="联系号码"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input disabled v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item v-if="flagdev" label="开发状态" prop="devResult">
              <el-select v-model="dataForm.devResult" placeholder="请选择开发状态">
                <el-option
                  v-for="item in devResults"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
      flagdev: true,
      devResults: [
        {
          label: '开发中',
          value: 1
        },
        {
          label: '开发成功',
          value: 2
        },
        {
          label: '开发失败',
          value: 3
        }
      ],
      visible: false,
      dataForm: {
        id: 0,
        chanceSource: '',
        customerName: '',
        probability: 20,
        overview: '',
        linkMan: '',
        linkPhone: '',
        description: '',
        createMan: '',
        assignMan: '',
        assignTime: '',
        allocationState: '',
        devResult: '',
        isValid: '',
        createDate: '',
        updateDate: ''
      },
      dataRule: {
        // chanceSource: [
        //   { required: true, message: '机会来源不能为空', trigger: 'blur' }
        // ]
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
            url: this.$http.adornUrl(`/dzu/salechance/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.chanceSource = data.saleChance.chanceSource
              this.dataForm.customerName = data.saleChance.customerName
              this.dataForm.probability = data.saleChance.probability
              this.dataForm.overview = data.saleChance.overview
              this.dataForm.linkMan = data.saleChance.linkMan
              this.dataForm.linkPhone = data.saleChance.linkPhone
              this.dataForm.description = data.saleChance.description
              this.dataForm.createMan = data.saleChance.createMan
              this.dataForm.assignMan = data.saleChance.assignMan
              this.dataForm.assignTime = data.saleChance.assignTime
              this.dataForm.allocationState = data.saleChance.allocationState
              this.dataForm.devResult = data.saleChance.devResult
              this.dataForm.isValid = data.saleChance.isValid
              this.dataForm.createDate = data.saleChance.createDate
              this.dataForm.updateDate = data.saleChance.updateDate
              if (this.dataForm.devResult !== 1) {
                this.flagdev = false
              }
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
            url: this.$http.adornUrl(`/dzu/salechance/update`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'devResult': this.dataForm.devResult
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
