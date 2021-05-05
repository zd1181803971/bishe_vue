<template>
  <el-dialog
    :title="!dataForm.id ? '新增客户' : '修改客户信息'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
<!--    <el-form-item label="客户编号：" prop="number">-->
<!--      <el-input v-model="dataForm.number" placeholder="客户编号"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="公司名称：" prop="name">
      <el-input v-model="dataForm.name" placeholder="公司名称"></el-input>
    </el-form-item>
    <el-form-item label="地区：" prop="area">
      <el-input v-model="dataForm.area" placeholder="地区"></el-input>
    </el-form-item>
    <el-form-item label="公司经理：" prop="manager">
      <el-input v-model="dataForm.manager" placeholder="公司经理"></el-input>
    </el-form-item>
    <el-form-item label="客户级别：" prop="level">
<!--      <el-input v-model="dataForm.level" placeholder="客户级别"></el-input>-->
      <el-select v-model="dataForm.level" placeholder="请选择">
        <el-option
          v-for="item in levels"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客户满意度：" prop="satisfied">
<!--      <el-input v-model="dataForm.satisfied" placeholder="客户满意度"></el-input>-->
      <el-progress :percentage="dataForm.satisfied"></el-progress>
      <div>
        <el-button-group>
          <el-button icon="el-icon-minus" @click="decrease"></el-button>
          <el-button icon="el-icon-plus" @click="increase"></el-button>
        </el-button-group>
      </div>
    </el-form-item>
    <el-form-item label="客户信用度：" prop="credit">
