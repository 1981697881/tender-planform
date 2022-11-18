import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 采购单位管理-获取列表
export function getPurchaseCompanyList(params, data) {
  const url = '/purchaseCompany/purchaseCompanyList/' + params.pageNum + '/' + params.pageSize
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
// 采购单位管理-新增
export function addPurchaseCompany(params) {
  const url = '/purchaseCompany/addPurchaseCompany'
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

// 采购单位管理-删除
export function deletePurchaseCompany(params) {
  return request({
    url: '/purchaseCompany/deletePurchaseCompany',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 采购人管理-获取列表
export function getPurchaserList(params, data) {
  const url = '/purchaser/purchaserList/' + params.pageNum + '/' + params.pageSize
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
// 采购人管理-新增
export function addPurchaser(params) {
  const url = '/purchaser/addPurchaser'
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

// 采购人管理-删除
export function deleteMajor(params) {
  return request({
    url: '/purchaser/deleteMajor',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

