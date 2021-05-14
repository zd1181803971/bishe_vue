<template>
  <el-dialog
    :title="!dataForm.id ? '新增员工' : '修改员工信息'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="auto">

      <el-form-item label="员工姓名：" prop="name">
        <el-input v-model="dataForm.name" placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="员工工号：" prop="jobnumber">
        <el-input v-model="dataForm.jobnumber" placeholder="员工工号"></el-input>
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
      <el-form-item label="所属部门：" prop="departmentid">
        <!--        <el-input v-model="dataForm.departmentid" placeholder="所属部门"  ></el-input>-->
        <el-select v-model="dataForm.departmentid" placeholder="请选择">
          <el-option
            v-for="item in departmentids"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司职称：" prop="joblevelid">
        <!--        <el-input v-model="dataForm.joblevelid" placeholder="职称"  ></el-input>-->
        <el-select v-model="dataForm.joblevelid" placeholder="请选择">
          <el-option
            v-for="item in joblevelids"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司职位：" prop="posid">
        <!--        <el-input v-model="dataForm.posid" placeholder="职位"  ></el-input>-->
        <el-select v-model="dataForm.posid" placeholder="请选择">
          <el-option
            v-for="item in posids"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="聘用形式：" prop="engageform">
        <!--        <el-input v-model="dataForm.engageform" placeholder="聘用形式"></el-input>-->
        <el-select v-model="dataForm.engageform" placeholder="请选择">
          <el-option
            v-for="item in engageforms"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期：" prop="begindate">
        <!--      <el-input v-model="dataForm.begindate" placeholder="入职日期"></el-input>-->
        <el-date-picker
          v-model="dataForm.begindate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="在职状态：" prop="workstate">
        <!--      <el-input v-model="dataForm.workstate" placeholder="在职状态"></el-input>-->
        <el-select v-model="dataForm.workstate" placeholder="请选择">
          <el-option
            v-for="item in workstates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="离职日期：" prop="notworkdate">-->
      <!--        &lt;!&ndash;      <el-input v-model="dataForm.notworkdate" placeholder="离职日期"></el-input>&ndash;&gt;-->
      <!--        <el-date-picker-->
      <!--                        v-model="dataForm.notworkdate"-->
      <!--                        value-format="yyyy-MM-dd"-->
      <!--                        type="date"-->
      <!--                        placeholder="选择日期">-->
      <!--        </el-date-picker>-->
      <!--      </el-form-item>-->
      <el-form-item label="合同起始日期：" prop="begincontract">
        <!--      <el-input v-model="dataForm.begincontract" placeholder="合同起始日期"></el-input>-->
        <el-date-picker
          v-model="dataForm.begincontract"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同终止日期：" prop="endcontract">
        <!--      <el-input v-model="dataForm.endcontract" placeholder="合同终止日期"></el-input>-->
        <el-date-picker
          v-model="dataForm.endcontract"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="性别：" prop="gender">-->
