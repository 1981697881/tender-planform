<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />

  </div>
</template>
<script>import {mapGetters} from 'vuex';
import {getSupplierList, deleteSupplier} from '@/api/supplier/index';
import List from '@/components/List';
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
        {text: '供应商名称', name: 'supplierName'},
        {text: '联系地址', name: 'supplierAddress'},
        {text: '联系人', name: 'contacts'},
        {text: '联系电话', name: 'contactNumber'},
        {text: '供应商账号', name: 'supplierAccountNumber'},
      ]
    };
  },
  methods: {
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
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    Delivery(val) {
      deleteSupplier([val]).then(res => {
        if (res.flag) {
          this.$store.dispatch('list/setClickData', '');
          this.$emit('uploadList')
        }
      });
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row);
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
      this.loading = true;
      getSupplierList(data, val).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
