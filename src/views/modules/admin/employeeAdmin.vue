<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="输入员工姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        fixed="left"
        prop="name"
        header-align="center"
        align="center"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="jobnumber"
        fixed="left"
        header-align="center"
        align="center"
        label="员工工号">
      </el-table-column>
      <el-table-column
        prop="gender"
        header-align="center"
        align="center"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="birthday"
        header-align="center"
        align="center"
        label="出生日期">
      </el-table-column>
      <el-table-column
        prop="idcard"
        header-align="center"
        align="center"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="wedlock"
        header-align="center"
        align="center"
        label="婚姻状况">
      </el-table-column>
      <el-table-column
        prop="nation"
        header-align="center"
        align="center"
        label="民族">
      </el-table-column>
      <el-table-column
        prop="nativeplace"
        header-align="center"
        align="center"
        label="籍贯">
      </el-table-column>
      <el-table-column
        prop="politic"
        header-align="center"
        align="center"
        label="政治面貌">
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="联系地址">
      </el-table-column>
      <el-table-column
        prop="department"
        header-align="center"
        align="center"
        label="所属部门">
      </el-table-column>
      <el-table-column
        prop="joblevel"
        header-align="center"
        align="center"
        label="职称">
      </el-table-column>
      <el-table-column
        prop="pos"
        header-align="center"
        align="center"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="engageform"
        header-align="center"
        align="center"
        label="聘用形式">
      </el-table-column>
      <el-table-column
        prop="tiptopdegree"
        header-align="center"
        align="center"
        label="最高学历">
      </el-table-column>
      <el-table-column
        prop="specialty"
        header-align="center"
        align="center"
        label="所属专业">
      </el-table-column>
      <el-table-column
        prop="school"
        header-align="center"
        align="center"
        label="毕业院校">
      </el-table-column>
      <el-table-column
        prop="begindate"
        header-align="center"
        align="center"
        label="入职日期">
      </el-table-column>
      <el-table-column
        prop="workstate"
        header-align="center"
        align="center"
        label="在职状态">
        <template slot-scope="scope">
          <span v-if="scope.row.workstate === 0">离职</span>
          <span v-if="scope.row.workstate === 1">在职</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="notworkdate"
        header-align="center"
        align="center"
        label="离职日期">
      </el-table-column>
      <el-table-column
        prop="begincontract"
        header-align="center"
        align="center"
        label="合同起始日期">
      </el-table-column>
      <el-table-column
        prop="endcontract"
        header-align="center"
        align="center"
        label="合同终止日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.workstate === 1" type="primary" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="scope.row.workstate === 1" type="danger" size="small" @click="deleteHandle(scope.row.id,scope.row.jobnumber)">删除</el-button>
          <el-button v-if="scope.row.workstate === 0" type="danger" size="small">已离职！</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './employeeAdmin-add-or-update'
export default {
  data () {
    return {
      dataForm: {
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/dzu/employee/getEmpFormList'),
        method: 'get',
        params: this.$http.adornParams({
          'name': this.dataForm.name,
          'page': this.pageIndex,
          'limit': this.pageSize
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      console.log(val)
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id, numberId) {
      var jobnumberIds = numberId ? [numberId] : this.dataListSelections.map(item => {
        return item.jobnumber
      })
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.jobnumber
      })
      this.$confirm(`确定要删除[员工工号=${jobnumberIds.join(',')}]的资料?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/dzu/employee/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>
