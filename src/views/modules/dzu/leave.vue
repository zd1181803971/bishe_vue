<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle(dataForm.id)">我要请假</el-button>
      </el-form-item>
      <h3>{{ this.dataForm.name }}请假记录：</h3>
    </el-form>
    <el-table
      :data="dataList"
      border
      lazy
      v-loading="dataListLoading"
      style="width: 100%;">
      <!--      <el-table-column-->
      <!--        prop="id"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="">-->
      <!--      </el-table-column>-->

      <el-table-column
        prop="startTime"
        header-align="center"
        align="center"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="reason"
        header-align="center"
        align="center"
        label="请假原因">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="请假状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">待批准</el-tag>
            </div>
          </span>
          <span v-if="scope.row.status === 1">
          <div slot="reference" class="name-wrapper">
              <el-tag type="success" size="medium">通过</el-tag>
            </div>
          </span>
          <span v-if="scope.row.status === 2">
           <div slot="reference" class="name-wrapper">
              <el-tag type="danger" size="medium">不通过</el-tag>
            </div>
          </span>
          <span v-if="scope.row.status === 3">
           <div slot="reference" class="name-wrapper">
              <el-tag type="info" size="medium">已销假</el-tag>
            </div>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="message"
        header-align="center"
        align="center"
        label="备注信息">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" type="primary" size="mini" @click="AddCancelLeave(scope.row.id,scope.row.endTime)">销假</el-button>
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
import AddOrUpdate from './leave-add-or-update'

export default {
  data () {
    return {
      dataForm: {
        id: 0,
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
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

    // 销假
    AddCancelLeave (id, endTime) {
      this.$http({
        url: this.$http.adornUrl(`/dzu/leave/update/id`),
        method: 'post',
        data: this.$http.adornData({
          'id': id,
          'endTime': endTime,
          'status': 3
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message({
            message: '销假成功',
            type: 'success',
            duration: 1500
          })
          this.getDataList()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/dzu/leave/getLeaveListByjobNumber'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'jobNumber': this.$store.state.user.name
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
          this.$http({
            url: this.$http.adornUrl(`/dzu/employee/getIdNameByjob/${this.$store.state.user.name}`),
            method: 'get'
          }).then(({data}) => {
            this.dataForm.name = data.empIdNameDto.name
            this.dataForm.id = data.empIdNameDto.id
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
    // 新增
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    }
  }
}
</script>
