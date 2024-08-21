<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'专家姓名'" prop="expertName">
            <el-input v-model="form.expertName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'性别'" prop="sex">
            <el-select v-model="form.sex" class="width-full" placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工作单位'" prop="workUnit">
            <el-input v-model="form.workUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'职称/职务'" prop="job">
            <el-input v-model="form.job"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'身份证号码'">
            <el-input v-model="form.idcardNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'移动电话'">
            <el-input v-model="form.mobilePhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'类别'">
            <el-select v-model="form.major" class="width-full" placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in levelFormat1" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'所属品目'">
            <el-select v-model="form.major" class="width-full" placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in levelFormat2" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'年龄(岁)'">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'毕业院校'">
            <el-input v-model="form.graduateSchool"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'办公电话'">
            <el-input v-model="form.officeTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'qq号码'">
            <el-input v-model="form.qqNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'电子邮箱'">
            <el-input v-model="form.eMail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'出生日期'">
            <el-date-picker
              v-model="form.birthday"
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
          <el-form-item :label="'专家所属'" prop="majorBelong">
            <el-select v-model="form.majorBelong" class="width-full" placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in rArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'工作职位'">
            <el-input v-model="form.jobTitle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'学历'">
            <el-input v-model="form.education"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'年限'">
            <el-input v-model="form.years"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'单位地址'">
            <el-input v-model="form.unitAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'家庭地址'">
            <el-input v-model="form.homeAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'证书'">
            <el-input v-model="form.certificate"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'备注'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'身份证照片'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :data="imgData"
              :limit="1"
              name="imgS"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :class="{hide:hideUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              :file-list="fileList"
              ref="upload"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addMajor} from '@/api/distribution/index'
import {
  getToken
} from '@/utils/auth'
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
        expertName: null,// 名称
        sex: null,
        workUnit: null,
        job: null,
        idcardNo: null,
        mobilePhone: null,
        major: null,
        knowMajor: null,
        age: null,
        graduateSchool: null,
        officeTel: null,
        qqNo: null,
        eMail: null,
        birthday: null,
        majorBelong: null,
        jobTitle: null,
        education: null,
        years: null,
        unitAddress: null,
        homeAddress: null,
        certificate: null,
        remark: null,
        idPhoto: null,
      },
      dialogImageUrl: '',
      dialogVisible: false,
      fileUrl: '',
      headers: {
        'authorization': getToken('tenderrx'),
      },
      hideUpload: false,
      limitCount: 1,
      imgData: {},
      disPl: true,
      fileList: [],
      levelFormat1: [],
      levelFormat2: [],
      pArray: [
        {'label': '男', 'value': '男'},
        {'label': '女', 'value': '女'}
      ],
      rArray: [
        {'label': '库内', 'value': '库内'},
        {'label': '库外', 'value': '库外'}
      ],
      zArray: [
        {'label': '技术', 'value': '技术'},
        {'label': '经济', 'value': '经济'},
        {'label': '技术&经济', 'value': '技术&经济'},
        {'label': '生物信息学', 'value': '生物信息学'},
        {'label': '人体遗传学', 'value': '人体遗传学'},
        {'label': '机构力学', 'value': '机构力学'}
      ],
      rules: {
        expertName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        sex: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        workUnit: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        job: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
      }
    }
  },
  mounted() {
    this.fileUrl = `${window.location.origin}/shoes/file/imgUpload`
    if (this.listInfo) {
      this.form = this.listInfo
    }
    this.fetchFormat1()
    this.fetchFormat2()
  },
  methods: {
    fetchFormat1(val) {
      const data = {
        pageNum: 1,
        pageSize: 100
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
        pageSize: 100
      };
      getUsersList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.levelFormat2 = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addMajor(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        } else {
          return false;
        }
      })
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    // 上传失败事件
    uploadError(res) {
      console.log(res)
      this.$message({
        message: res.msg,
        type: 'warning'
      });
      this.$emit('uploadList')
    },
    // 上传成功事件
    uploadSuccess(res, file, fileList) {
      file.name = res.data;
      this.postform.idPhoto = res.data
      this.$message({
        message: res.msg,
        type: 'success'
      });
    },
    // 删除图片
    handleRemove(file, fileList) {
      let array = this.fileList
      let img = file.url.split(this.$store.state.user.url + '/uploadFiles/image/')[1]
      deleteImg({img: img}).then(res => {
        if(res.flag){
          this.postform.idPhoto = null
          this.hideUpload = false
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
};
</script>

<style>
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
