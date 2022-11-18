<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px" :size="'mini'">
      <el-row :gutter="20">
        <div style="margin-top: 20px;margin-bottom: 10px">
          <el-button @click="setRow" type="success" size="small">进入</el-button>
        </div>
        <el-table class="list-main" height="300px" :data="list1" border size="mini" :highlight-current-row="true"  @selection-change="handleSelectionChange">
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
      :title="form.projectName+'开标会'"
      v-if="visible"
      :width="'50%'"
      style="text-align: center"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="130px" :size="'mini'">
        <el-row :gutter="20">
          <el-descriptions class="margin-top" title="基本信息" :column="2" :size="size" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-claim"></i>
                项目编号
              </template>
              {{form.pojectNo}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-finance"></i>
                项目名称
              </template>
              {{form.projectName}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                项目类别
              </template>
              <el-tag size="small">{{form.pojectType}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-time"></i>
                开标时间
              </template>
              2022-11-20 09:00
            </el-descriptions-item>
          </el-descriptions>
        </el-row>
        <el-row :gutter="20">
          <el-descriptions class="margin-top" title="子包信息" :column="2" :size="size" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-discount"></i>
                子包号
              </template>
              {{multipleSelection[0].packageName}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-wallet"></i>
                子包预算
              </template>
              {{multipleSelection[0].subtotal}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-tools"></i>
                单位
              </template>
            </el-descriptions-item>
          </el-descriptions>
        </el-row>
        <el-row :gutter="20">
          <el-descriptions title="唱标信息">
          </el-descriptions>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
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
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.bannerSinging == '0'?'唱标':'修改'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog
        :visible.sync="visible2"
        title="唱标"
        v-if="visible2"
        :width="'20%'"
        style="text-align: center"
        destroy-on-close
        append-to-body
      >
        <el-form :model="postForm" :rules="rules2" ref="postForm" label-width="130px" :size="'mini'">
          <el-row :span="20">
            <el-col :span="24">
              <el-form-item :label="'供应商名称'">
                <el-input v-model="postForm.supplierName" readOnly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="20">
            <el-col :span="24">
              <el-form-item :label="'金额（元）'">
                <el-input-number style="width: 100%" v-model="postForm.bannerSinging" :min="1"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-row :span="20">
            <el-col :span="12" :offset="4">
              <el-form-item :label="'是否签署盖章'">
                <el-input  v-model="postForm.univalent" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="20">
            <el-col :span="12" :offset="4">
              <el-form-item :label="'服务期限'">
                <el-input  v-model="postForm.univalent" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->
        </el-form>
        <div slot="footer" style="text-align:center;padding-top: 15px">
          <el-button type="primary" @click="confirm('postForm')">确认</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {getMajorList, choiceMajor} from '@/api/distribution/index'
import {bannerSinging,registrationsList} from '@/api/tender/index'
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
      postForm: {
        supplierName: null,
        bannerSinging: 1,
        pojectNo: null,
      },
      disPl: true,
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
      columns2: [{text: '供应商名称', name: 'supplierName'}],
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
    handleClick(val){
      this.postForm.supplierName  = val.supplierName
      this.postForm.id = val.rid
      this.postForm.pojectNo = this.form.pojectNo
      this.visible2 = true
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
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    setRow() {
      if (this.multipleSelection.length>0) {
        if(this.multipleSelection.length == 1){
          this.visible = true
          this.fetchFormat();
        }else {
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
    confirm(form){
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          bannerSinging(this.postForm).then(res => {
            if(res.flag){
              this.visible = false
              this.visible2 = false
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            }
          });
        } else {
          return false;
        }
      })
    },
    saveData() {
      // 判断必填项
      let array = []
      this.list1.forEach((item)=>{
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

<style scoped="scoped"  lang="scss">
  .list-main {
    height: calc(100vh / 4);
  }
</style>
