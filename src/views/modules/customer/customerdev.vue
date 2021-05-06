<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.customerName" placeholder="请输入客户名称" clearable></el-input>
      </el-form-item>
    <el-form-item>
      <el-select v-model="dataForm.allocationState" placeholder="请选择分配状态">
        <el-option
          v-for="item in allocationStates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.devResult" placeholder="请选择开发状态">
          <el-option
            v-for="item in devResults"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
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
      <!--        label="营销机会ID">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="chanceSource"
        header-align="center"
        align="center"
        label="机会来源">
      </el-table-column>
      <el-table-column
        prop="customerName"
        header-align="center"
        align="center"
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="probability"
        header-align="center"
        align="center"
        label="成功几率">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.probability"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="overview"
        header-align="center"
        align="center"
        label="概要">
      </el-table-column>
      <el-table-column
        prop="linkMan"
        header-align="center"
        align="center"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="linkPhone"
        header-align="center"
        align="center"
        label="联系号码">
      </el-table-column>
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="assignMan"
        header-align="center"
        align="center"
        label="分配人工号">
      </el-table-column>
      <el-table-column
        prop="assignTime"
        header-align="center"
        align="center"
        label="分配时间">
      </el-table-column>
      <el-table-column
        prop="allocationState"
        header-align="center"
        align="center"
        label="分配状态">
        <template slot-scope="scope">
          <span v-if="scope.row.allocationState === 0">
              <el-tag size="medium">未分配</el-tag>
          </span>

          <span v-if="scope.row.allocationState === 1">
              <el-tag size="medium">已分配</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="devResult"
        header-align="center"
        align="center"
        label="开发状态">
        <template slot-scope="scope">
          <span v-if="scope.row.devResult === 0">
              <el-tag size="medium">未开发</el-tag>
          </span>

          <span v-if="scope.row.devResult === 1">
              <el-tag size="medium">开发中</el-tag>
          </span>
          <span v-if="scope.row.devResult === 2">
              <el-tag size="medium">开发成功</el-tag>
          </span>
          <span v-if="scope.row.devResult === 3">
              <el-tag type="danger" size="medium">开发失败</el-tag>
          </span>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="isValid"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="是否有效 0无效 1有效">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="createDate"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateDate"
        header-align="center"
        align="center"
        label="更新时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="120"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.devResult === 1" type="primary" size="small" @click="addOrUpdateHandle(scope.row.id,scope.row.customerName)">开发</el-button>
<!--          <el-button v-if="scope.row.devResult === 1" type="primary" size="small" @click="addOrUpdateHandle(scope.row.id)">添加计划项</el-button>-->
          <el-button v-if="scope.row.devResult !== 1" type="primary" size="small" @click="addOrUpdateHandle(scope.row.id)">详情</el-button>
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
import AddOrUpdate from './customerdev-add-or-update.vue'
export default {
  data () {
    return {
      devResults: [
        {
          value: 1,
          label: '开发中'
        },
        {
          value: 2,
          label: '开发成功'
        },
        {
          value: 3,
          label: '开发失败'
        }
      ],
      allocationStates: [
        {
          value: 0,
          label: '未分配'
        },
        {
          value: 1,
          label: '已分配'
        }
      ],
      dataForm: {
        customerName: '',
        allocationState: '',
        devResult: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      dataList2: [],
      customerNames: []
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
        url: this.$http.adornUrl('/dzu/salechance/listFormByAssignEmp'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'assignMan': this.$store.state.user.name,
          'customerName': this.dataForm.customerName,
          'allocationState': this.dataForm.allocationState,
          'devResult': this.dataForm.devResult
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList2 = data.page.list
          this.totalPage = data.page.totalCount
          this.$http({
            url: this.$http.adornUrl(`/dzu/customer/getCustomerAllNames`),
            method: 'get'
          }).then(({data}) => {
            this.customerNames = data.list

            for (let i = 0; i < this.dataList2.length; i++) {
              for (let j = 0; j < this.customerNames.length; j++) {
                if (this.dataList2[i].customerName === this.customerNames[j].value.toString()) {
                  this.dataList2[i].customerName = this.customerNames[j].label
                }
              }
            }
            this.dataList = this.dataList2
          })
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
    addOrUpdateHandle (id, customerName) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, customerName)
      })
    }
  }
}
</script>
