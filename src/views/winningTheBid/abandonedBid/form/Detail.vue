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
          <el-form-item :label="'报名的供应商'" prop="orgAttr">
            <el-table class="list-main" height="300px" :data="list2" border size="mini" :highlight-current-row="true">
              <el-table-column
                v-for="(t,i) in columns2"
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
    </el-form>

  </div>
</template>

<script>
  import { addSupplier } from '@/api/supplier/index';
  import {findPurchase} from '@/api/extension/index'
  import {getRegistrationList} from '@/api/tender/index'
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
        },
        disPl: true,
        list1:[],
        list2:[],
        columns1:[{text: '子采购包名称', name: 'packageName'},
          {text: '所属类目', name: 'roleType'},
          {text: '单价（元）', name: 'univalent'},
          {text: '数量', name: 'quantity'},
          {text: '计量单位', name: 'unitOfMeasurement'},
          {text: '规格说明', name: 'description'},
          {text: '报名数量', name: 'roleName'}],
        columns2:[{text: '供应商名称', name: 'supplierName'},
          {text: '联系人地址', name: 'supplierAddress'},
          {text: '联系人', name: 'contacts'},
          {text: '联系人电话', name: 'contactNumber'},
          {text: '是否开局发票', name: 'openInvoice'},
          {text: '发票编码', name: 'invoice'},
          {text: '支付方式', name: 'type'}],
        pidS: [],
        rules: {
        },
      };
    },
    mounted() {
      if (this.listInfo) {
        this.form = this.listInfo
        this.getPurchase({projectId: this.form.id})
      }
    },
    methods: {
      perClick(obj){
        const data = {
          pageNum: 1,
          pageSize: 100
        };
        getRegistrationList(data, {projectNum: this.form.pojectNo}).then(res => {
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
            addSupplier(this.form).then(res => {
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
    height: calc(100vh/4);
  }
</style>
