<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px" :size="'mini'">
      <el-row :gutter="20">
        <div style="margin-top: 20px;margin-bottom: 10px">
          <el-button @click="setRow">添加</el-button>
          <el-button @click="delRow">删除</el-button>
          <el-button @click="print">打印</el-button>
        </div>
        <el-table class="list-main" height="300px" :data="list1" border size="mini"
                  @selection-change="handleSelectionChange1" :highlight-current-row="true">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            v-for="(t,i) in columns1"
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
    <el-dialog
      :visible.sync="visible"
      title="选择专家"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postForm" label-width="130px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-input v-model="username" placeholder="名称">
                <el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table class="list-main" height="200px" :data="list2" border size="mini" :highlight-current-row="true"
                      @row-dblclick="dblclick" @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                v-for="(t,i) in columns2"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData">保存</el-button>
    </div>
  </div>
</template>

<script>import {getMajorList, choiceMajorList, choiceMajor} from '@/api/distribution/index'
import { PrintSemi } from '@/tools/doPrint'
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
      list1: [],
      list2: [],
      multipleSelection: [],
      multipleSelection1: [],
      columns1: [{text: '专家姓名', name: 'expertName'},
        {text: '性别', name: 'sex'},
        {text: '单位', name: 'workUnit'},
        {text: '身份证号码', name: 'idcardNo'},
        {text: '手机号码', name: 'mobilePhone'},
        {text: '职称', name: 'job'}/*,
        {text: '星级', name: 'star'},
        {text: '是否待抽取状态', name: 'status'}*/],
      columns2: [{text: '专家姓名', name: 'expertName'},
        {text: '性别', name: 'sex'},
        {text: '单位', name: 'workUnit'},
        {text: '身份证号码', name: 'idcardNo'},
        {text: '手机号码', name: 'mobilePhone'},
        {text: '职称', name: 'job'}/*,
        {text: '星级', name: 'star'},
        {text: '是否待抽取状态', name: 'status'}*/],
      pidS: [],
      rules: {},
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      this.getChoiceMajorList({projectId: this.form.id})
    }
  },
  methods: {
    print() {
      if (this.list1.length > 0) {
        PrintSemi(this.list1, this.form.projectName)
        LODOP.PREVIEW()
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    getChoiceMajorList(val) {
      choiceMajorList(val).then(res => {
        if (res.flag) {
          this.list1 = res.data
        }
      });
    },
    confirm() {
      var number = 0
      if (this.multipleSelection.length > 0) {
        this.list1.forEach((item) => {
          this.multipleSelection.forEach((item2) => {
            if (item.id == item2.id) {
              number++
            } else {
              this.$message({
                message: '该专家已抽取',
                type: 'warning'
              })
            }
          })
        })
        if (number == 0) {
          this.multipleSelection.forEach((item) => {
            this.list1.push(item)
          })
          this.visible = false
        } else {
          this.$message({
            message: '请确认，选中专家已存在被抽取',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 100
      };
      getMajorList(data, {expertName: this.username}).then(res => {
        if (res.flag) {
          this.list2 = res.data.records
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
    },
    dblclick(obj) {
      let number = 0
      this.list1.forEach((item) => {
        if (obj.id == item.id) {
          number++
        }
      })
      if (number == 0) {
        this.list1.push(obj)
        this.visible = false
        console.log(this.list1)
      } else {
        this.$message({
          message: '该专家已抽取',
          type: 'warning'
        })
      }
    },
    setRow() {
      this.visible = true
      this.fetchFormat();
    },
    delRow() {
      if (this.multipleSelection1.length > 0) {
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection1.forEach((item) => {
            const delIndex = this.list1.findIndex((listItem, index) => listItem.id === item.id)
            this.list1.splice(delIndex, 1)
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
    saveData() {
      // 判断必填项
      let array = []
      this.list1.forEach((item) => {
        let obj = {}
        obj.majorId = item.id
        obj.projectId = this.form.id
        array.push(obj)
      })
      choiceMajor(array).then(res => {
        this.$emit('hideDialog', false)
        this.$emit('uploadList')
      });
    },
  }
};
</script>

<style>
  .list-main {
    height: calc(100vh / 4);
  }
</style>
