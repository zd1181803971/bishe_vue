<template>
  <div class="mod-config">
    <h3>个人基本信息</h3>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="auto">
      <el-form-item label="员工姓名：" prop="name">
        <el-input v-model="dataForm.name" placeholder="员工姓名" disabled></el-input>
      </el-form-item>
      <el-form-item label="员工工号：" prop="jobnumber">
        <el-input v-model="dataForm.jobnumber" placeholder="员工工号" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <!--        <el-input v-model="dataForm.gender" placeholder="性别"></el-input>-->
        <el-select v-model="dataForm.gender" placeholder="请选择">
          <el-option
            v-for="item in genders"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期：" prop="birthday">
        <!--        <el-input v-model="dataForm.birthday" placeholder="出生日期"></el-input>-->
        <el-date-picker
          v-model="dataForm.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="身份证号：" prop="idcard">
        <el-input v-model="dataForm.idcard" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况：" prop="wedlock">
        <!--        <el-input v-model="dataForm.wedlock" placeholder="婚姻状况"></el-input>-->
        <el-select v-model="dataForm.wedlock" placeholder="请选择">
          <el-option
            v-for="item in wedlocks"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族：" prop="nationid">
        <!--        <el-input v-model="dataForm.nationid" placeholder="民族"></el-input>-->
        <el-select v-model="dataForm.nationid" placeholder="请选择">
          <el-option
            v-for="item in nationids"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="籍贯：" prop="nativeplace">
        <el-input v-model="dataForm.nativeplace" placeholder="籍贯"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌：" prop="politicid">
        <!--        <el-input v-model="dataForm.politicid" placeholder="政治面貌"></el-input>-->
        <el-select v-model="dataForm.politicid" placeholder="请选择">
          <el-option
            v-for="item in politicids"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="电话号码：" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="联系地址：" prop="address">
        <el-input v-model="dataForm.address" placeholder="联系地址"></el-input>
      </el-form-item>
      <el-form-item label="所属部门：" prop="departmentid">
        <el-input v-model="dataForm.departmentid" placeholder="所属部门" disabled></el-input>
      </el-form-item>
      <el-form-item label="公司职称：" prop="joblevelid">
        <el-input v-model="dataForm.joblevelid" placeholder="职称" disabled></el-input>
      </el-form-item>
      <el-form-item label="公司职位：" prop="posid">
        <el-input v-model="dataForm.posid" placeholder="职位" disabled></el-input>
      </el-form-item>
      <el-form-item label="聘用形式：" prop="engageform">
        <el-input v-model="dataForm.engageform" placeholder="聘用形式" disabled></el-input>
      </el-form-item>
      <el-form-item label="最高学历：" prop="tiptopdegree">
        <!--      <el-input v-model="dataForm.tiptopdegree" placeholder="最高学历"></el-input>-->
        <el-select v-model="dataForm.tiptopdegree" placeholder="请选择" disabled>
          <el-option
            v-for="item in tiptopdegrees"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属专业：" prop="specialty">
        <el-input v-model="dataForm.specialty" placeholder="所属专业"></el-input>
      </el-form-item>
      <el-form-item label="毕业院校：" prop="school">
        <el-input v-model="dataForm.school" placeholder="毕业院校"></el-input>
      </el-form-item>
      <el-form-item label="入职日期：" prop="begindate">
        <!--      <el-input v-model="dataForm.begindate" placeholder="入职日期"></el-input>-->
        <el-date-picker disabled
                        v-model="dataForm.begindate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="在职状态：" prop="workstate">
        <!--      <el-input v-model="dataForm.workstate" placeholder="在职状态"></el-input>-->
        <el-select v-model="dataForm.workstate" placeholder="请选择" disabled>
          <el-option
            v-for="item in workstates"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="离职日期：" prop="notworkdate">-->
