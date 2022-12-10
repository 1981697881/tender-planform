<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'单位名称'" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'注册时间'" prop="registrationDate">
            <el-date-picker
            v-model="form.registrationDate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系人'" >
            <el-input v-model="form.contacts"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系电话'" >
            <el-input v-model="form.contactPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'所属系统'" prop="systemes">
            <el-select v-model="form.systemes" class="width-full"  placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系地址'" >
            <el-input v-model="form.contactAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'传真'" >
            <el-input v-model="form.fax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'邮箱'" >
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'公司联系电话'" >
            <el-input v-model="form.companyPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'税号'" >
            <el-input v-model="form.dutyParagraph"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'经营范围'" >
            <el-input v-model="form.ranges"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'备注'" >
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { addPurchaseCompany } from '@/api/purchase/index';
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
        registrationDate: null,
        contacts: null,
        contactPhone: null,
        systemes: null,
        contactAddress: null,
        fax: null,
        email: null,
        companyPhone: null,
        dutyParagraph: null,
        ranges: null,
        remark: null,
        companyName: null,// 名称
      },
      disPl: true,
      pArray: [{
        'label': '教育系统',
        'value': '教育系统'
      }, {
        'label': '医疗系统',
        'value': '医疗系统'
      }, {
        'label': '公安系统',
        'value': '公安系统'
      }, {
        'label': '企业',
        'value': '企业'
      }, {
        'label': '镇,街',
        'value': '镇,街'
      }, {
        'label': '事业单位',
        'value': '事业单位'
      }],
      rules: {
        companyName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        registrationDate: [
          {required: true, message: '请选择', trigger: 'change'},
        ],systemes: [
          {required: true, message: '请选择', trigger: 'change'},
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
          addPurchaseCompany(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        } else {
          return false;
        }
      })
    },
  }
};
</script>

<style>
</style>
