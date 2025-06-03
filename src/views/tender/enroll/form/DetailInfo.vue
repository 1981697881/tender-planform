<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px" :size="'mini'">
      <el-row :gutter="20">
        <el-table class="list-main" height="300px" :data="list" border size="mini"
                  :highlight-current-row="true">
          <template v-for="(t,i) in columns">
            <el-table-column
              :key="i"
              v-if="t.default == 'escape'?true:false"
              :label="t.text"
              :width="t.width?t.width:''"
              align="center"
            >
              <template width="90" slot-scope="scope">
                <span>{{scope.row.status == '1'?'已缴费':'未缴费'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :key="i"
              v-else-if="t.default == 'img'?true:false"
              :label="t.text"
              :width="t.width?t.width:''"
              align="center"
            >
              <template width="90" slot-scope="scope">
                <el-image
                  v-if="scope.row[t.name]"
                  style="width: 100px; height: 100px"
                  :src="scope.row[t.name]"
                  :preview-src-list="[scope.row[t.name]]">
                </el-image>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column
              :key="i"
              v-else
              align="center"
              :prop="t.name"
              :label="t.text"
              :width="t.width?t.width:''"
            ></el-table-column>
          </template>
        </el-table>
      </el-row>
    </el-form>
  </div>
</template>

<script>import {getRegistrationList} from '@/api/tender/index'
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
      username: '',
      visible: null,
      list: [],
      columns: [{text: '公司名称', name: 'companyName'},
        {text: '联系人', name: 'transactorsName'},
        {text: '联系电话', name: 'contactNumber'},
        {text: '邮箱', name: 'mailbox'},
        {text: '是否缴费', name: 'status', default: 'escape'},
        {text: '报名费', name: 'regFee'},
        {text: '报名日期', name: 'createDate'},
        {text: '营业执照', name: 'businessCertificate', default: 'img' },
        {text: '相关资质证明', name: 'relevantInformation', default: 'img' }],
      pidS: [],
      rules: {},
    };
  },
  mounted() {
    if (this.listInfo) {
      console.log(this.listInfo)
      this.getRegistration({projectNum: this.listInfo.pojectNo})
    }
  },
  methods: {
    getRegistration(val) {
      const data = {
        pageNum: 1,
        pageSize: 100
      };
      getRegistrationList(data, val).then(res => {
        if (res.flag) {
          this.list = res.data.records
        }
      });
    }
  }
}
</script>

<style>
  .list-main {
    height: calc(100vh / 4);
  }
</style>
