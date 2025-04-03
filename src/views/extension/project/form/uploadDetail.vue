<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="140px" :size="'mini'">
      <!--<el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目负责人'">
            <el-input v-model="form.projectLeader" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系人电话'">
            <el-input v-model="form.leaderPhone" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'填制日期'">
            <el-input v-model="form.fillingDate" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目类型'">
            <el-input v-model="form.pojectType" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目名称'" >
            <el-input v-model="form.projectName" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目编号'">
            <el-input v-model="form.pojectNo" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'采购方式'">
            <el-input v-model="form.procurementMethod" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'资金来源'">
            <el-input v-model="form.fundingSource" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'采购单位'">
            <el-input v-model="form.buyingUnit" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'采购单位联系人'">
            <el-input v-model="form.buyingContacts" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'采购单位电话'">
            <el-input v-model="form.buyingPhone" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'采购单位电子邮箱'">
            <el-input v-model="form.buyingEmail" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'预算金额'">
            <el-input v-model="form.budgetAmount" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否论证">
            <el-input v-model="form.demonstration" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'第一审核人'" prop="firstReviewer">
            <el-select
              v-model="form.firstReviewer"
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod1"
              :loading="loading"
              class="width-full">
              <el-option :label="t.name" :value="t.uid" v-for="(t,i) in levelFormat1"
                         :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'第二审核人'" prop="secondReviewer">
            <el-select
              v-model="form.secondReviewer"
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod2"
              :loading="loading"
              class="width-full">
              <el-option :label="t.name" :value="t.uid" v-for="(t,i) in levelFormat2"
                         :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'附件信息'" >
            <div style="margin-bottom: 10px">
              <el-upload
                class="upload-demo"
                accept=".doc,.docx,.pdf,.xls,.xlsx"
                :action="fileUrl"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :before-remove="beforeRemove"
                multiple
                name="file"
                :data="fileData"
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button>上传</el-button>
              </el-upload>
            </div>
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true">
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleUpdate(scope.row)" type="text" size="small">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--<div slot="footer"  style="text-align:center">
      <el-button type="primary" @click="saveData('form')">提交审核</el-button>
    </div>-->
  </div>
</template>

<script>import {addProjectInitiation,uploadFileList,addUploadFile} from '@/api/extension/index'
import {getUsersList} from '@/api/system/index'
import {
  getToken
} from '@/utils/auth'
import ajax from "@/utils/ajax"
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      fileData: {},
      headers: {
        'authorization': getToken('tenderrx'),
      },
      fileUrl: this.$store.state.user.url + '/tenderings/file/imgUpload',
      visible: null,
      form: {
        bond: '0',
        inquiry: '0',
        randomSupplier: '0',
        demonstration: '0',
        ifPersonal: '0',
        budgetAmount: '1',
        projectLeader: null,
        leaderPhone: null,
        fillingDate: null,
        pojectType: null,
        projectName: null,
        pojectNo: null,
        firstReviewer: null,
        secondReviewer: null,
        procurementMethod: null,
        fundingSource: null,
        buyingUnit: null,
        buyingContacts: null,
        buyingPhone: null,
        buyingEmail: null,
      },
      list: [],
      fileList: [],
      levelFormat1: [],
      levelFormat2: [],
      columns: [
        { text: '文件名', name: 'fileName' },
        { text: '上传者', name: 'uploadPeople' },
        { text: '文件大小', name: 'fileSize'},
        { text: '创建时间', name: 'createDate'}
      ],
      disPl: true,
      rules: {
        firstReviewer: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        secondReviewer: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      },
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      this.fetchFormat1()
      this.fetchFormat2()
      this.fetchFileData({projectId: this.form.id})
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      addUploadFile({projectId: this.form.id,fileName: file.name,fileSize: file.size,contentType: res.data.contentType}).then(reso => {
        if (reso.flag) {
          this.fetchFileData({projectId: this.form.id})
        }
      });
    },
    fetchFormat1(val) {
      const data = {
        pageNum: 1,
        pageSize: 10
      };
      getUsersList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.levelFormat1 = res.data.records
        }
      });
    },
    fetchFormat2(val) {
      const data = {
        pageNum: 1,
        pageSize: 10
      };
      getUsersList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.levelFormat2 = res.data.records
        }
      });
    },
    fetchFileData(val) {
      uploadFileList(val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.list = res.data
        }
      });
    },
    remoteMethod1(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchFormat1({ 'name': query })
      } else {
        this.list = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchFormat2({ 'name': query })
      } else {
        this.list = [];
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleUpdate(item) {
      ajax.downloadFile(`${this.$store.state.user.url}/tenderings/file/download?fileName=` + item.fileName, {}, {fileName: item.fileName})
    },
    handleDetele(item) {
      if (item.starId) {
        this.$confirm('是否删除(' + item.starName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list.some((item, index) => {
            if (item.starId == item.starId) {
              this.list.splice(index, 1)
              return true
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addProjectInitiation({id: this.form.id, status: '1',secondReviewer: this.form.secondReviewer,firstReviewer: this.form.firstReviewer}).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        } else {
          return false;
        }
      })
    }
  }
};
</script>

<style>
</style>
