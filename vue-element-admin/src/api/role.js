import request from '../utils/request'

// 后台会根据token拿到用户信息，然后返回路由表
export function getRoutes () {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

// 获取所有角色
export function getRoles () {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

// 给用户添加角色
export function addRole (data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

// 更新角色
export function updateRole (id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

// 删除角色
export function deleteRole (id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
