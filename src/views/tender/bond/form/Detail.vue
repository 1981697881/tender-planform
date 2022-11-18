<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'子采购包'" prop="orgAttr">
            <el-table class="list-main" height="300px" :data="list1" border size="mini" :highlight-current-row="true" @row-click="perClick">
              <el-table-column
                v-for="(t,i) in columns1"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'保证金确认'" prop="orgAttr">
            <el-table class="list-main" height="300px" :data="list2" border size="mini" :highlight-current-row="true" @selection-change="handleSelectionChange">
              <el-table-column
                v-for="(t,i) in columns2"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                :formatter="t.formatt!=undefined?checkStatus: null"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope" v-if="scope.row.bondStatus!='1'">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">保证金确认</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="primary" @click="saveData">保证金确认</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import {findPurchase} from '@/api/extension/index'
import {getRegistrationList,updateRegistrations,registrationsList} from '@/api/tender/index'
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {},
      disPl: true,
      list1: [],
      list2: [],
      columns1: [{text: '子采购包名称', name: 'packageName'},
        {text: '所属类目', name: 'roleType'},
        {text: '单价（元）', name: 'univalent'},
        {text: '数量', name: 'quantity'},
        {text: '计量单位', name: 'unitOfMeasurement'},
        {text: '规格说明', name: 'description'},
        {text: '报名数量', name: 'roleName'}],
      columns2: [{text: '供应商名称', name: 'supplierName'},
        {text: '项目名称', name: 'projectName'},
        {text: '子包名称', name: 'packageName'},
        {text: '项目编码', name: 'pojectNo'},
        {text: '缴纳金额', name: ''},
        {text: '缴纳状态', name: 'bondStatus',formatt: 'checkStatus'},
        {text: '缴纳时间', name: ''},
        {text: '项目预算', name: 'budgetAmount'},
        {text: '报名时间', name: ''}],
      pidS: [],
      multipleSelection: [],
      rules: {},
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      this.getPurchase({projectId: this.form.id})
    }
  },
  methods: {
    checkStatus(row, column) {
      let stau = ''
      if(row.bondStatus == 0) {
        stau = '未缴纳'
      }else if(row.bondStatus ==1) {
        stau = '已缴纳'
      }
      return  stau
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick(row){
      updateRegistrations({pojectNo: row.pojectNo,id: row.rid,bondStatus: '1'}).then(res => {
        if(res.flag){
          this.perClick()
        }
      });
    },
    perClick(obj) {
      const data = {
        pageNum: 1,
        pageSize: 100
      };
      registrationsList(data, {projectNum: this.form.pojectNo}).then(res => {
        if (res.flag) {
          this.list2 = res.data.records
        }
      });
    },
    getPurchase(val) {
      findPurchase(val).then(res => {
        this.list1 = res.data
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          updateRegistrations(this.form).then(res => {
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
  .list-main {
    height: calc(100vh / 4);
  }
</style>
