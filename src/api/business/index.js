import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 招标公告-获取列表
export function getNoticeList(params, data) {
  const url = '/notice/noticeList/' + params.pageNum + '/' + params.pageSize
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

// 招标公告-删除
export function deleteNotice(params) {
  return request({
    url: '/notice/deleteNotice',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 招标公告-新增
export function addNotice(params) {
  return request({
    url: '/notice/addNotice',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