<!--        &lt;!&ndash;      <el-input v-model="dataForm.notworkdate" placeholder="离职日期"></el-input>&ndash;&gt;-->
<!--        <el-date-picker disabled-->
<!--                        v-model="dataForm.notworkdate"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        type="date"-->
<!--                        placeholder="选择日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item label="合同起始日期：" prop="begincontract">
        <!--      <el-input v-model="dataForm.begincontract" placeholder="合同起始日期"></el-input>-->
        <el-date-picker disabled
                        v-model="dataForm.begincontract"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同终止日期：" prop="endcontract">
        <!--      <el-input v-model="dataForm.endcontract" placeholder="合同终止日期"></el-input>-->
        <el-date-picker disabled
                        v-model="dataForm.endcontract"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <span>
      <el-button type="primary" @click="dataFormSubmit()">修改个人信息</el-button>
    </span>
    </el-form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      posids: [],
      joblevelids: [],
      departmentids: [],
      politicids: [],
      nationids: [],
      wedlocks: [
        {
          value: '已婚',
          label: '已婚'
        }, {
          value: '未婚',
          label: '未婚'
        }
      ],
      genders: [
        {
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }
      ],
      workstates: [
        {
          value: '在职',
          label: '在职'
        }, {
          value: '离职',
          label: '离职',
          disabled: false
        }
      ],
      tiptopdegrees: [
        {
          value: '初中',
          label: '初中'
        }, {
          value: '高中',
          label: '高中'
        }, {
          value: '大专',
          label: '大专'
        }, {
          value: '本科',
          label: '本科'
        }, {
          value: '博士',
          label: '博士'
        }, {
          value: '硕士',
          label: '硕士'
        }
      ],
      dataForm: {
        id: '',
        name: '',
        jobnumber: '',
        gender: '',
        birthday: '',
        idcard: '',
        wedlock: '',
        nationid: '',
        nativeplace: '',
        politicid: '',
        email: '',
        phone: '',
        address: '',
        departmentid: '',
        joblevelid: '',
        posid: '',
        engageform: '',
        tiptopdegree: '',
        specialty: '',
        school: '',
        begindate: '',
        workstate: '',
        notworkdate: '',
        begincontract: '',
        endcontract: ''
      },
      dataRule: {
        gender: [
          {required: true, message: '性别不能为空', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '出生日期不能为空', trigger: 'blur'}
        ],
        idcard: [
          {required: true, message: '身份证号不能为空', trigger: 'blur'}
        ],
        wedlock: [
          {required: true, message: '婚姻状况不能为空', trigger: 'blur'}
        ],
        nationid: [
          {required: true, message: '民族不能为空', trigger: 'blur'}
        ],
        nativeplace: [
          {required: true, message: '籍贯不能为空', trigger: 'blur'}
        ],
        politicid: [
          {required: true, message: '政治面貌不能为空', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '电话号码不能为空', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '联系地址不能为空', trigger: 'blur'}
        ],
        specialty: [
          {required: true, message: '所属专业不能为空', trigger: 'blur'}
        ],
        school: [
          {required: true, message: '毕业院校不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  activated () {
    this.getDataList()
  },
  methods: {
    clearList () {
      this.posids = []
      this.joblevelids = []
      this.departmentids = []
      this.politicids = []
      this.nationids = []
    },
    getDirectoryDataList () {
      this.clearList()
      this.$http({
        url: this.$http.adornUrl(`/dzu/nation/listAll`),
        method: 'get'
      }).then(({data}) => {
        if (data.page !== null) {
          for (let i = 0; i < data.page.length; i++) {
            this.nationids.push({
              value: data.page[i].id,
              label: data.page[i].name
            })
          }
        }
      })
      this.$http({
        url: this.$http.adornUrl(`/dzu/oliticsstatus/listAll`),
        method: 'get'
      }).then(({data}) => {
        if (data.page !== null) {
          for (let o = 0; o < data.page.length; o++) {
            this.politicids.push({
              value: data.page[o].id,
              label: data.page[o].name
            })
          }
        }
      })
      this.$http({
        url: this.$http.adornUrl(`/dzu/department/listAll`),
        method: 'get'
      }).then(({data}) => {
        if (data.page !== null) {
          for (let d = 0; d < data.page.length; d++) {
            this.departmentids.push({
              value: data.page[d].id,
              label: data.page[d].name
            })
          }
        }
      })
      this.$http({
        url: this.$http.adornUrl(`/dzu/joblevel/listAll`),
        method: 'get'
      }).then(({data}) => {
        if (data.page !== null) {
          for (let j = 0; j < data.page.length; j++) {
            this.joblevelids.push({
              value: data.page[j].id,
              label: data.page[j].name
            })
          }
        }
      })

      this.$http({
        url: this.$http.adornUrl(`/dzu/position/listAll`),
        method: 'get'
      }).then(({data}) => {
        if (data.page !== null) {
          for (let p = 0; p < data.page.length; p++) {
            this.posids.push({
              value: data.page[p].id,
              label: data.page[p].name
            })
          }
        }
      })
    },
    // 获取数据列表
    getDataList () {
      this.getDirectoryDataList()
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl(`/dzu/employee/jobNumber/${this.$store.state.user.name}`),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataForm.id = data.employee.id
          this.dataForm.name = data.employee.name
          this.dataForm.jobnumber = data.employee.jobnumber
          this.dataForm.gender = data.employee.gender
          this.dataForm.birthday = data.employee.birthday
          this.dataForm.idcard = data.employee.idcard
          this.dataForm.wedlock = data.employee.wedlock
          this.dataForm.nationid = data.employee.nationid
          this.dataForm.nativeplace = data.employee.nativeplace
          this.dataForm.politicid = data.employee.politicid
          this.dataForm.email = data.employee.email
          this.dataForm.phone = data.employee.phone
          this.dataForm.address = data.employee.address
          this.dataForm.departmentid = data.employee.departmentid
          this.dataForm.joblevelid = data.employee.joblevelid
          this.dataForm.posid = data.employee.posid
          this.dataForm.engageform = data.employee.engageform
          this.dataForm.tiptopdegree = data.employee.tiptopdegree
          this.dataForm.specialty = data.employee.specialty
          this.dataForm.school = data.employee.school
          this.dataForm.begindate = data.employee.begindate
          this.dataForm.workstate = data.employee.workstate
          this.dataForm.notworkdate = data.employee.notworkdate
          this.dataForm.begincontract = data.employee.begincontract
          this.dataForm.endcontract = data.employee.endcontract
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/dzu/employee/update`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id,
              'gender': this.dataForm.gender,
              'birthday': this.dataForm.birthday,
              'idcard': this.dataForm.idcard,
              'wedlock': this.dataForm.wedlock,
              'nationid': this.dataForm.nationid,
              'nativeplace': this.dataForm.nativeplace,
              'politicid': this.dataForm.politicid,
              'email': this.dataForm.email,
              'phone': this.dataForm.phone,
              'address': this.dataForm.address,
              'specialty': this.dataForm.specialty,
              'school': this.dataForm.school
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
              window.location.reload()
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
