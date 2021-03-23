<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">

      <el-form-item label="员工姓名：" prop="name">
        <el-input v-model="dataForm.name" placeholder="员工姓名"  ></el-input>
      </el-form-item>
      <el-form-item label="员工工号：" prop="jobnumber">
        <el-input v-model="dataForm.jobnumber" placeholder="员工工号"  ></el-input>
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
        <el-input v-model="dataForm.departmentid" placeholder="所属部门"  ></el-input>
      </el-form-item>
      <el-form-item label="公司职称：" prop="joblevelid">
        <el-input v-model="dataForm.joblevelid" placeholder="职称"  ></el-input>
      </el-form-item>
      <el-form-item label="公司职位：" prop="posid">
        <el-input v-model="dataForm.posid" placeholder="职位"  ></el-input>
      </el-form-item>
      <el-form-item label="聘用形式：" prop="engageform">
        <el-input v-model="dataForm.engageform" placeholder="聘用形式"  ></el-input>
      </el-form-item>
      <el-form-item label="最高学历：" prop="tiptopdegree">
        <!--      <el-input v-model="dataForm.tiptopdegree" placeholder="最高学历"></el-input>-->
        <el-select v-model="dataForm.tiptopdegree" placeholder="请选择"  >
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
        <el-date-picker
                        v-model="dataForm.begindate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="在职状态：" prop="workstate">
        <!--      <el-input v-model="dataForm.workstate" placeholder="在职状态"></el-input>-->
        <el-select v-model="dataForm.workstate" placeholder="请选择"  >
          <el-option
            v-for="item in workstates"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="离职日期：" prop="notworkdate">
        <!--      <el-input v-model="dataForm.notworkdate" placeholder="离职日期"></el-input>-->
        <el-date-picker
                        v-model="dataForm.notworkdate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
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
        visible: false,
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
            label: '离职'
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
          name: [
            { required: true, message: '员工姓名不能为空', trigger: 'blur' }
          ],
          jobnumber: [
            { required: true, message: '工号不能为空', trigger: 'blur' }
          ]
          // gender: [
          //   { required: true, message: '性别不能为空', trigger: 'blur' }
          // ],
          // birthday: [
          //   { required: true, message: '出生日期不能为空', trigger: 'blur' }
          // ],
          // idcard: [
          //   { required: true, message: '身份证号不能为空', trigger: 'blur' }
          // ],
          // wedlock: [
          //   { required: true, message: '婚姻状况不能为空', trigger: 'blur' }
          // ],
          // nationid: [
          //   { required: true, message: '民族不能为空', trigger: 'blur' }
          // ],
          // nativeplace: [
          //   { required: true, message: '籍贯不能为空', trigger: 'blur' }
          // ],
          // politicid: [
          //   { required: true, message: '政治面貌不能为空', trigger: 'blur' }
          // ],
          // email: [
          //   { required: true, message: '邮箱不能为空', trigger: 'blur' }
          // ],
          // phone: [
          //   { required: true, message: '电话号码不能为空', trigger: 'blur' }
          // ],
          // address: [
          //   { required: true, message: '联系地址不能为空', trigger: 'blur' }
          // ],
          // departmentid: [
          //   { required: true, message: '所属部门不能为空', trigger: 'blur' }
          // ],
          // joblevelid: [
          //   { required: true, message: '职称ID不能为空', trigger: 'blur' }
          // ],
          // posid: [
          //   { required: true, message: '职位ID不能为空', trigger: 'blur' }
          // ],
          // engageform: [
          //   { required: true, message: '聘用形式不能为空', trigger: 'blur' }
          // ],
          // tiptopdegree: [
          //   { required: true, message: '最高学历不能为空', trigger: 'blur' }
          // ],
          // specialty: [
          //   { required: true, message: '所属专业不能为空', trigger: 'blur' }
          // ],
          // school: [
          //   { required: true, message: '毕业院校不能为空', trigger: 'blur' }
          // ],
          // begindate: [
          //   { required: true, message: '入职日期不能为空', trigger: 'blur' }
          // ],
          // workstate: [
          //   { required: true, message: '在职状态不能为空', trigger: 'blur' }
          // ],
          // notworkdate: [
          //   { required: true, message: '离职日期不能为空', trigger: 'blur' }
          // ],
          // begincontract: [
          //   { required: true, message: '合同起始日期不能为空', trigger: 'blur' }
          // ],
          // endcontract: [
          //   { required: true, message: '合同终止日期不能为空', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      init (id) {
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
                this.dataForm.notworkdate = data.employee.notworkdate
                this.dataForm.begincontract = data.employee.begincontract
                this.dataForm.endcontract = data.employee.endcontract
                this.$http({
                  url: this.$http.adornUrl(`/dzu/nation/list`),
                  method: 'get'
                }).then(({data}) => {
                  console.log(data)
                })
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
                'notworkdate': this.dataForm.notworkdate,
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
