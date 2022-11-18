<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'供应商名称'" prop="supplierName">
            <el-input v-model="form.supplierName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'法人代表'" prop="legalRepresentative">
            <el-input v-model="form.legalRepresentative"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'统一社会信用号码'" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'邮箱'" prop="mailbox">
            <el-input v-model="form.mailbox"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系人'" prop="contacts">
            <el-input v-model="form.contacts"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系电话'" prop="contactNumber">
            <el-input v-model="form.contactNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'供应商登录账号'" >
            <el-input v-model="form.supplierAccountNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'供应商登录密码'" >
            <el-input v-model="form.supplierPassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系地址'" >
            <el-input v-model="form.supplierAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'传真'" >
            <el-input v-model="form.fax"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'注册时间'">
            <el-date-picker
              v-model="form.registrationTime"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'注册资金（万）'" >
            <el-input v-model="form.registeredCapital"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'经营范围'" >
            <el-input v-model="form.natureOfBusiness"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item :label="'备注'" >
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>-->
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { addSupplier } from '@/api/supplier/index';
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        contactNumber: null,
        contacts: null,
        fax: null,
        legalRepresentative: null,
        mailbox: null,
        natureOfBusiness: null,
        registeredCapital: null,
        registrationTime: null,
        supplierAccountNumber: null,
        supplierAddress: null,
        supplierName: null,
        supplierPassword: null,
        remark: null
      },
      disPl: true,
      pidS: [],
      pArray: [],
      rArray: [],
      aArray: [],
      rules: {
        supplierName: [
          {required: true, message: '请输入名稱', trigger: 'blur'}
        ],legalRepresentative: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],mailbox: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],contacts: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],contactNumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        storeId: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      },
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addSupplier(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        } else {
          return false;
        }
      })
    },
    // 切换类别
    selectChange(val) {
      this.disPl = false
      this.form.plId = null
      this.rArray = []
      this.fetchLine(val)
    },

  }
};
</script>

<style>
</style>
