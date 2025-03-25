<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="140px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'模板信息'" >
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
                :on-change="handleChange"
                :file-list="fileList">
                <el-button>上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>import { addUploadFile } from '@/api/extension'
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
      fileData: {},
      headers: {
        'authorization': getToken('tenderrx'),
      },
      fileUrl: this.$store.state.user.url + '/tenderings/file/imgUpload',
      visible: null,
      form: {
      },
      fileList: [],
      disPl: true,
      rules: {
      },
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file)
      console.log(res)
      addUploadFile({fileName: file.name,fileSize: file.size,contentType: res.data.contentType}).then(reso => {
        if (reso.flag) {
          this.$emit('hideDialog', false)
          this.$emit('uploadList')
        }
      });
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
    }
  }
}
</script>

<style>
</style>