<!--        &lt;!&ndash;        <el-input v-model="dataForm.gender" placeholder="性别"></el-input>&ndash;&gt;-->
<!--        <el-select v-model="dataForm.gender" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in genders"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="出生日期：" prop="birthday">-->
<!--        &lt;!&ndash;        <el-input v-model="dataForm.birthday" placeholder="出生日期"></el-input>&ndash;&gt;-->
<!--        <el-date-picker-->
<!--          v-model="dataForm.birthday"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="身份证号：" prop="idcard">-->
<!--        <el-input v-model="dataForm.idcard" placeholder="身份证号"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="婚姻状况：" prop="wedlock">-->
<!--        &lt;!&ndash;        <el-input v-model="dataForm.wedlock" placeholder="婚姻状况"></el-input>&ndash;&gt;-->
<!--        <el-select v-model="dataForm.wedlock" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in wedlocks"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="籍贯：" prop="nativeplace">-->
<!--        <el-input v-model="dataForm.nativeplace" placeholder="籍贯"></el-input>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="邮箱：" prop="email">-->
<!--        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="电话号码：" prop="phone">-->
<!--        <el-input v-model="dataForm.phone" placeholder="电话号码"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="联系地址：" prop="address">-->
<!--        <el-input v-model="dataForm.address" placeholder="联系地址"></el-input>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="最高学历：" prop="tiptopdegree">-->
<!--        &lt;!&ndash;      <el-input v-model="dataForm.tiptopdegree" placeholder="最高学历"></el-input>&ndash;&gt;-->
<!--        <el-select v-model="dataForm.tiptopdegree" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in tiptopdegrees"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="所属专业：" prop="specialty">-->
<!--        <el-input v-model="dataForm.specialty" placeholder="所属专业"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="毕业院校：" prop="school">-->
<!--        <el-input v-model="dataForm.school" placeholder="毕业院校"></el-input>-->
<!--      </el-form-item>-->
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
    var validBeginDate = (rule, value, callback) => {
      if (this.dataForm.id === 0) {
        const nowDate = new Date()
        const dateVal = new Date(value)
        if (nowDate < dateVal) {
          this.dataForm.begincontract = value
          callback()
        } else {
          callback(new Error('入职日期不能在当前日期之前！'))
        }
      } else {
        callback()
      }
    }
    // /^[\u4E00-\u9FA5A-Za-z]+$/;
    var validName = (rule, value, callback) => {
      let nameR = /^[\u4E00-\u9FA5]{2,4}$/
      if (nameR.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的姓名(中文)！'))
      }
    }
    var validJobNumber = (rule, value, callback) => {
      var jobNumberR = /^[d][z][u][\d]{3}$/
      if (jobNumberR.test(value)) {
        callback()
      } else {
        callback(new Error('工号必须以dzu开头，后面要跟三位数字！'))
      }
    }
    var validBeginContract = (rule, value, callback) => {
      const dateVal = new Date(this.dataForm.begindate).getDate()
      const dateVal2 = new Date(value).getDate()
      if (dateVal === dateVal2) {
        callback()
      } else {
        callback(new Error('合同起始日期必须和入职日期相同！'))
      }
    }
    var validEndContract = (rule, value, callback) => {
      const dateVal = new Date(this.dataForm.begincontract).getMonth()
      const dateVal2 = new Date(value).getMonth()
      const dateValYear1 = new Date(this.dataForm.begincontract).getFullYear()
      const dateValYear2 = new Date(value).getFullYear()
      console.log(dateValYear1)
      console.log(dateValYear2)
      if ((dateValYear2 - dateValYear1) > 1) {
        callback()
      } else {
        if ((dateValYear2 - dateValYear1) === 1) {
          console.log(dateVal)
          console.log(dateVal2)
          if (dateVal < dateVal2) {
            callback()
          } else {
            callback(new Error('合同终止日期必须大于合同起始日期一年的下个月！'))
          }
        }
        if ((dateValYear2 - dateValYear1) < 1) {
          callback(new Error('合同终止日期必须大于合同起始日期一年！'))
        }
      }
    }
    return {
      visible: false,
      posids: [],
      joblevelids: [],
      departmentids: [],
      politicids: [],
      nationids: [],
      engageforms: [
        {
          value: '临时雇佣',
          label: '临时雇佣'
        }, {
          value: '劳动合同',
          label: '劳动合同'
        },
        {
          value: '劳务派遣',
          label: '劳务派遣'
        }
      ],
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
          value: 1,
          label: '在职'
        }, {
          value: 0,
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
        id: 0,
        name: '',
        jobnumber: 'dzu',
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
        name: [
          {required: true, message: '员工姓名不能为空', trigger: 'blur'},
          { validator: validName, trigger: 'blur' }
        ],
        jobnumber: [
          {required: true, message: '工号不能为空', trigger: 'blur'},
          { validator: validJobNumber, trigger: 'blur' }
        ],
        nationid: [
          { required: true, message: '民族不能为空', trigger: 'blur' }
        ],
        politicid: [
          { required: true, message: '政治面貌不能为空', trigger: 'blur' }
        ],
        departmentid: [
          { required: true, message: '所属部门不能为空', trigger: 'blur' }
        ],
        joblevelid: [
          { required: true, message: '职称不能为空', trigger: 'blur' }
        ],
        posid: [
          { required: true, message: '职位不能为空', trigger: 'blur' }
        ],
        engageform: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        begindate: [
          { required: true, message: '入职日期不能为空', trigger: 'blur' },
          { validator: validBeginDate, trigger: 'blur' }
        ],
        workstate: [
          { required: true, message: '在职状态不能为空', trigger: 'blur' }
        ],
        begincontract: [
          { required: true, message: '合同起始日期不能为空', trigger: 'blur' },
          { validator: validBeginContract, trigger: 'blur' }
        ],
        endcontract: [
          { required: true, message: '合同终止日期不能为空', trigger: 'blur' },
          { validator: validEndContract, trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    clearList () {
      this.posids = []
      this.joblevelids = []
      this.departmentids = []
      this.politicids = []
      this.nationids = []
    },
    getDataList () {
      this.clearList()
      // 通过Axios发送Http请求
      this.$http({
        // 添加URL地址
        url: this.$http.adornUrl(`/dzu/nation/listAll`),
        // 通过Get方法
        method: 'get'
        // 发送成功的回调函数，将后端返回的数据data解构出来
      }).then(({data}) => {
        // 判断是否为空
        if (data.page !== null) {
          // 遍历data，将data列表里的每个id和name提取出来
          for (let i = 0; i < data.page.length; i++) {
            // 将Select选择器需要的Value和Label通过Push()方法添加进去
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
    init (id) {
      // 判断是否是新增，新增员工在职状态只能是在职
      if (id === undefined) {
        this.workstates[1].disabled = true
      } else {
        this.workstates[1].disabled = false
      }
      this.getDataList()
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/dzu/employee/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
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
              // this.dataForm.notworkdate = data.employee.notworkdate
              this.dataForm.begincontract = data.employee.begincontract
              this.dataForm.endcontract = data.employee.endcontract
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
            url: this.$http.adornUrl(`/dzu/employee/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'jobnumber': this.dataForm.jobnumber,
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
              'departmentid': this.dataForm.departmentid,
              'joblevelid': this.dataForm.joblevelid,
              'posid': this.dataForm.posid,
              'engageform': this.dataForm.engageform,
              'tiptopdegree': this.dataForm.tiptopdegree,
              'specialty': this.dataForm.specialty,
              'school': this.dataForm.school,
              'begindate': this.dataForm.begindate,
              'workstate': this.dataForm.workstate,
              // 'notworkdate': this.dataForm.notworkdate,
              'begincontract': this.dataForm.begincontract,
              'endcontract': this.dataForm.endcontract
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
