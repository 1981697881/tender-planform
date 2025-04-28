<template>
  <div class="list-header">
    <div class="printClass" >
      <div class="scan" :ref="'lessonTableImg'">
        <vue-qr
          class="scanImg"
          :text="'http://113.107.2.14:50025/tenderings/redirect/scanResult?pojectNo='+pojectNo"
          :margin="0"
          :logoScale="0.2"
        >
        </vue-qr>
      </div>
    </div>
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
          <template v-for="(t,i) in btnList" >
            <el-button :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
            <el-popover
              v-else-if="t.category == 'popover'"
              placement="left"
              width="400"
              :key="i"
              trigger="manual"
              v-model="assVisible"
            >
              <el-form-item :label="'员工'">
                <el-select
                  v-model="user"
                  filterable
                  remote
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  class="width-full">
                  <el-option :label="t.name" :value="t.uid" v-for="(t,i) in levelFormat"
                             :key="i"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="text-align: center">
                <el-button type="primary" @click="onSubmit">选择</el-button>
              </el-form-item>
              <el-button slot="reference" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
            </el-popover>
          </template>
         <!-- <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>-->

         <!-- <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="download(1)">采购文件下载</el-button>-->
        <!--  <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="download(2)">采购文件模板下载</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-upload2" @click="uploadFile">招标文件</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportScan">导出二维码</el-button>-->
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-view" @click="handleAudit">审核</el-button>-->
        <!--  <el-dropdown @command="handlerBtn" trigger="click">
            <el-button :size="'mini'" type="primary">
              审核<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">通过</el-dropdown-item>
              <el-dropdown-item command="2">驳回</el-dropdown-item>
              &lt;!&ndash;<el-dropdown-item command="3">反审</el-dropdown-item>&ndash;&gt;
            </el-dropdown-menu>
          </el-dropdown>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="请选择文件类型"
      v-if="visible"
      :width="'20%'"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="130px" :size="'mini'">
        <el-row :span="20" v-if="exFile==1">
          <el-checkbox-group v-model="checkList">
            <el-checkbox style="width: 100%" v-for="(item,index) in localFileList" :key="index" :label="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row :span="20" v-else>
          <el-radio-group v-model="radio">
            <el-radio style="width: 100%" v-for="(item,index) in fileList" :key="index" :label="item.fileName">{{item.fileName}}</el-radio>
          </el-radio-group>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>import {mapGetters} from 'vuex'
