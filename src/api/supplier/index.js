import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 供应商管理-获取列表
export function getSupplierList(params, data) {
  const url = '/supplier/supplierList/' + params.pageNum + '/' + params.pageSize
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
// 供应商管理-新增
export function addSupplier(params) {
  const url = '/supplier/addSupplier'
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

// 供应商管理-删除
export function deleteSupplier(params) {
  return request({
    url: '/supplier/deleteSupplier',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

