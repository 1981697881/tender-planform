import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 用户权限管理-获取用户组
export function getUsersTree(params) {
  var url = '/Admin/group/list/'
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get'
  })
}
// 用户管理-用户组新增
export function groupAdd(params) {
  const url = '/Admin/group/add'
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
// 用户管理-用户组修改
export function groupAlter(params) {
  const url = '/Admin/group/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      goods: params
    }
  })
}
// 用户管理-用户组删除
export function delGroup(params) {
  const url = '/Admin/group/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'delete'
  })
}
// 用户权限管理-获取列表
export function getUsersList(data) {
  const url = '/Admin/user/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户权限管理-新增
export function addUsers(params) {
  const url = '/Admin/user/add/'
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
// 用户权限管理-修改
export function alterUsers(params) {
  const url = '/Admin/user/update/'
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 用户权限管理-删除
export function delUsers(params) {
  const url = '/Admin/user/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户权限管理-禁用
export function disableUsers(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-启用
export function enableUsers(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get',
    params
  })
}
// 用户管理-获取详情信息
export function getUsersInfo(params) {
  const url = '/Admin/user/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户权限管理-职员下拉
export function getClerk(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-获取菜单树
export function getMenuList(params) {
  return request({
    url: '/sys-menu/getSysMenuTree',
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get',
  })
}

// 部门管理-获取列表
export function getDepartmentList(params, data) {
  const url = '/department/departmentList/' + params.pageNum + '/' + params.pageSize
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
// 部门管理-新增
export function addDepartment(params) {
  const url = '/department/addDepartment'
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

// 部门管理-删除
export function deleteDepartment(params) {
  return request({
    url: '/department/deleteDepartment',
    headers: {
      'authorization': getToken('tenderrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 关于我们-获取列表
export function getFindAbout(params, data) {
  const url = '/about/findAbout'
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

// 关于我们-新增
export function addAbout(params) {
  const url = '/about/addAbout'
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
// 权限按钮-查找
export function getByUserAndPrId(params) {
  return request({
    url: '/sys-menu/getByUserAndPrId/' + params,
    headers: {
      'authorization': getToken('tenderrx')
    },
    method: 'get'
  })
}
// 用户管理-获取用户列表
export function getUserList(params) {
  const url = '/Admin/user/getUserList'
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
