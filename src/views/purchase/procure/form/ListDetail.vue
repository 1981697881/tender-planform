<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px" :size="'mini'">
      <el-row :gutter="20">
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
        </el-table>
      </el-row>
    </el-form>
  </div>
</template>

<script>import {projectInitiationByPerson} from '@/api/basic/index'

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
      list: [],
      columns: [
        { text: '项目名称', name: 'projectName' },
        { text: '项目编号', name: 'pojectNo' }
      ],
      rules: {},
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      this.getPurchase({purchaseCompanyId: this.form.id})
    }
  },
  methods: {
    getPurchase(val) {
      projectInitiationByPerson(val).then(res => {
        if (res.flag) {
          this.list = res.data
        }
      })
    },
  }
};
</script>

<style scoped="scoped" lang="scss">
  .list-main {
    height: calc(100vh / 4);
  }
</style>
