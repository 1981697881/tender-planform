<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />

  </div>
</template>

<script>import { mapGetters } from 'vuex'
import {getProjectInitiationList} from '@/api/extension/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: [
        {text: '系统', name: 'proSystem'},
        {text: '业务员', name: 'projectLeader'},
        {text: '项目名称', name: 'projectName'},
        {text: '项目编号', name: 'pojectNo'},
        {text: '预算金额', name: 'budgetAmount'},
        {text: '代理服务费', name: 'serviceFee'},
        {text: '开标日期', name: 'openMarkdate'},
        {text: '缴费时间', name: 'paymentTime', sort: true},
      ]
    };
  },
  methods: {
    ExportData() {
      import('@/vendor/Export2Excel').then(excel => {
        // 表格的表头列表
        const columns = this.columns
        const tHeader = []
        // 与表头相对应的数据里边的字段
        const filterVal = []
        columns.forEach((item, index) => {
          tHeader.push(item.text)
          filterVal.push(item.name)
        })
        const list = this.list.records
        const data = this.formatJson(filterVal, list);
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.exportJsonToExcel({
          header: tHeader,
          data: data,
          filename: '汇总表',
          autoWidth: true,
          bookType: 'xlsx'})
      })
    },
    formatJson(filter, jsonDate) {
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    /* dblclick(obj) {
       this.$emit('showDialog', obj.row)
     },*/
    Delivery(val) {
      /*delSupplier(val).then(res => {
        if(res.flag){
          this.$store.dispatch('list/setClickData', '')
          this.$emit('uploadList')
        }
      })*/
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      val = { ...val, ...data }
      getProjectInitiationList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
