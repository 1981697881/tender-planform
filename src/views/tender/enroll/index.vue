<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @delList="delivery"  @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list"  @showDialog="handlerInfoDialog" @uploadList="uploadPage"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="报名信息"
      v-if="visible2"
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <detail-info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></detail-info>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info, DetailInfo } from "./form";

export default {
  components: {
    TabsBar,
    List,
    DetailInfo,
    Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
      listInfo: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    delivery(obj) {
      if(obj) {
        this.$refs.list.Delivery(obj.eid)
      }
    },
    // 弹窗拖拽
    handleDrag() {
      this.$refs.select.blur();
    },
    hideWindow(val) {
      this.visible = val
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    handlerInfoDialog(obj) {
      this.listInfo2 = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    // 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload(){
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
