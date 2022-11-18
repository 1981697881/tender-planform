import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 商品信息-获取列表
export function getGoodsList(params, data) {
  const url = '/commodity/commodityList/' + params.pageNum + '/' + params.pageSize
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
// 商品信息-新增
export function addCommodity(params) {
  const url = '/commodity/addCommodity'
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 商品信息-刪除
export function deleteCommodity(params) {
  const url = '/commodity/deleteCommodity'
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
// 充值管理-获取列表
export function getAmountMoneyList(params, data) {
  const url = '/amountMoney/list/' + params.pageNum + '/' + params.pageSize
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
// 充值管理-新增
export function addAmountMoney(params) {
  const url = '/amountMoney/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 充值管理-刪除
export function deleteAmountMoney(params) {
  const url = '/amountMoney/delete'
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
