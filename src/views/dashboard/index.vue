<template>
  <div class="dashboard-container" v-loading="loading">
    <el-alert
      :title="'欢迎回来！'+name"
      type="success"
      effect="dark"
      :closable="false"
    ></el-alert>
<!--
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />-->

    <!--<el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>-->
    <el-row :gutter="32">
      <el-calendar v-model="month">
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
          slot="dateCell"
          slot-scope="{date, data}">
          <!-- 这里加了周六周天的判断 -->
          <div class="weeked">{{data.day}}</div>
          <!-- 数组循环 -->
          <div class="cell" v-for="(item,index) in tableData">
            <!-- 加数据 -->
            <div v-if="data.day == item.date">
              <div class="info text-center" style="padding: 4px" v-if="item.info.length>0" @click.stop="clickDate(item.info)">
                <i class="el-icon-aim"></i>
                <b>开标：{{item.info.length}} </b>
              </div>
              <div class="info text-center" v-if="item.info2.length>0" @click.stop="clickDate(item.info2)">
                <i class="el-icon-timer"></i>
                <b>到期项目：{{item.info2.length}} </b>
              </div>
            </div>
          </div>
          <!--<p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
          </p>-->
        </template>
      </el-calendar>
    </el-row>

    <!--<el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <todo-list :placeholder="'我的审批'"/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <todo-list :placeholder="'我的任务'" />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <todo-list :placeholder="'公告通知'" />
      </el-col>
    </el-row>-->
    <el-dialog
      :visible.sync="visible"
      title="项目信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="130px" :size="'mini'">
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
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <el-dialog
        :visible.sync="visible2"
        title="基本信息"
        v-if="visible2"
        :width="'50%'"
        append-to-body
      >
        <info @hideDialog="hideWindow" @uploadList="fetchDateData" :listInfo="listInfo"></info>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanelGroup from "./components/PanelGroup"
