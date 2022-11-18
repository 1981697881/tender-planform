import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 专家管理-获取列表
export function getMajorList(params, data) {
  const url = '/major/majorList/' + params.pageNum + '/' + params.pageSize
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
// 专家管理-新增
export function addMajor(params) {
  const url = '/major/addMajor'
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

// 专家管理-删除
export function deleteMajor(params) {
  return request({
    url: '/major/deleteMajor',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 专家管理-抽取列表
export function choiceMajorList(params) {
  return request({
    url: '/major/choiceMajorList',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 专家管理-抽取专家
export function choiceMajor(params) {
  return request({
    url: '/major/choiceMajor',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