import {alterClerk, downloadFile, getFileList} from '@/api/basic/index'
import {getByUserAndPrId, getUsersList} from '@/api/system/index'
import {addProjectInitiation, projectAudit,projectAuditNo} from '@/api/extension/index'
import fileDownload from 'js-file-download'
import ajax from "@/utils/ajax"
import html2Canvas from 'html2canvas'
import Canvas2Image from 'canvas2image'
import vueQr from 'vue-qr'
export default {
  components: {
    vueQr
  },
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  data() {
    return {
      user: null,
      btnList: [],
      fileList: [],
      localFileList: [{
        label: '委托协议（工程）',
        value: 0
      },{
        label: '招标文件（报价）',
        value: 1
      },{
        label: '招标文件（摇珠）',
        value: 2
      },{
        label: '招标文件确认书',
        value: 3
      },],
      checkList: [],
      levelFormat: [],
      radio: 0,
      pojectNo: '',
      loading: false,
      userArray: [{
        label: 'Alaska',
        value: 'Alaska'
      }, {
        label: 'Alabama',
        value: 'Alabama'
      }],
      exFile: null,
      visible: null,
      assVisible: false,
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
    this.fetchFormat()
  },
  methods: {
    exportScan() {
      if (this.clickData.id) {
        this.pojectNo = this.clickData.pojectNo
        // 添加$nextTick确保DOM更新
        this.$nextTick(() => {
          // 添加延迟确保二维码渲染完成
          setTimeout(async () => {
            try {
              const canvas = await html2Canvas(this.$refs.lessonTableImg, {
                useCORS: true,
                allowTaint: true,
                logging: true,  // 开启日志
                scale: 2        // 替代dpi设置，更兼容的方案
              });

              // 临时显示canvas用于调试
              document.body.appendChild(canvas);
              this.convertCanvasToImage(canvas);
            } catch (error) {
              console.error('截图失败:', error);
            }
          }, 500);  // 增加500ms延迟确保渲染
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    // 获取设备的devicePixelRatio
    getPixelRatio(context) {
      let backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    convertCanvasToImage(canvas) {
      var image = new Image();
      image.src = canvas.toDataURL("image/jpg");
      document.body.appendChild(image);
      this.downloadImage(image.src)
      return image;
    },
    // 下载图片地址和保存的图片名称
    downloadImage(imgsrc, name) {
      const image = new Image();
      image.crossOrigin = 'anonymous'; // 直接设置属性，无需 setAttribute
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const ratio = window.devicePixelRatio || 1; // 直接获取设备像素比

        canvas.width = image.width * ratio;
        canvas.height = image.height * ratio;
        ctx.scale(ratio, ratio); // 先缩放上下文
        ctx.drawImage(image, 0, 0, image.width, image.height); // 绘制原始尺寸

        // 生成 JPEG Data URL
        const url = canvas.toDataURL('image/jpeg', 1.0);

        // 创建下载链接
        const a = document.createElement('a');
        a.download = name || 'photo';
        a.href = url;
        a.click(); // 直接触发点击，无需创建 MouseEvent
      };
      image.src = imgsrc;
    },
    handleAudit() {
      if (this.clickData.id) {
        projectAudit({id: this.clickData.id}).then(res => {
          if (res.flag) {
            this.upload()
          }
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    handleUnAudit() {
      if (this.clickData.id) {
        projectAuditNo({id: this.clickData.id}).then(res => {
          if (res.flag) {
            this.upload()
          }
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }

    },
    uploadFile() {
      if (this.clickData.id) {
        this.$emit('showFildDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerBtn(command) {
      if(command=='1') {
        this.handleAudit();
      }else if(command=='2') {
        this.handleUnAudit();
      }else if(command=='3') {
        this.$emit('showDialog')
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchFormat({'name': query})
      } else {
        this.list = [];
      }
    },
    download1() {
      this.exFile = 1
      if (this.exFile == 1) {
        if (this.clickData.id) {
          this.visible = true
        } else {
          this.$message({
            message: '无选中行',
            type: 'warning'
          })
        }
      } else {
        this.visible = true
      }
      this.getFileList()
    },
    download2() {
      this.exFile = 2
      this.visible = true
      this.getFileList()
    },
    onSubmit() {
      /*if (this.selections.length > 0) {
        this.selections.forEach((item, index) => {
          addProjectInitiation({dispatcher: this.user, id: item.id}).then(res => {
            if (res.flag) {
              this.assVisible = false
              this.upload()
            }
          })
        })
      }*/
      if (this.clickData.id) {
        addProjectInitiation({dispatcherId: this.user, id: this.clickData.id}).then(res => {
          if (res.flag) {
            this.assVisible = false
            this.upload()
          }
        })
      }
    },
    confirm() {
      if (this.exFile == '1') {
        this.checkList.forEach((item, index) => {
          var flieName = this.localFileList[this.localFileList.findIndex(file => file.value == item)].label
          ajax.downloadFile(`${window.location.origin}/tenderings/file/download?fileName=` + flieName, {}, {fileName: flieName})
          if (index + 1 == this.checkList.length) {
            this.$message({
              type: 'success',
              message: '下载成功'
            })
          }
        })
      } else {
        ajax.downloadFile(`${window.location.origin}/tenderings/file/download?fileName=` + this.radio, {}, {fileName: this.radio})
      }
    },
    onFun(method) {
      this[method]()
    },
    fetchFormat(val ={}) {
      const data = {
        pageNum: 1,
        pageSize: 10
      };
      getUsersList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.levelFormat = res.data.records
        }
      });
    },
    getFileList(val = {}) {
      const data = {
        pageNum: 1,
        pageSize: 1000
      };
      getFileList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.fileList = res.data.records
        }
      });
    },
    assignment() {
      if (this.clickData.id) {
        this.assVisible = !this.assVisible
        /*if(this.clickData.status == "0"){
          this.assVisible = !this.assVisible
        }else{
          this.$message({
            message: '项目已提交',
            type: 'warning'
          });
        }*/
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    Delivery() {
      if (this.clickData.id) {
        this.$confirm('是否删除（' + this.clickData.projectName + '），删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {
            id: this.clickData.id
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
  .printClass {
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .scan {
    width: 32mm;
    padding: 1mm;
    font-weight: 500;
    font-size: 12px;
  }
  .img-scan {
    width: 20mm;
    height: 20mm;
  }

  .scanImg {
    height: 30mm;
    width: 30mm;
  }
</style>
