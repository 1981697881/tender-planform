import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
// 微信用户-下拉
export function getMerchants(params) {
  return request({
    url: '/merchants/form',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 职员管理-获取列表
export function getClerkList(params, query) {
  const url = '/Admin/employee/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}// 文件-获取列表
export function getFileList(params, query) {
  const url = '/uploadFile/uploadFilePage/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 文件-删除
export function deleteUploadFile(params) {
  const url = '/uploadFile/deleteUploadFile'
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
// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/employee/add',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 职员管理-修改
export function alterClerk(params) {
  return request({
    url: '/employee/update',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get'
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/employee/del/' + params,
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'delete',
  })
}
// 文件下载
export function downloadFile(params) {
  return request({
    url: '/file/download/',
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get',
    params
  })
}
// 图片资源-删除
export function deleteImg(params) {
  const url = '/file/deleteImg'
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
// 项目查询-
export function projectInitiationByPerson(params) {
  const url = '/projectInitiation/projectInitiationByPerson'
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 发送邮件-
export function sendMessages(params) {
  const url = '/email/sendMessages'
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: params
  })
}

