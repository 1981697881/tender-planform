<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.projectName" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <el-button :size="'mini'" type="primary" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>import {mapGetters} from 'vuex'

export default {
  components: {},
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  data() {
    return {
      btnList: [],
      search: {
        projectName: null,
        noticeType: '中标'
      }
    }
  },
  mounted() {
    let path = this.$route.meta.id
    /*   getByUserAndPrId(path).then(res => {
         this.btnList = res.data
         this.$forceUpdate();
       });*/
  },
  methods: {
    onFun(method) {
      this[method]()
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.projectName != null && this.search.projectName != '' ? obj.projectName = this.search.projectName : null;
      this.search.noticeType != null && this.search.noticeType != '' ? obj.noticeType = this.search.noticeType : null
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    Delivery() {
      if (this.clickData.id) {
        this.$confirm('是否删除(' + this.clickData.noticeTitle + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {id: this.clickData.id})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },

    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.search.projectName = null
      this.$store.dispatch('list/setClickData', '')
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style>
</style>
