<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.name" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-folder-opened" @click="sending">发送邮件</el-button>-->
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-search" @click="handlerAlter">查看</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>

  </div>
</template>
<script>import {mapGetters} from 'vuex'
import {alterClerk} from '@/api/basic/index'
import {getByUserAndPrId} from '@/api/system/index'

export default {
  components: {},
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  data() {
    return {
      btnList: [],
      checkList: [],
      visible: null,
      search: {
        name: null
      }
    };
  },
  mounted() {
     let path = this.$route.meta.id
     getByUserAndPrId(path).then(res => {
       this.btnList = res.data
       this.$forceUpdate();
     });
  },
  methods: {
    onFun(method) {
      this[method]()
    },
    Delivery() {
      if (this.clickData.id) {
        this.$confirm('是否删除（' + this.clickData.name + '），删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {
            eid: this.clickData.eid
          })
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
    handlerAlter() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    sending() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    confirm() {
      this.checkList.forEach((item, index) => {

      })
    },
    disable() {
      if (this.clickData.id) {
        this.clickData.disable = true
        alterClerk(this.clickData).then(res => {
          if (res.flag) {
            this.$emit('uploadList')
          }
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    enable() {
      if (this.clickData.id) {
        this.clickData.disable = false
        alterClerk(this.clickData).then(res => {
          if (res.flag) {
            this.$emit('uploadList')
          }
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.name = ''
      this.$store.dispatch('list/setClickData', '')
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.name != null && this.search.name != '' ? obj.projectName = this.search.name : null
      return obj
    },
    handleAdd() {
      this.$emit('showDialog')
    }
  }
};
</script>

<style>
</style>
