import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 报名-获取列表
export function getRegistrationList(params, data) {
  const url = '/registration/registrationList/' + params.pageNum + '/' + params.pageSize
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

// 报名-唱标
export function bannerSinging(params) {
  return request({
    url: '/registration/bannerSinging',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 报名-中标确认
export function choiceRegistrations(params) {
  return request({
    url: '/registration/choiceRegistrations',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 报名-保证金确认
export function updateRegistrations(params) {
  return request({
    url: '/registration/updateRegistrations',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 报名-保证金归还
export function returnRegistrations(params) {
  return request({
    url: '/registration/returnRegistrations',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 报名-保证金查询
export function registrationsList(params, data) {
  const url = '/registration/registrationsList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: data,
    method: 'post'
  })
}

