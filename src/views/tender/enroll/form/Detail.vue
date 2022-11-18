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
            <div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="sending">发送邮件</el-button>
            </div>
            <el-table class="list-main" height="300px" :data="list2" border size="mini" :highlight-current-row="true" @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
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
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="请选择文件"
      v-if="visible"
      :width="'20%'"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="130px" :size="'mini'">
        <el-row :span="20">
          <el-radio-group v-model="radio">
            <el-radio style="width: 100%" v-for="(item,index) in fileList" :key="index" :label="item.fileName">{{item.fileName}}</el-radio>
          </el-radio-group>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSupplier } from '@/api/supplier/index';
import {findPurchase,uploadFileList} from '@/api/extension/index'
import {getRegistrationList} from '@/api/tender/index'
import {sendMessages} from '@/api/basic/index'
import ajax from '@/utils/ajax'
import {getBlob} from '@/utils/index'
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
      visible: null,
      radio: null,
      list1:[],
      list2:[],
      fileList:[],
      multipleSelection:[],
      columns1:[{text: '子采购包名称', name: 'packageName'},
        {text: '所属类目', name: 'roleType'},
        {text: '单价（元）', name: 'univalent'},
        {text: '数量', name: 'quantity'},
        {text: '计量单位', name: 'unitOfMeasurement'},
        {text: '规格说明', name: 'description'},
        {text: '报名数量', name: 'roleName'}],
      columns2:[{text: '供应商名称', name: 'supplierName'},
        {text: '联系人', name: 'contacts'},
        {text: '联系人电话', name: 'contactNumber'},
        {text: '邮箱', name: 'mailbox'},
        {text: '是否开票', name: 'openInvoice'},
        {text: '发票编码', name: 'invoice'},
        {text: '支付方式', name: 'type'},
        {text: '发送状态', name: 'sendStatus'}],
      pidS: [],
      rules: {
      },
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      this.getPurchase({projectId: this.form.id})
      this.getFileList({projectId: this.form.id})
    }
  },
  methods: {
    confirm() {
      if(this.radio != null){
        getBlob(`/file/download?fileName=` + this.radio, {}, 'get').then(reso => {
          // 拿到 blob 数据类型
          this.multipleSelection.forEach((item,index)=>{
            const formData = new FormData()
            const newbolb = new Blob([reso.data], { type: item.contentType })
            const fileOfBlob = new File([newbolb], this.radio)
            formData.append('file', fileOfBlob)
            formData.append('to', item.mailbox)
            formData.append('subject','测试')
            formData.append('content','测试')
            formData.append('registrationId',item.registrationId)
            sendMessages(formData).then(res => {
              if (res.flag && this.multipleSelection.length == index+1) {
                this.perClick()
                this.visible = false
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
              }
            });
          })
        })
       /* let file = ajax.getDownloadFileBlob(`${this.$store.state.user.url}/tenderings/file/download?fileName=` + this.radio, {})
        console.log(file)*/
      }else{
        this.$message({
          message: '请选择文件',
          type: 'warning'
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    sending(){
      if(this.multipleSelection.length>0){
       this.visible = true
      }else{
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
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
    getFileList(val) {
      uploadFileList(val).then(res => {
        this.fileList = res.data
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
