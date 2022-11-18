<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px" :size="'mini'">
      <el-row :gutter="20">
        <div style="margin-top: 20px;margin-bottom: 10px">
          <el-button @click="setRow" type="success" size="small">查看</el-button>
        </div>
        <el-table class="list-main" height="300px" :data="list1" border size="mini" :highlight-current-row="true" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="投标保证金退还"
      v-if="visible"
      :width="'50%'"
      style="text-align: center"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="130px" :size="'mini'">
        <el-row :gutter="20">
          <el-table class="list-main" height="200px" :data="list2" border size="mini" :highlight-current-row="true">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
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
            <el-table-column label="操作" align="center" v-if="isTender">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">退还保证金</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>import {getMajorList, choiceMajor} from '@/api/distribution/index'
import {returnRegistrations,registrationsList} from '@/api/tender/index'
import {findPurchase} from '@/api/extension/index'
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
      isTender: true,
      username: '',
      visible: null,
      visible2: null,
      list1: [],
      list2: [],
      multipleSelection: [],
      columns1: [{text: '子采购包名称', name: 'packageName'},
        {text: '所属类目', name: 'roleType'},
        {text: '单价（元）', name: 'univalent'},
        {text: '数量', name: 'quantity'},
        {text: '计量单位', name: 'unitOfMeasurement'},
        {text: '规格说明', name: 'description'},
        {text: '报名数量', name: 'roleName'}],
      columns2: [{text: '供应商名称', name: 'supplierName'}, {text: '是否已归还', name: 'choiceRegistrations',formatt: 'checkStatus'}],
      rules: {},
      rules2: {},
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
      if(row.bondStatus == 1) {
        stau = '否'
      }else if(row.bondStatus ==2) {
        stau = '是'
      }
      return  stau
    },
    handleClick(val) {
      returnRegistrations({id: val.rid, pojectNo: this.form.pojectNo, bondStatus: '2'}).then(res => {
        if (res.flag) {
          this.visible = false
          this.visible2 = false
          this.$emit('hideDialog', false)
          this.$emit('uploadList')
        }
      });
    },
    getPurchase(val) {
      findPurchase(val).then(res => {
        if (res.flag) {
          this.list1 = res.data
        }
      })
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 100
      };
      registrationsList(data, {projectNum: this.form.pojectNo}).then(res => {
        if (res.flag) {
          this.list2 = res.data.records
          this.list2.forEach((item) => {
            if(item.bondStatus == '2'){
              this.isTender = false
            }
          })
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    setRow() {
      if (this.multipleSelection.length > 0) {
        if (this.multipleSelection.length == 1) {
          this.visible = true
          this.fetchFormat();
        } else {
          this.$message({
            message: '只能选中一行',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    saveData() {
      // 判断必填项
      let array = []
      this.list1.forEach((item) => {
        let obj = {}
        obj.majorId = item.id
        obj.projectId = this.form.id
        array.push(obj)
      })
      choiceMajor(array).then(res => {
        this.$emit('hideDialog', false)
        this.$emit('uploadList')
      });
    },
  }
};
</script>

<style scoped="scoped" lang="scss">
  .list-main {
    height: calc(100vh / 4);
  }
</style>
