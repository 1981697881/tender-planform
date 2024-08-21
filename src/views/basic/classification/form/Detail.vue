<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="50px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'编码'" prop="number">
            <el-input v-model="form.number"></el-input>
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
import { addBaseData,updateBaseData } from '@/api/basic/index'
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
        name: null,
        isParent: 1,
        parent: -1,
        type: 1,
        number: null
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
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
          if (typeof (this.form.id) != undefined && this.form.id != null) {
            updateBaseData(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          } else {
            addBaseData(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          }
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style>
</style>
