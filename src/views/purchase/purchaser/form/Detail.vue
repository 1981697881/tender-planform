<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'采购人姓名'" prop="purchaseName">
            <el-input v-model="form.purchaseName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'性别'" prop="sex">
            <el-select v-model="form.sex" class="width-full"  placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'采购单位'" prop="purchaseId">
            <el-select v-model="form.purchaseId" class="width-full"  placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in rArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'职称'" >
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'移动电话'" prop="mobilePhone">
            <el-input v-model="form.mobilePhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'身份证号码'" >
            <el-input v-model="form.idNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
     <el-row :gutter="20">
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
import { addPurchaser } from '@/api/purchase/index';
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
        idNo: null,
        mobilePhone: null,
        title: null,
        purchaseId: null,
        sex: null,
        purchaseName: null,// 名称
      },
      disPl: true,
      pArray: [{
        'label': '男',
        'value': '男'
      }, {
        'label': '女',
        'value': '女'
      }],
      sArray: [],
      rules: {
        purchaseName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],mobilePhone: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        sex: [
          {required: true, message: '请选择', trigger: 'change'},
        ],purchaseId: [
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
          addPurchaser(this.form).then(res => {
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
