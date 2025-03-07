<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px" :size="'mini'">
      <el-row :gutter="20">
        <el-table class="list-main" height="300px" :data="list" border size="mini"
                  :highlight-current-row="true">
          <el-table-column
            v-for="(t,i) in columns"
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
        {text: '营业执照', name: 'businessCertificate'},
        {text: '相关资质证明', name: 'relevantInformation'}],
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
