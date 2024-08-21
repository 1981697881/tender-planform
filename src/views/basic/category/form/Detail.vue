<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="50px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'类别'" prop="parent">
            <el-select v-model="form.parent" class="width-full" placeholder="请选择">
              <el-option :label="t.name" :value="t.id" v-for="(t,i) in typeList" :key="id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
import { addBaseData, getBaseDataList,updateBaseData } from '@/api/basic/index'
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
        type: 1,
        isParent: 0,
        parent: null,
        number: null
      },
      typeList: [],
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        parent: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
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
          return false
        }
      })
    },
    fetchData(data = {
      pageNum: 1,
      pageSize: 100
    }) {
      getBaseDataList(data, { type: 1, isParent: 1 }).then(res => {
        this.typeList = res.data.list
      })
    }
  }
}
</script>

<style>
</style>
