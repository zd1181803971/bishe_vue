<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.createMan" placeholder="请输入创建人工号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.assignMan" placeholder="请输入分配人工号" clearable></el-input>
      </el-form-item>
      <el-select v-model="dataForm.allocationState" placeholder="请选择分配状态">
        <el-option
          v-for="item in allocationStates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
        prop="createMan"
        header-align="center"
        align="center"
        label="创建人工号">
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
              <el-tag size="medium">成功</el-tag>
          </span>
          <span v-if="scope.row.devResult === 3">
              <el-tag type="danger" size="medium">失败</el-tag>
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
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteHandle(scope.row.id,scope.row.customerName)">删除</el-button>
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
  import AddOrUpdate from './salechance-add-or-update'
  export default {
    data () {
      return {
        allocationStates: [
          {
            value: 0,
            label: '未分配'
          },
          {
            value: 1,
            label: '已分配'
          },
          {
            value: '',
            label: '全部'
          }
        ],
        dataForm: {
          createMan: '',
          assignMan: '',
          allocationState: null
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        customerNames: [],
        dataList2: []
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
          url: this.$http.adornUrl('/dzu/salechance/listForm'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'createMan': this.dataForm.createMan,
            'assignMan': this.dataForm.assignMan,
            'allocationState': this.dataForm.allocationState
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
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id, customerName) {
        var customerNames = customerName ? [customerName] : this.dataListSelections.map(item => {
          return item.customerName
        })
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定要删除[客户=${customerNames.join(',')}]的营销机会吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/dzu/salechance/delete'),
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
