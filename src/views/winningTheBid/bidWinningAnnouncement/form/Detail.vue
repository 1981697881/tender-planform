<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" :size="'mini'">
      <el-row :span="20">
        <el-col :span="12">
          <el-form-item :label="'关联项目'" prop="projectId">
            <el-select
              v-model="form.projectId"
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              class="width-full">
              <el-option :label="t.projectName" :value="t.id" v-for="(t,i) in projectList"
                         :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'公告标题'" prop="noticeTitle">
            <el-input v-model="form.noticeTitle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="20">
        <el-col :span="12">
          <el-form-item :label="'文章关键字'" prop="keyword">
            <el-input v-model="form.keyword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'作者'" prop="author">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="20">
        <el-col :span="12">
          <el-form-item :label="'公告类型'" prop="noticeType">
            <el-select v-model="form.noticeType" clearable style="width: 100%">
              <el-option
                v-for="(t,i) in options"
                :key="i"
                :label="t.label"
                :value="t.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'发布时间'" prop="releaseDate">
            <el-date-picker
              v-model="form.releaseDate"
              type="datetime"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'开标时间'">
            <el-date-picker
              v-model="form.openMarkdate"
              type="datetime"
              style="width: auto"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'确认日期'">
            <el-date-picker
              v-model="form.fillingDate"
              type="datetime"
              style="width: auto"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'中标金额(万元)'">
            <el-input-number style="width: auto" v-model="form.bidwinningAmount" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'中标服务费(元)'">
            <el-input-number style="width: auto" v-model="form.serviceFee" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'付款方'">
            <el-input v-model="form.payer"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'缴费时间'">
            <el-date-picker
              v-model="form.paymentTime"
              type="datetime"
              style="width: auto"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'缴费方式'">
            <el-input v-model="form.paymentType"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'发票时间'">
            <el-date-picker
              v-model="form.invoicingTime"
              type="datetime"
              style="width: auto"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'发票号'">
            <el-input v-model="form.invoicingNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'结转情况'">
            <el-input v-model="form.carryForward"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'资料寄送'">
            <el-input v-model="form.sendData"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'公告正文'">
            <tinymce style="width: auto" language='zh_CN' v-model="form.noticeText" :height="300"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addNotice} from '@/api/business/index';
import {projectInitiationForm} from '@/api/extension/index';
import Tinymce from '@/components/Tinymce';

export default {
  components: {Tinymce},
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        projectId: null,
        noticeTitle: null,
        noticeType: '中标',
        releaseDate: null,
        keyword: null,
        noticeText: '',
        uploadEnclosure: null,
        author: null,
        bidwinningAmount: null,
        openMarkdate: null,
        fillingDate: null,
        serviceFee: null,
        payer: null,
        paymentTime: null,
        paymentType: null,
        invoicingTime: null,
        invoicingNo: null,
        carryForward: null,
        sendData: null
      },
      loading: false,
      projectName: '',
      content: '',
      options: [{
        label: '招标',
        value: '招标'
      }],
      projectList: [],
      rules: {
        projectId: [
          {required: true, message: '请选择', trigger: 'change'}
        ], releaseDate: [
          {required: true, message: '请选择', trigger: 'change'}
        ],noticeType: [
          {required: true, message: '请选择', trigger: 'change'}
        ],noticeTitle: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],author: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      },
    };
  },
  mounted() {
    this.fetchFormat();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.projectName = query
        this.fetchFormat();
      } else {
        this.projectList = [];
      }
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addNotice(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },
    fetchFormat() {
      projectInitiationForm({projectName: this.projectName}).then(res => {
        this.loading = false;
        this.projectList = res.data
      })
    },
  }
}
</script>

<style type="scss">
  .seat .el-form-item__content {
    height: 250px;
    overflow: auto;
  }

  .el-form-item__error {
    display: contents;
  }
</style>