import ZyLineChart from './components/ZyLineChart'
import ZyList from './components/ZyList'
import McjList from './components/McjList'
import McjLineChart from './components/McjLineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'
import { mainReport } from '@/api/system/index'
import {getProjectInitiationList} from '@/api/extension/index'
import moment from "moment";
import { Info} from "../extension/project/form";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: "Dashboard",
  components:{
    PanelGroup,
    ZyLineChart,
    ZyList,
    McjList,
    McjLineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    Info,
  },
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      loading: false,
      visible: false,
      visible2: false,
      listInfo: null,
      list: [],
      columns: [
        { text: '项目名称', name: 'projectName' },
        { text: '项目编号', name: 'pojectNo' }
      ],
      month: moment().format('YYYY-MM'),
      tableData: [
        /*{
          day:'2022-12-01',
          info:[
            {
              all:'all2',
              name: '1',
            },
          ],
        },*/
      ],
      lineChartData: lineChartData.newVisitis
    }
  },
  watch: {
    month: function (newVal,oldVal) {

    },
  },
  created: function() {
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      );
      prevBtn.addEventListener("click", e => {
        this.fetchDateData({openMarkdate: moment(this.month).format('YYYY-MM')})

      });

      //点击下一个月
      let nextBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(3)"
      );
      nextBtn.addEventListener("click", () => {
        this.fetchDateData({openMarkdate: moment(this.month).format('YYYY-MM')})

      });

      //点击今天
      let todayBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(2)"
      );
      todayBtn.addEventListener("click", () => {
        this.fetchDateData({openMarkdate: moment(this.month).format('YYYY-MM')})

      });
    });
  },
  mounted() {
    this.fetchDateData({openMarkdate: this.month})
  },
  methods: {
    handleUpdate(obj){
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    hideWindow(val) {
      this.visible = val
      this.visible2 = val
    },
    clickDate(val){
      this.visible= true
      this.list = val
    },
    fetchDateData(val={openMarkdate: this.month}, data = {
      pageNum:  1,
      pageSize: 50
    }) {
      val = { ...val, ...data }
      getProjectInitiationList(data, val).then(res => {
        if(res.flag){
          this.tableData = []
          this.tableData = res.data.records.reduce((acc, current) => {
            // 处理 openMarkdate 的分组
            const openDate = current.openMarkdate.substring(0, 10);
            let openGroup = acc.find(item => item.date === openDate);
            if (openGroup) {
              openGroup.info.push(current);
            } else {
              acc.push({ date: openDate, info: [current], info2: [] });
            }

            // 处理 enrollEnddate 的分组
            if(current.serviceEnddate != null){
              const endDate = current.serviceEnddate.substring(0, 10);
              let endGroup = acc.find(item => item.date === endDate);
              if (endGroup) {
                endGroup.info2.push(current);
              } else {
                acc.push({ date: endDate, info: [], info2: [current] });
              }
            }
            return acc;
          }, []);
            /*res.data.records.forEach((item,index)=>{
              let number = 0
              console.log(this.tableData.length)
              if(this.tableData.length>0){
                this.tableData.forEach((date)=>{
                  if(date.day == item.openMarkdate){
                    date.info.push(item)
                    number++;
                  }
                })
              }
              console.log(number)
              if(number==0){
                this.tableData.push({day: item.openMarkdate.substring(0,10),info: [item]})
              }
            })*/
        }
      });
    },
    getDaysBetween(dateString1,dateString2){
      let dateStart = Date.parse(dateString1);
      let dateEnd = Date.parse(dateString2);
      let days = (dateEnd - dateStart)/(1*24*60*60*1000);
      // alert(days);
      return  days
    },
    // 查询前后三天日期
    getDay(date, day){
      if(date == ''){
        var today = new Date();
      }else{
        var today = new Date(date[0], date[1]-1, date[2]);
      }
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
      today.setTime(targetday_milliseconds) //注意，这行是关键代码
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      var getDay = today.getDay()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      var week = weeks[getDay]
      return {
        day: tDate,
        week: week,
        date: tYear + "-" + tMonth + "-" + tDate
      }
    },
    doHandleMonth(month) {
      var m = month;
      if(month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    // 查询
    query() {

    },
    fetchData(val) {
      let interval = this.getDaysBetween(val.startDate, val.endDate)
      let columns = []
      let array = []
      let array2 = []
      let arrayDay = []
      let indentNum = []
      let invPorcelainNum = []
      let porcelainYield = []
      let porcelainDeliveryNum = []

      let orderNum = []
      let dopeYield = []
      let dopeDeliveryNum = []
      if (interval > 100) {
        return this.$message({
          message: '抱歉，超出可查询范围！',
          type: 'warning'
        });
      } else {
        let startData = val.startDate
        startData = startData.replace(/:/g, '-')
        startData = startData.replace(/ /g, '-')
        let arr = startData.split('-')
        columns = [
          { text: '数量', width: '150px', name: 'project' }
        ]
        array = [
          { project: '订单量（桶）' },
          { project: '产量（桶）' },
          { project: '发货量（桶）' },
        ]
        array2 = [
          { project: '订货量（支）' },
          { project: '库存量（支）' },
          { project: '产量（支）' },
          { project: '发货量（支）' },
        ]
        mainReport(val).then(res => {
          if (res.flag) {
            const data = res.data
            let results = []
            for (let i = 0; i <= Number(interval); i++) {
              // 根据时间生成表头 把时间包含数据重新组装 -》array
              columns.push({text: this.getDay(arr, i).date + '', name: this.getDay(arr, i).date + '', width: '100px'})
              arrayDay.push(this.getDay(arr, i).date)
             /* data.forEach((item, index) => {
                for (let j in item) {
                  let aDate = item.date.replace(/:/g, '-')
                  aDate = aDate.replace(/ /g, '-')
                  let nDate = aDate.split('-')
                  if (this.doHandleMonth(i + 1) == this.getDay(nDate, 0).day) {
                    if (j == 'indentNum') {
                      indentNum.push((item.indentNum == null ? 0 : item.indentNum))
                    } else if (j == 'invPorcelainNum') {
                      invPorcelainNum.push((item.invPorcelainNum == null ? 0 : item.invPorcelainNum))
                    } else if (j == 'porcelainYield') {
                      porcelainYield.push((item.porcelainYield == null ? 0 : item.porcelainYield))
                    } else if (j == 'porcelainDeliveryNum') {
                      porcelainDeliveryNum.push((item.porcelainDeliveryNum == null ? 0 : item.porcelainDeliveryNum))
                    }else if (j == 'orderNum') {
                      orderNum.push((item.orderNum == null ? 0 : item.orderNum))
                    }else if (j == 'dopeYield') {
                      dopeYield.push((item.dopeYield == null ? 0 : item.dopeYield))
                    }else if (j == 'dopeDeliveryNum') {
                      dopeDeliveryNum.push((item.dopeDeliveryNum == null ? 0 : item.dopeDeliveryNum))
                    }
                  }
                }
              })*/
            }
            data.forEach((item, index) => {
              array.forEach((item2, index2) => {
                let date = item['date']
                date = date.replace(/:/g, '-')
                date = date.replace(/ /g, '-')
                let arr1 = date.split('-')
                let key = this.getDay(arr1, 0).date + ''
                if (index2 == 0) {
                  item2[key] = item.orderNum
                  orderNum.push((item.orderNum == null ? 0 : item.orderNum))
                } else if (index2 == 1) {
                  item2[key] = item.dopeYield
                  dopeYield.push((item.dopeYield == null ? 0 : item.dopeYield))
                } else if (index2 == 2) {
                  item2[key] = item.dopeDeliveryNum
                  dopeDeliveryNum.push((item.dopeDeliveryNum == null ? 0 : item.dopeDeliveryNum))
                }
              })
              array2.forEach((item2, index2) => {
                let date = item['date']
                date = date.replace(/:/g, '-')
                date = date.replace(/ /g, '-')
                let arr1 = date.split('-')
                let key = this.getDay(arr1, 0).date + ''
                if (index2 == 0) {
                  item2[key] = item.indentNum
                  indentNum.push((item.indentNum == null ? 0 : item.indentNum))
                } else if (index2 == 1) {
                  item2[key] = item.invPorcelainNum
                  invPorcelainNum.push((item.invPorcelainNum == null ? 0 : item.invPorcelainNum))
                } else if (index2 == 2) {
                  item2[key] = item.porcelainYield
                  porcelainYield.push((item.porcelainYield == null ? 0 : item.porcelainYield))
                } else if (index2 == 3) {
                  item2[key] = item.porcelainDeliveryNum
                  porcelainDeliveryNum.push((item.porcelainDeliveryNum == null ? 0 : item.porcelainDeliveryNum))
                }
              })
            })
          }
          this.$nextTick(() => {
            this.$refs.zyLine.initChart({arrayDay: arrayDay, orderNum: orderNum, dopeYield: dopeYield, dopeDeliveryNum: dopeDeliveryNum})
          })
          this.$nextTick(() => {
            this.$refs.mcjLine.initChart({arrayDay: arrayDay, indentNum: indentNum, invPorcelainNum: invPorcelainNum, porcelainYield: porcelainYield, porcelainDeliveryNum: porcelainDeliveryNum})
          })
          this.loading = false
        })
      }
      return {array: array, array2: array2, columns: columns}
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
};
</script>

<style lang="scss" scoped>
  .weeked{
    padding: 5px;
    background-color: #f1f6fb;
    text-align: center;
  }
  .is-selected {
    color: #1989FA;
  }
.dashboard {
  &-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-main {
    margin: 30px;
  }

}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
