<template>
  <el-dialog
    :title="!dataForm.id ? '新增营销机会' : '修改营销机会'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
    <el-form-item label="机会来源" prop="chanceSource">
<!--      <el-input v-model="dataForm.chanceSource" placeholder="机会来源"></el-input>-->
      <el-select v-model="dataForm.chanceSource" placeholder="请选择机会来源">
        <el-option
          v-for="item in chanceSources"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客户名称" prop="customerName">
<!--      <el-input v-model="dataForm.customerName" placeholder="客户名称"></el-input>-->
      <el-select v-model="dataForm.customerName" placeholder="请选择客户名称">
        <el-option
          v-for="item in customerNames"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="成功几率" prop="probability">
<!--      <el-input v-model="dataForm.probability" placeholder="成功几率"></el-input>-->
      <el-progress :percentage="dataForm.probability"></el-progress>
      <div>
        <el-button-group>
          <el-button icon="el-icon-minus" @click="decrease"></el-button>
          <el-button icon="el-icon-plus" @click="increase"></el-button>
        </el-button-group>
      </div>
    </el-form-item>
    <el-form-item label="营销概要" prop="overview">
      <el-input v-model="dataForm.overview" placeholder="概要"></el-input>
    </el-form-item>
    <el-form-item label="联系人姓名" prop="linkMan">
      <el-input v-model="dataForm.linkMan" placeholder="联系人"></el-input>
    </el-form-item>
    <el-form-item label="联系号码" prop="linkPhone">
      <el-input v-model="dataForm.linkPhone" placeholder="联系号码"></el-input>
    </el-form-item>
    <el-form-item label="营销描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="描述"></el-input>
    </el-form-item>
<!--    <el-form-item label="创建人ID" prop="createMan">-->
<!--      <el-input v-model="dataForm.createMan" placeholder="创建人ID"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="分配人工号" prop="assignMan">
<!--      <el-input v-model="dataForm.assignMan" placeholder="分配人ID"></el-input>-->
      <el-select v-model="dataForm.assignMan" placeholder="请选择分配人">
        <el-option
          v-for="item in empNameList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
