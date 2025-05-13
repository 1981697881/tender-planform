<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="140px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'档案号'" prop="filingNo">
            <el-input v-model="form.filingNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目进度'">
            <el-input v-model="form.proPlan"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'业务员'" prop="projectLeader">
            <el-input v-model="form.projectLeader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'采购方式'" prop="procurementMethod">
            <el-select v-model="form.procurementMethod" class="width-full"  placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in wayArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'资金来源'">
            <el-input v-model="form.fundingSource"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'系统'">
            <el-input v-model="form.proSystem"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item :label="'采购单位'">
            <el-select
              v-model="form.buyingUnit"
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod1"
              :loading="loading"
              class="width-full">
              <el-option :label="t.companyName" :value="t.id" v-for="(t,i) in buyingUnitList"
                         :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="winBasic(0)" size="mini" icon="el-icon-edit"></el-button>
        </el-col>
        <el-col :span="10" v-if="form.demonstration ==1">
          <el-form-item :label="'专家'">
            <el-select
              v-model="form.majorId"
              filterable
              remote
              multiple
              placeholder="请输入关键词"
              :remote-method="remoteMethod2"
              :loading="loading"
              class="width-full">
              <el-option :label="t.expertName" :value="t.id" v-for="(t,i) in majorList"
                         :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2" v-if="form.demonstration ==1">
          <el-button type="primary" @click="winBasic(1)" size="mini" icon="el-icon-edit"></el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'公司名称'">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目名称'" prop="projectName">
            <el-input v-model="form.projectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目编号'">
            <el-input v-model="form.pojectNo" readOnly placeholder="自动生成"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'编写'">
            <el-input v-model="form.compile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'审核'">
            <el-input v-model="form.proExamine"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'预算金额(万元)'">
            <el-input-number style="width: auto" v-model="form.budgetAmount" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'报名费用'">
            <el-input-number style="width: auto" v-model="form.regFee" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'起始日期'" prop="registrationDate">
            <el-date-picker
              v-model="form.fillingDate"
              type="date"
              style="width: auto"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'年限类型'">
            <el-select v-model="form.durationType" class="width-full"  placeholder="请选择">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in durationList" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="form.durationType">
            <el-input-number :precision="1" :step="0.1" style="width: auto" v-model="form.serviceLife" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'到期时间'">
            <span>{{form.serviceEnddate}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目类型'" prop="pojectType">
            <el-select v-model="form.pojectType" clearable style="width: 100%">
              <el-option
                v-for="(t,i) in option"
                :key="i"
                :label="t.label"
                :value="t.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'报名开始时间'" prop="enrollStartdate">
            <el-date-picker
              v-model="form.enrollStartdate"
              type="datetime"
              style="width: auto"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'报名截至时间'" prop="enrollEnddate">
            <el-date-picker
              v-model="form.enrollEnddate"
              type="datetime"
              style="width: auto"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>-->

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否论证">
            <el-radio-group v-model="form.demonstration">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否需要缴纳保证金">
            <el-radio-group v-model="form.bond">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'子采购包'" prop="orgAttr">
            <div style="margin-bottom: 10px">
              <el-button @click="addRow">添加</el-button>
            </div>
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true">
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
                  <el-button @click="handleDetele(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="子采购包"
      v-if="visible"
      :width="'40%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="postForm" :rules="rules2" ref="postForm" label-width="130px" :size="'mini'">
        <el-row :span="20">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'采购包名称'" prop="packageName">
              <el-input v-model="postForm.packageName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'单价（元）'">
              <el-input-number style="width: 100%" v-model="postForm.univalent" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row :span="20">
          <el-col :span="10" :offset="4">
            <el-form-item :label="'供应商'">
              <el-select
                v-model="postForm.supplierId"
                filterable
                remote
                placeholder="请输入关键词"
                :remote-method="remoteMethod3"
                :loading="loading"
                class="width-full">
                <el-option :label="t.supplierName" :value="t.id" v-for="(t,i) in supplierList"
                           :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="winBasic(2)" size="mini" icon="el-icon-edit"></el-button>
          </el-col>
        </el-row>-->
        <el-row :span="20">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'数量'">
              <el-input-number  style="width: 100%" v-model="postForm.quantity" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'小计（元）'">
              <el-input v-model="postForm.subtotal" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'计价单位'" prop="unitOfMeasurement">
              <el-select v-model="postForm.unitOfMeasurement" class="width-full" placeholder="请选择">
                <el-option :label="t.label" :value="t.value" v-for="(t,i) in levelFormat" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20" v-if="form.bond == '1'">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'保证金比例'" prop="proportion">
              <el-select v-model="postForm.proportion" class="width-full" placeholder="请选择">
                <el-option :label="t.label" :value="t.value" v-for="(t,i) in priceList" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20" v-if="form.bond == '1'">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'保证金（元）'">
              <el-input-number style="width: 100%" :precision="0" :min="0" v-model="postForm.bond"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'代理服务费（元）'">
              <el-input-number style="width: 100%" v-model="postForm.agencyFee" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="12" :offset="4">
            <el-form-item :label="'规格说明'">
              <el-input v-model="postForm.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="visible1"
      title="维护资料"
      v-if="visible1"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form v-if="isFormWin == 0" :model="buyingUnitForm" :rules="rulesBuyingUnit" ref="buyingUnitForm"
               label-width="130px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'单位名称'" prop="companyName">
              <el-input v-model="buyingUnitForm.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'注册时间'" prop="registrationDate">
              <el-date-picker
                v-model="buyingUnitForm.registrationDate"
                type="date"
                style="width: auto"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'联系人'">
              <el-input v-model="buyingUnitForm.contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'联系电话'">
              <el-input v-model="buyingUnitForm.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'所属系统'" prop="systemes">
              <el-select v-model="buyingUnitForm.systemes" class="width-full" placeholder="请选择">
                <el-option :label="t.label" :value="t.value" v-for="(t,i) in pArray" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'联系地址'">
              <el-input v-model="buyingUnitForm.contactAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'传真'">
              <el-input v-model="buyingUnitForm.fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'邮箱'">
              <el-input v-model="buyingUnitForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'公司联系电话'">
              <el-input v-model="buyingUnitForm.companyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'税号'">
              <el-input v-model="buyingUnitForm.dutyParagraph"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'经营范围'">
              <el-input v-model="buyingUnitForm.ranges"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'备注'">
              <el-input v-model="buyingUnitForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-if="isFormWin == 1" :model="majorForm" :rules="rulesMajor" ref="majorForm" label-width="130px"
               :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'专家姓名'" prop="expertName">
              <el-input v-model="majorForm.expertName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'性别'" prop="sex">
              <el-select v-model="majorForm.sex" class="width-full" placeholder="请选择">
                <el-option :label="t.label" :value="t.value" v-for="(t,i) in sArray" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'工作单位'" prop="workUnit">
              <el-input v-model="majorForm.workUnit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'职称/职务'" prop="job">
              <el-input v-model="majorForm.job"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'身份证号码'">
              <el-input v-model="majorForm.idcardNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'移动电话'">
              <el-input v-model="majorForm.mobilePhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'专业分类'">
              <el-select v-model="majorForm.major" class="width-full" placeholder="请选择">
                <el-option :label="t.label" :value="t.value" v-for="(t,i) in zArray" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'熟悉专业'">
              <el-input v-model="majorForm.knowMajor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-if="isFormWin == 2" :model="supplierForm" :rules="rulesSupplier" ref="supplierForm" label-width="130px"
               :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'供应商名称'" prop="supplierName">
              <el-input v-model="supplierForm.supplierName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'法人代表'" prop="legalRepresentative">
              <el-input v-model="supplierForm.legalRepresentative"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'统一社会信用号码'" prop="companyName">
              <el-input v-model="supplierForm.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'邮箱'" prop="mailbox">
              <el-input v-model="supplierForm.mailbox"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'联系人'" prop="contacts">
              <el-input v-model="supplierForm.contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'联系电话'" prop="contactNumber">
              <el-input v-model="supplierForm.contactNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'供应商登录账号'">
              <el-input v-model="supplierForm.supplierAccountNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'供应商登录密码'">
              <el-input v-model="supplierForm.supplierPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="saveBasic">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addProjectInitiation, addPurchase, deletePurchase, findPurchase} from '@/api/extension/index'
import {getMajorList, choiceMajor, choiceMajorList, addMajor} from '@/api/distribution/index'
import {getPurchaseCompanyList, addPurchaseCompany} from '@/api/purchase/index'
import {getSupplierList, addSupplier} from '@/api/supplier/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isFormWin: null,
      buyingUnitForm: {
        registrationDate: null,
        contacts: null,
        contactPhone: null,
        systemes: null,
        contactAddress: null,
        fax: null,
        email: null,
        companyPhone: null,
        dutyParagraph: null,
        ranges: null,
        remark: null,
        companyName: null,// 名称
      },
      majorForm: {
        expertName: null,// 名称
        sex: null,
        workUnit: null,
        job: null,
        idcardNo: null,
        mobilePhone: null,
        major: null,
        knowMajor: null,
        age: null,
        graduateSchool: null,
        officeTel: null,
        qqNo: null,
        eMail: null,
        birthday: null,
        majorBelong: null,
        jobTitle: null,
        education: null,
        years: null,
        unitAddress: null,
        homeAddress: null,
        certificate: null,
        remark: null,
        idPhoto: null,
      },
      supplierForm: {
        contactNumber: null,
        contacts: null,
        fax: null,
        legalRepresentative: null,
        mailbox: null,
        natureOfBusiness: null,
        registeredCapital: null,
        registrationTime: null,
        supplierAccountNumber: null,
        supplierAddress: null,
        supplierName: null,
        supplierPassword: null,
        remark: null
      },
      visible: null,
      visible1: null,
      endDate: null,
      loading: false,
      form: {
        bond: '0',
        inquiry: '0',
        randomSupplier: '0',
        demonstration: '0',
        ifPersonal: '0',
        budgetAmount: '1',
        regFee: '1',
        projectLeader: null,
        filingNo: null,
        pojectType: null,
        projectName: null,
        pojectNo: null,
        fillingDate: null,
        durationType: '服务年限',
        procurementMethod: null,
        fundingSource: null,
        buyingUnit: null,
        serviceEnddate: null,
        majorId: [],
        buyingContacts: null,
        buyingPhone: null,
        buyingEmail: null,
        enrollStartdate: null,
        enrollEnddate: null,
        proExamine: null,
        proSystem: null,
        serviceLife: 0,
        proPlan: null,
        companyName: null
      },
      postForm: {
        packageName: null, // 名称
        description: null,
        projectId: null,
        supplierId: null,
        agencyFee: 0,
        univalent: 1,
        proportion: null,
        bond: null,
        unitOfMeasurement: null,
        subtotal: 1,
        quantity: 1
      },
      zArray: [
        {'label': '技术', 'value': '技术' },
        {'label': '经济', 'value': '经济' },
        {'label': '技术&经济', 'value': '技术&经济' },
        {'label': '生物信息学', 'value': '生物信息学' },
        {'label': '人体遗传学', 'value': '人体遗传学' },
        {'label': '机构力学', 'value': '机构力学' }
      ],
      sArray: [
        {'label': '男', 'value': '男' },
        {'label': '女', 'value': '女' }
      ],
      durationList: [
        {'label': '服务年限', 'value': '服务年限' },
        {'label': '供货年限', 'value': '供货年限' }
      ],
      wayArray: [
        {'label': '公招', 'value': '公招' },
        {'label': '邀标', 'value': '邀标' },
        {'label': '磋商', 'value': '磋商' },
        {'label': '谈判', 'value': '谈判' },
        {'label': '询价小额', 'value': '询价小额' },
        {'label': '单一来源', 'value': '单一来源' }
      ],
      pArray: [{
        'label': '教育系统',
        'value': '教育系统'
      }, {
        'label': '医疗系统',
        'value': '医疗系统'
      }, {
        'label': '公安系统',
        'value': '公安系统'
      }, {
        'label': '企业',
        'value': '企业'
      }, {
        'label': '镇,街',
        'value': '镇,街'
      }, {
        'label': '事业单位',
        'value': '事业单位'
      }],
      option: [{
        label: '货物类',
        value: '货物类'
      }, {
        label: '工程类',
        value: '工程类'
      }, {
        label: '服务类',
        value: '服务类'
      }],
      levelFormat: [{
        label: '个',
        value: '个'
      }, {
        label: '台',
        value: '台'
      }, {
        label: '件',
        value: '件'
      }, {
        label: '只',
        value: '只'
      }, {
        label: '套',
        value: '套'
      }, {
        label: '项',
        value: '项'
      }, {
        label: '批',
        value: '批'
      }, {
        label: '年',
        value: '年'
      }],
      option2: [{
        label: '询价',
        value: '询价'
      }, {
        label: '公开招标',
        value: '公开招标'
      }, {
        label: '邀请招标',
        value: '邀请招标'
      }, {
        label: '竞争式谈判',
        value: '竞争式谈判'
      }, {
        label: '竞争式磋商(政府采购)',
        value: '竞争式磋商(政府采购)'
      }, {
        label: '单一来源',
        value: '单一来源'
      }, {
        label: '磋商(非政府采购)',
        value: '磋商(非政府采购)'
      }, {
        label: '工程招标',
        value: '工程招标'
      }, {
        label: '企业标',
        value: '企业标'
      }],
      option3: [{
        label: '财政拨款',
        value: '财政拨款'
      }, {
        label: '自筹经费',
        value: '自筹经费'
      }, {
        label: '其他经费',
        value: '其他经费'
      }],
      priceList: [
        {
          label: '1%',
          value: '0.01'
        },
        {
          label: '2%',
          value: '0.02'
        }
      ],
      list: [],
      buyingUnitList: [],
      supplierList: [],
      majorList: [],
      columns: [
        { text: '采购包名称', name: 'packageName' },
        // { text: '供应商', name: 'supplierName' },
        { text: '预算金额（元）', name: 'subtotal' },
        { text: '代理服务费（元）', name: 'agencyFee' },
        { text: '保证金（元）', name: 'bond' }
      ],
      disPl: true,
      rules: {
        projectLeader: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        projectName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        procurementMethod: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      },
      rules2: {
        packageName: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        unitOfMeasurement: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      },
      rulesBuyingUnit: {
        companyName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        registrationDate: [
          {required: true, message: '请选择', trigger: 'change'},
        ], systemes: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
      },
      rulesMajor: {
        expertName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        sex: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        workUnit: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        job: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
      },
      rulesSupplier: {
        supplierName: [
          {required: true, message: '请输入名稱', trigger: 'blur'}
        ], legalRepresentative: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], mailbox: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], contacts: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], contactNumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        storeId: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      }
    }
  },
  watch: {
    postForm: {
      handler(val) {
        this.postForm.subtotal = this.postForm.univalent * this.postForm.quantity
        this.postForm.bond = Math.floor(this.postForm.subtotal * this.postForm.proportion)
      },
      deep: true
    },
    form: {
      handler(val) {
        if (this.form.serviceLife != null && this.form.fillingDate != null) {
          this.form.serviceEnddate = this.getDay(this.form.fillingDate, this.form.serviceLife).date
        }
      },
      deep: true
    },
  },
  mounted() {
    // this.fetchSupplierList({})
    if (this.listInfo) {
      this.form = this.listInfo
      if (this.form.buyingUnit != null) {
        this.form.buyingUnit = Number(this.form.buyingUnit)
        this.fetchBuyingUnitList({id: this.form.buyingUnit})
      }
      if (this.form.majorId) {
        this.getChoiceMajorList({projectNo: this.form.pojectNo})
      }
      this.fetchFormat({projectId: this.form.id})
    }else{
      this.fetchMajorList({})
      this.fetchBuyingUnitList({})
    }
  },
  methods: {
    winBasic(val) {
      this.visible1 = true
      this.isFormWin = val
    },
    getChoiceMajorList(val) {
      choiceMajorList(val).then(res => {
        if (res.flag && res.data.length > 0) {
          let array = []
          let majorList = []
          res.data.forEach((item) => {
            array.push(item.id)
            majorList.push(item)
          })
          this.majorList = majorList
          this.form.majorId = array
        } else {
          this.fetchMajorList({})
        }
      })
    },
    fetchBuyingUnitList(val) {
      const data = {
        pageNum: 1,
        pageSize: 100
      };
      getPurchaseCompanyList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.buyingUnitList = res.data.records
        }
      });

    },
    fetchMajorList(val) {
      const data = {
        pageNum: 1,
        pageSize: 100
      };
      getMajorList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.majorList = res.data.records
        }
      });
    }, fetchSupplierList(val) {
      const data = {
        pageNum: 1,
        pageSize: 100
      };
      getSupplierList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.supplierList = res.data.records
        }
      });
    },
    remoteMethod1(query) {
      if (query !== '') {
        this.loading = true
        this.fetchBuyingUnitList({companyName: query})
      } else {
        this.buyingUnitList = [];
      }
    }, remoteMethod2(query) {
      if (query !== '') {
        this.loading = true
        this.fetchMajorList({expertName: query})
      } else {
        this.majorList = [];
      }
    }, remoteMethod3(query) {
      if (query !== '') {
        this.loading = true
        this.fetchSupplierList({supplierName: query})
      } else {
        this.supplierList = [];
      }
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length == 1) {
        m = '0' + month;
      }
      return m;
    },
    getDay(date, yearsInput) {
      // 解析输入日期
      const currentDate = date ? new Date(date) : new Date();

      // 保留一位小数并分离整数与小数部分
      const years = yearsInput;
      const integerYears = Math.floor(years);
      const decimalYears = years - integerYears;

      // 将小数年转换为月份（四舍五入到整数）
      const decimalMonths = decimalYears * 12;
      const roundedMonths = Math.round(decimalMonths);

      // 创建新日期并调整年月
      const adjustedDate = new Date(currentDate);
      adjustedDate.setFullYear(currentDate.getFullYear() + integerYears);
      adjustedDate.setMonth(currentDate.getMonth() + roundedMonths);

      // 格式化输出
      const format = num => num.toString().padStart(2, '0');
      const tYear = adjustedDate.getFullYear();
      const tMonth = format(adjustedDate.getMonth() + 1);
      const tDate = format(adjustedDate.getDate());
      const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

      return {
        day: tDate,
        week: weeks[adjustedDate.getDay()],
        date: `${tYear}-${tMonth}-${tDate}`
      };
    },
    addRow() {
      if (this.form.id != null) {
        this.visible = true
        this.postForm = {
          packageName: null, // 名称
          description: null,
          projectId: null,
          supplierId: null,
          agencyFee: 0,
          univalent: 1,
          proportion: null,
          bond: null,
          unitOfMeasurement: null,
          subtotal: 1,
          quantity: 1
        }
        this.postForm.projectId = this.form.id
      } else {
        this.$message({
          type: 'info',
          message: '请先保存项目'
        })
      }
    },
    handleUpdate(item) {
      this.postForm = item
      this.visible = true
    },
    handleDetele(item) {
      if (item.id) {
        this.$confirm('是否删除(' + item.packageName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePurchase({id: item.id}).then(res => {
            if (res.flag) {
              this.fetchFormat({projectId: this.postForm.projectId})
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    confirm() {
      let me = this
      this.$refs['postForm'].validate((valid) => {
        // 判断必填项
        if (valid) {
          addPurchase(this.postForm).then(res => {
            if (res.flag) {
              me.visible = false
              me.fetchFormat({projectId: this.postForm.projectId})
            }
          })
        } else {
          return false
        }
      })
    },

    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addProjectInitiation(this.form).then(res => {
            if (res.flag) {
              if (this.form.majorId == null) {
                this.form.majorId = []
              }
              if (this.form.majorId.length > 0) {
                let array = []
                this.form.majorId.forEach((item) => {
                  let obj = {}
                  obj.majorId = item
                  obj.projectNo = this.form.pojectNo
                  array.push(obj)
                })
                choiceMajor(array).then(reso => {
                  this.$emit('hideDialog', false)
                  this.$emit('uploadList')
                })
              } else {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              }
            }
          })
        } else {
          return false
        }
      })
    },
    saveBasic() {
      if (this.isFormWin == 0) {
        this.$refs['buyingUnitForm'].validate((valid) => {
          // 判断必填项
          if (valid) {
            addPurchaseCompany(this.buyingUnitForm).then(res => {
              if (res.flag) {
                this.fetchBuyingUnitList({})
                this.visible1 = false
              }
            });
          } else {
            return false
          }
        })
      } else if (this.isFormWin == 1) {
        this.$refs['majorForm'].validate((valid) => {
          // 判断必填项
          if (valid) {
            addMajor(this.majorForm).then(res => {
              if (res.flag) {
                this.fetchMajorList({})
                this.visible1 = false
              }
            })
          } else {
            return false
          }
        })
      } else if (this.isFormWin == 2) {
        this.$refs['supplierForm'].validate((valid) => {
          // 判断必填项
          if (valid) {
            addSupplier(this.supplierForm).then(res => {
              if (res.flag) {
                this.fetchSupplierList({})
                this.visible1 = false
              }
            });
          } else {
            return false
          }
        })
      }
    },
    fetchFormat(val) {
      findPurchase(val).then(res => {
        this.list = res.data
      })
    }
  }
};
</script>

<style>
</style>
