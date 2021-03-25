<template>
  <el-dialog
    :title="!dataForm.id ? '新增部门' : '修改部门'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="部门名称"></el-input>
    </el-form-item>
    <el-form-item label="上级部门" prop="parentid">
<!--      <el-input v-model="dataForm.parentid" placeholder="上级部门"></el-input>-->
      <el-select v-model="dataForm.parentid" placeholder="请选择">
        <el-option
          v-for="item in parentids"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
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
        parentids: [],
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          parentid: ''
        },
        dataRule: {
          name: [
            { required: true, message: '部门名称不能为空', trigger: 'blur' }
          ],
          parentid: [
            { required: true, message: '上级部门不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getAllDeptList () {
        this.$http({
          url: this.$http.adornUrl(`/dzu/department/listAll`),
          method: 'get'
        }).then(({data}) => {
          for (let i = 0; i < data.page.length; i++) {
            this.parentids.push({
              value: data.page[i].id,
              label: data.page[i].name
            })
          }
        })
      },

      init (id) {
        this.parentids = []
        this.getAllDeptList()
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/dzu/department/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.department.name
                this.dataForm.parentid = data.department.parentid
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
              url: this.$http.adornUrl(`/dzu/department/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'parentid': this.dataForm.parentid
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
