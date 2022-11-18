<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
            <el-table class="list-main" height="300px" :data="list" border size="mini" :highlight-current-row="true">
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
                width="150">
                <template slot-scope="scope">
                  <el-button @click="handleUpdate(scope.row)" type="text" size="small">上传附件</el-button>
                  <el-button @click="handleDetele(scope.row)" type="text" size="small">高拍仪拍照</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>import {addNotice} from '@/api/business/index';
import {getMerchants} from '@/api/basic/index';
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
        noticeType: '招标',
        releaseDate: null,
        keyword: null,
        noticeText: null,
        uploadEnclosure: null,
        author: null,
      },
      list: [
        {name: '任务阶段'},
        {name: '立项'},
        {name: '标书上传'},
        {name: '标书审核'},
        {name: '定标'},
        {name: '挂网'},
        {name: '更正信息'},
        {name: '报名情况'},
        {name: '保证金情况'},
        {name: '开、评标资料制作'},
        {name: '申请专家'},
        {name: '抽专家'},
        {name: '开标、评标'},
        {name: '采购结果确认'},
        {name: '发布中标公告'},
        {name: '发布中标通知书'},
        {name: '退还中标保证金'},
        {name: '中标服务费'},
        {name: '领中标通知书'},
        {name: '资料归档情况'},
        {name: '合同登记'},
        {name: '退中标供应商保证金'}
      ],
      columns: [
        {text: '任务阶段', name: 'name'},
        {text: '附件', name: 'roleType'},
      ],
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
        ], noticeType: [
          {required: true, message: '请选择', trigger: 'change'}
        ], noticeTitle: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], author: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      },
    };
  },
  mounted() {
    //this.fetchFormat();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        /* setTimeout(() => {
           this.loading = false;
           this.options = this.list.filter(item => {
             return item.partsName.toLowerCase()
               .indexOf(query.toLowerCase()) > -1;
           });
         }, 200);*/
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
      getMerchants({}).then(res => {
        this.options = res.data
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
