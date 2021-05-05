<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="请输入公司名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button  type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
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
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="客户ID">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="number"
        header-align="center"
        align="center"
        label="客户编号"
        width="130px">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="area"
        header-align="center"
        align="center"
        label="地区">
      </el-table-column>
      <el-table-column
        prop="manager"
        header-align="center"
        align="center"
        label="公司经理">
      </el-table-column>
      <el-table-column
        prop="level"
        header-align="center"
        align="center"
        label="客户级别"
        width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.level === 1">
              <el-tag size="medium">普通客户</el-tag>
          </span>
          <span v-if="scope.row.level === 2">
              <el-tag size="medium">重点开发客户</el-tag>
          </span>
          <span v-if="scope.row.level === 3">
              <el-tag size="medium">大客户</el-tag>
          </span>
          <span v-if="scope.row.level === 4">
              <el-tag size="medium">战略合作伙伴</el-tag>
          </span>
          <span v-if="scope.row.level === 5">
              <el-tag size="medium">VIP客户</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="satisfied"
        header-align="center"
        align="center"
        label="满意度"
        width="135px">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.satisfied"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="credit"
        header-align="center"
        align="center"
        label="信用度"
        width="135px">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.credit"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        header-align="center"
        align="center"
        label="流失客户">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="1"
            :inactive-value="0"
            @change="updateBrandStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="详细地址"
         width="180px">
      </el-table-column>
      <el-table-column
        prop="postCode"
        header-align="center"
        align="center"
        label="邮编">
      </el-table-column>
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="公司电话"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="webSite"
        header-align="center"
        align="center"
        label="官方网站"
        width="180px">
      </el-table-column>
      <el-table-column
        prop="businessLicense"
        header-align="center"
        align="center"
        label="营业执照"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="legalRepresentative"
        header-align="center"
        align="center"
        label="法定代表人"
        width="135px">
      </el-table-column>
      <el-table-column
        prop="registeredCapital"
        header-align="center"
        align="center"
        label="注册资金">
        <template slot-scope="scope">
          {{scope.row.registeredCapital}} 万
        </template>
      </el-table-column>
      <el-table-column
        prop="turnover"
        header-align="center"
        align="center"
        label="营业额">
        <template slot-scope="scope">
          {{scope.row.turnover}} 万
        </template>
      </el-table-column>
      <el-table-column
        prop="bankName"
        header-align="center"
        align="center"
        label="开户行">
      </el-table-column>
      <el-table-column
        prop="bankId"
        header-align="center"
        align="center"
        label="银行账户"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="stateTax"
        header-align="center"
        align="center"
        label="国税账户"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="landTax"
        header-align="center"
        align="center"
        label="地税账户"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="state"
        header-align="center"
        align="center"
        label="流失客户">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="1"
            :inactive-value="0"
            @change="updateBrandStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="isValid"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="有效状态 0删除 1正常">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="createDate"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="创建时间">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="updateDate"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="更新时间">-->
<!--      </el-table-column>-->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import AddOrUpdate from './customer-add-or-update'

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
    // 流失客户
    updateBrandStatus (data) {
      this.$confirm('此操作会流失客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('最新信息', data)
        let { id, state } = data
        // 发送请求修改状态
        this.$http({
          url: this.$http.adornUrl('/dzu/customer/lossCustomer'),
          method: 'post',
          data: this.$http.adornData({ id, state }, false)
        }).then(({ data }) => {
          this.$message({
            type: 'success',
            message: '状态更新成功'
          })
          this.getDataList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/dzu/customer/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'name': this.dataForm.name
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
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/dzu/customer/delete'),
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
