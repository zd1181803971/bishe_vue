<template>
  <div class="mod-config">
    <h3>个人薪资信息</h3>
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="getDataList()"
             label-width="auto">

      <el-button v-if="dataFlag"  type="primary" @click="addOrUpdateHandle()">新增</el-button>

      <el-form-item label="基本工资" prop="basicsalary">
        <el-input v-model="dataForm.basicsalary" placeholder="基本工资"></el-input>
      </el-form-item>
      <el-form-item label="奖金" prop="bonus">
        <el-input v-model="dataForm.bonus" placeholder="奖金"></el-input>
      </el-form-item>
      <el-form-item label="午餐补助" prop="lunchsalary">
        <el-input v-model="dataForm.lunchsalary" placeholder="午餐补助"></el-input>
      </el-form-item>
      <el-form-item label="交通补助" prop="trafficsalary">
        <el-input v-model="dataForm.trafficsalary" placeholder="交通补助"></el-input>
      </el-form-item>
      <el-form-item label="应发工资" prop="allsalary">
        <el-input v-model="dataForm.allsalary" placeholder="应发工资"></el-input>
      </el-form-item>
    </el-form>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './salary-add-or-update'

export default {
  data () {
    return {
      addOrUpdateVisible: false,
      visible: false,
      dataForm: {
        id: 0,
        eid: '',
        basicsalary: '',
        bonus: '',
        lunchsalary: '',
        trafficsalary: '',
        allsalary: ''
      },
      dataFlag: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      this.$http({
        url: this.$http.adornUrl(`/dzu/salary/salaryEid/${this.$store.state.user.eid}`),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        if (data && data.code === 0) {
          // eslint-disable-next-line eqeqeq
          if (data.salary == null || data.salary == 'null') {
            this.dataFlag = !this.dataFlag
          } else {
            this.dataForm.basicsalary = data.salary.basicsalary
            this.dataForm.bonus = data.salary.bonus
            this.dataForm.lunchsalary = data.salary.lunchsalary
            this.dataForm.trafficsalary = data.salary.trafficsalary
            this.dataForm.allsalary = data.salary.allsalary + this.dataForm.trafficsalary + this.dataForm.lunchsalary + this.dataForm.bonus + this.dataForm.basicsalary
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
              }
            })
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    }
  }
}
</script>