<!--      <el-input v-model="dataForm.credit" placeholder="客户信用度"></el-input>-->
      <el-progress :percentage="dataForm.credit"></el-progress>
      <div>
        <el-button-group>
          <el-button icon="el-icon-minus" @click="decrease2"></el-button>
          <el-button icon="el-icon-plus" @click="increase2"></el-button>
        </el-button-group>
      </div>
    </el-form-item>
    <el-form-item label="客户详细地址：" prop="address">
      <el-input v-model="dataForm.address" placeholder="客户详细地址"></el-input>
    </el-form-item>
    <el-form-item label="邮编：" prop="postCode">
      <el-input v-model="dataForm.postCode" placeholder="邮编"></el-input>
    </el-form-item>
    <el-form-item label="电话：" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="电话"></el-input>
    </el-form-item>
    <el-form-item label="官网：" prop="webSite">
      <el-input v-model="dataForm.webSite" placeholder="官网"></el-input>
    </el-form-item>
    <el-form-item label="营业执照：" prop="businessLicense">
      <el-input v-model="dataForm.businessLicense" placeholder="营业执照"></el-input>
    </el-form-item>
    <el-form-item label="客户法定代表人：" prop="legalRepresentative">
      <el-input v-model="dataForm.legalRepresentative" placeholder="客户法定代表人"></el-input>
    </el-form-item>
    <el-form-item label="注册资金(万)：" prop="registeredCapital">
      <el-input v-model="dataForm.registeredCapital" placeholder="注册资金"></el-input>
    </el-form-item>
    <el-form-item label="年营业额(万)：" prop="turnover">
      <el-input v-model="dataForm.turnover" placeholder="营业额"></el-input>
    </el-form-item>
    <el-form-item label="开户行：" prop="bankName">
      <el-input v-model="dataForm.bankName" placeholder="开户行"></el-input>
    </el-form-item>
    <el-form-item label="银行账户：" prop="bankId">
      <el-input v-model="dataForm.bankId" placeholder="银行账户"></el-input>
    </el-form-item>
    <el-form-item label="国税账户：" prop="stateTax">
      <el-input v-model="dataForm.stateTax" placeholder="国税账户"></el-input>
    </el-form-item>
    <el-form-item label="地税账户：" prop="landTax">
      <el-input v-model="dataForm.landTax" placeholder="地税账户"></el-input>
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
      // var checkEmail = (rule, value, callback) => {
      //   let emailR = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/
      //   if (emailR.test(value)) {
      //     callback()
      //   } else {
      //     callback(new Error('错误的邮箱格式！'))
      //   }
      // }
      var checkphone = (rule, value, callback) => {
        let phoneR = /^1[3|4|5|8][0-9]\d{4,8}$/
        if (phoneR.test(value)) {
          callback()
        } else {
          callback(new Error('错误的手机号！'))
        }
      }
      var checkIsChinese = (rule, value, callback) => {
        let nameR = /^[\u4E00-\u9FA5]*$/
        if (nameR.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的中文汉字！'))
        }
      }
    // ^[1-9]\\d{5}$
      var checkpostCode = (rule, value, callback) => {
        let nameR = /^[1-9]\\d{5}$/
        if (nameR.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确邮政编码！'))
        }
      }
      return {
        levels: [
          {
            value: 1,
            label: '普通客户'
          },
          {
            value: 2,
            label: '重点开发客户'
          },
          {
            value: 3,
            label: '大客户'
          },
          {
            value: 4,
            label: '战略合作伙伴'
          },
          {
            value: 5,
            label: 'VIP客户'
          }
        ],
        visible: false,
        dataForm: {
          id: 0,
          number: '',
          name: '',
          area: '',
          manager: '',
          level: '',
          satisfied: 20,
          credit: 20,
          address: '',
          postCode: '',
          phone: '',
          webSite: '',
          businessLicense: '',
          legalRepresentative: '',
          registeredCapital: '',
          turnover: '',
          bankName: '',
          bankId: '',
          stateTax: '',
          landTax: ''
          // state: '',
          // isValid: '',
          // createDate: '',
          // updateDate: ''
        },
        dataRule: {
          // number: [
          //   { required: true, message: '客户编号不能为空', trigger: 'blur' }
          // ],
          name: [
            { required: true, message: '客户公司名不能为空', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '地区不能为空', trigger: 'blur' },
            {validator: checkIsChinese, trigger: 'blur'}
          ],
          manager: [
            { required: true, message: '公司经理不能为空', trigger: 'blur' },
            {validator: checkIsChinese, trigger: 'blur'}

          ],
          level: [
            { required: true, message: '客户级别能为空', trigger: 'blur' }
          ],
          satisfied: [
            { required: true, message: '客户满意度不能为空', trigger: 'blur' }
          ],
          credit: [
            { required: true, message: '客户信用度不能为空', trigger: 'blur' }
          ],
          // address: [
          //   { required: true, message: '客户详细地址不能为空', trigger: 'blur' }
          // ],
          postCode: [
            // { required: true, message: '邮编不能为空', trigger: 'blur' }
            {validator: checkpostCode, trigger: 'blur'}
          ],
          phone: [
            // { required: true, message: '电话不能为空', trigger: 'blur' },
            {validator: checkphone, trigger: 'blur'}
          ]
          // webSite: [
          //   { required: true, message: '官网不能为空', trigger: 'blur' }
          // ],
          // businessLicense: [
          //   { required: true, message: '营业执照不能为空', trigger: 'blur' }
          // ],
          // legalRepresentative: [
          //   { required: true, message: '客户法定代表人不能为空', trigger: 'blur' }
          // ],
          // registeredCapital: [
          //   { required: true, message: '注册资金不能为空', trigger: 'blur' }
          // ],
          // turnover: [
          //   { required: true, message: '营业额不能为空', trigger: 'blur' }
          // ],
          // bankName: [
          //   { required: true, message: '开户行不能为空', trigger: 'blur' }
          // ],
          // bankId: [
          //   { required: true, message: '银行账户不能为空', trigger: 'blur' }
          // ],
          // stateTax: [
          //   { required: true, message: '国税账户不能为空', trigger: 'blur' }
          // ],
          // landTax: [
          //   { required: true, message: '地税账户不能为空', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      increase2 () {
        this.dataForm.credit += 10
        if (this.dataForm.credit > 100) {
          this.dataForm.credit = 100
        }
      },
      decrease2 () {
        this.dataForm.credit -= 10
        if (this.dataForm.credit < 0) {
          this.dataForm.credit = 0
        }
      },
      increase () {
        this.dataForm.satisfied += 10
        if (this.dataForm.satisfied > 100) {
          this.dataForm.satisfied = 100
        }
      },
      decrease () {
        this.dataForm.satisfied -= 10
        if (this.dataForm.satisfied < 0) {
          this.dataForm.satisfied = 0
        }
      },
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/dzu/customer/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.number = data.customer.number
                this.dataForm.name = data.customer.name
                this.dataForm.area = data.customer.area
                this.dataForm.manager = data.customer.manager
                this.dataForm.level = data.customer.level
                this.dataForm.satisfied = data.customer.satisfied
                this.dataForm.credit = data.customer.credit
                this.dataForm.address = data.customer.address
                this.dataForm.postCode = data.customer.postCode
                this.dataForm.phone = data.customer.phone
                this.dataForm.webSite = data.customer.webSite
                this.dataForm.businessLicense = data.customer.businessLicense
                this.dataForm.legalRepresentative = data.customer.legalRepresentative
                this.dataForm.registeredCapital = data.customer.registeredCapital
                this.dataForm.turnover = data.customer.turnover
                this.dataForm.bankName = data.customer.bankName
                this.dataForm.bankId = data.customer.bankId
                this.dataForm.stateTax = data.customer.stateTax
                this.dataForm.landTax = data.customer.landTax
              // this.dataForm.state = data.customer.state
              // this.dataForm.isValid = data.customer.isValid
              // this.dataForm.createDate = data.customer.createDate
              // this.dataForm.updateDate = data.customer.updateDate
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
              url: this.$http.adornUrl(`/dzu/customer/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'number': this.dataForm.number,
                'name': this.dataForm.name,
                'area': this.dataForm.area,
                'manager': this.dataForm.manager,
                'level': this.dataForm.level,
                'satisfied': this.dataForm.satisfied,
                'credit': this.dataForm.credit,
                'address': this.dataForm.address,
                'postCode': this.dataForm.postCode,
                'phone': this.dataForm.phone,
                'webSite': this.dataForm.webSite,
                'businessLicense': this.dataForm.businessLicense,
                'legalRepresentative': this.dataForm.legalRepresentative,
                'registeredCapital': this.dataForm.registeredCapital,
                'turnover': this.dataForm.turnover,
                'bankName': this.dataForm.bankName,
                'bankId': this.dataForm.bankId,
                'stateTax': this.dataForm.stateTax,
                'landTax': this.dataForm.landTax
              // 'state': this.dataForm.state,
              // 'isValid': this.dataForm.isValid,
              // 'createDate': this.dataForm.createDate,
              // 'updateDate': this.dataForm.updateDate
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
