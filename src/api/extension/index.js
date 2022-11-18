import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 立项管理-获取列表
export function getProjectInitiationList(params, data) {
  const url = '/projectInitiation/projectInitiationList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}

// 立项管理-新增
export function addProjectInitiation(params) {
  const url = '/projectInitiation/addProjectInitiation'
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 立项管理-删除
export function deleteProjectInitiation(params) {
  return request({
    url: '/projectInitiation/deleteProjectInitiation',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 立项管理-下拉
export function projectInitiationForm(params) {
  return request({
    url: '/projectInitiation/projectInitiationForm',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 立项管理-审核
export function projectAudit(params) {
  return request({
    url: '/projectInitiation/audit',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 立项管理-驳回
export function projectAuditNo(params) {
  return request({
    url: '/projectInitiation/auditNo',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 采购子包-新增
export function addPurchase(params) {
  return request({
    url: '/purchase/addPurchase',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 采购子包-删除
export function deletePurchase(params) {
  return request({
    url: '/purchase/deletePurchase',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 采购子包-查询
export function findPurchase(params) {
  return request({
    url: '/purchase/findPurchase',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 项目管理-文件查询
export function uploadFileList(params) {
  return request({
    url: '/uploadFile/uploadFileList',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 项目管理-文件添加
export function addUploadFile(params) {
  return request({
    url: '/uploadFile/addUploadFile',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