<!--    <el-form-item label="分配时间" prop="assignTime">-->
<!--      <el-input v-model="dataForm.assignTime" placeholder="分配时间"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="分配状态" prop="allocationState">-->
<!--&lt;!&ndash;      <el-input v-model="dataForm.allocationState" placeholder="分配状态 0未分配 1已分配"></el-input>&ndash;&gt;-->
<!--      <el-select v-model="dataForm.allocationState" placeholder="请选择分配状态">-->
<!--        <el-option-->
<!--          v-for="item in allocationStates"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="开发状态" prop="devResult">-->
<!--&lt;!&ndash;      <el-input v-model="dataForm.devResult" placeholder="开发状态 0未开发 1开发中 2成功 3失败"></el-input>&ndash;&gt;-->
<!--      <el-select v-model="dataForm.devResult" placeholder="请选择开发状态">-->
<!--        <el-option-->
<!--          v-for="item in devResults"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="是否有效" prop="isValid">-->
<!--      <el-input v-model="dataForm.isValid" placeholder="是否有效 0无效 1有效"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="创建时间" prop="createDate">-->
<!--      <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="更新时间" prop="updateDate">-->
<!--      <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>-->
<!--    </el-form-item>-->
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
      var validlinkPhone = (rule, value, callback) => {
        let phoneR = /^1[3|4|5|8][0-9]\d{4,8}$/
        if (phoneR.test(value)) {
          callback()
        } else {
          callback(new Error('错误的手机号！'))
        }
      }
      var validlinkMan = (rule, value, callback) => {
        let nameR = /^[\u4E00-\u9FA5]{2,4}$/
        if (nameR.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的联系人姓名(中文)！'))
        }
      }
      return {
        customerNames: [],
        chanceSources: [
          {
            label: '官方网站',
            value: '官方网站'
          },
          {
            label: '第三方网站',
            value: '第三方网站'
          },
          {
            label: '内部推送',
            value: '内部推送'
          },
          {
            label: '领导指派',
            value: '领导指派'
          }
        ],
        allocationStates: [
          {
            label: '未分配',
            value: 0
          },
          {
            label: '已分配',
            value: 1
          }
        ],
        devResults: [
          {
            label: '未开发',
            value: 0
          },
          {
            label: '开发中',
            value: 1
          },
          {
            label: '成功',
            value: 2
          },
          {
            label: '失败',
            value: 3
          }
        ],
        empNameList: [],
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
          chanceSource: [
            { required: true, message: '机会来源不能为空', trigger: 'blur' }
          ],
          customerName: [
            { required: true, message: '客户名称不能为空', trigger: 'blur' }
          ],
          probability: [
            { required: true, message: '成功几率不能为空', trigger: 'blur' }
          ],
          // overview: [
          //   { required: true, message: '概要不能为空', trigger: 'blur' }
          // ],
          linkMan: [
            { required: true, message: '联系人不能为空', trigger: 'blur' },
            { validator: validlinkMan, trigger: 'blur' }
          ],
          linkPhone: [
            { required: true, message: '联系号码不能为空', trigger: 'blur' },
            { validator: validlinkPhone, trigger: 'blur' }
          ]
          // description: [
          //   { required: true, message: '描述不能为空', trigger: 'blur' }
          // ]
          // createMan: [
          //   { required: true, message: '创建人ID不能为空', trigger: 'blur' }
          // ],
          // assignMan: [
          //   { required: true, message: '分配人ID不能为空', trigger: 'blur' }
          // ],
          // assignTime: [
          //   { required: true, message: '分配时间不能为空', trigger: 'blur' }
          // ],
          // allocationState: [
          //   { required: true, message: '分配状态 0未分配 1已分配不能为空', trigger: 'blur' }
          // ],
          // devResult: [
          //   { required: true, message: '开发状态 0未开发 1开发中 2成功 3失败不能为空', trigger: 'blur' }
          // ],
          // isValid: [
          //   { required: true, message: '是否有效 0无效 1有效不能为空', trigger: 'blur' }
          // ],
          // createDate: [
          //   { required: true, message: '创建时间不能为空', trigger: 'blur' }
          // ],
          // updateDate: [
          //   { required: true, message: '更新时间不能为空', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      increase () {
        this.dataForm.probability += 10
        if (this.dataForm.probability > 100) {
          this.dataForm.probability = 100
        }
      },
      decrease () {
        this.dataForm.probability -= 10
        if (this.dataForm.probability < 0) {
          this.dataForm.probability = 0
        }
      },
      // 获取客户姓名
      getCustomerNameList () {
        this.$http({
          url: this.$http.adornUrl(`/dzu/customer/getCustomerAllNames`),
          method: 'get'
        }).then(({data}) => {
          console.log(data)
          this.customerNames = data.list
        })
      },
      // 获取所有员工姓名
      getEmpNameList () {
        this.$http({
          url: this.$http.adornUrl(`/dzu/employee/getEmpNameList`),
          method: 'get'
        }).then(({data}) => {
          this.empNameList = data.list
        })
      },

      init (id) {
        this.getEmpNameList()
        this.getCustomerNameList()
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
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        if (!this.dataForm.id) {
          for (let i = 0; i < this.empNameList.length; i++) {
            if (this.empNameList[i].label === this.$store.state.user.name) {
              this.dataForm.createMan = this.empNameList[i].value
            }
          }
        }
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/dzu/salechance/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'chanceSource': this.dataForm.chanceSource,
                'customerName': this.dataForm.customerName,
                'probability': this.dataForm.probability,
                'overview': this.dataForm.overview,
                'linkMan': this.dataForm.linkMan,
                'linkPhone': this.dataForm.linkPhone,
                'description': this.dataForm.description,
                'createMan': this.dataForm.createMan,
                'assignMan': this.dataForm.assignMan,
                'assignTime': this.dataForm.assignTime,
                'allocationState': this.dataForm.allocationState,
                'devResult': this.dataForm.devResult,
                'isValid': this.dataForm.isValid,
                'createDate': this.dataForm.createDate,
                'updateDate': this.dataForm.updateDate
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
