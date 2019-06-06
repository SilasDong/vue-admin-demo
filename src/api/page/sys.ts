import request from '@/http/axios'

// 系统字典模块--系统字典信息分页查询
export const dictList = (groupId: string) => request({
  url: `/api/m-sys-dict-query?groupId=${groupId}`,
  method: 'get'
})

// 系统角色模块--系统角色查询
export function roleList(params = {}) {
  return request({
    url: '/api/xcd-m-sys-role-query',
    method: 'get',
    params
  })
}

// 系统角色模块--系统角色信息添加
export function insertRole(data: object) {
  return request({
    url: '/api/xcd-m-sys-role-add',
    method: 'post',
    data
  })
}

// 系统角色模块--系统角色信息更新
export function updateRole(data: object) {
  return request({
    url: '/api/xcd-m-sys-role-update',
    method: 'post',
    data
  })
}

// 系统角色模块--系统角色信息删除
export function deleteRole(data: object) {
  return request({
    url: '/api/xcd-m-sys-role-delete',
    method: 'post',
    data
  })
}

// 通过角色获取递归菜单列表
export function menuTreeListByRole(params = {}) {
  return request({
    url: '/api/m-sys-menu-query-by-role',
    method: 'get',
    params
  })
}

// 更新菜单角色
export function updateMenuRole(data = {}) {
  return request({
    url: '/api/m-sys-menu-role-update-by-role',
    method: 'post',
    data
  })
}

// 菜单按钮权限查询
export function menuButtonList(pid: string) {
  return request({
    url: '/api/m-sys-menu-button-query',
    method: 'get',
    params: { pid }
  })
}

// 插入默认的菜单按钮权限（增，删，改）
export function insertDefaultMenuButton(data = {}) {
  return request({
    url: '/api/m-sys-menu-button-insert-default',
    method: 'post',
    data
  })
}
// 插入自定义菜单按钮权限
export function insertMenuButton(data = {}) {
  return request({
    url: '/api/m-sys-menu-button-insert',
    method: 'post',
    data
  })
}

// 插入自定义菜单按钮权限
export function deleteMenuButton(id: string) {
  return request({
    url: '/api/m-sys-menu-button-delete',
    method: 'post',
    data: { id }
  })
}

// 系统用户模块
// 系统用户分页查询
export function userList(params = {}) {
  return request({
    url: '/api/m-sys-user-query-for-list',
    method: 'get',
    params
  })
}

// 系统用户添加
export function insertUser(data = {}) {
  return request({
    url: '/api/m-sys-user-insert',
    method: 'post',
    data
  })
}

// 系统用户修改
export function updateUser(data = {}) {
  return request({
    url: '/api/m-sys-user-update',
    method: 'post',
    data
  })
}

// 系统用户删除
export function deleteUser(params = {}) {
  return request({
    url: '/api/m-sys-user-delete',
    method: 'post',
    data: params
  })
}

/** 字典功能 */
// 字典查询
export function dicTreeList(params = {}) {
  return request({
    url: '/api/m-sys-dict-tree-query',
    method: 'get',
    params
  })
}

// 系统字典组信息添加
export function insertDictGroup(data = {}) {
  return request({
    url: '/api/m-sys-dict-group-insert',
    method: 'post',
    data
  })
}

// 系统字典组信息修改
export function updateDictGroup(data = {}) {
  return request({
    url: '/api/m-sys-dict-group-update',
    method: 'post',
    data
  })
}

// 系统字典组信息删除
export function deleteDictGroup(data = {}) {
  return request({
    url: '/api/m-sys-dict-group-delete',
    method: 'post',
    data
  })
}


// 系统字典信息添加
export function insertDict(data = {}) {
  return request({
    url: '/api/m-sys-dict-insert',
    method: 'post',
    data
  })
}

// 系统字典信息修改
export function updateDict(data = {}) {
  return request({
    url: '/api/m-sys-dict-update',
    method: 'post',
    data
  })
}

// 系统字典信息删除
export function deleteDict(data = {}) {
  return request({
    url: '/api/m-sys-dict-delete',
    method: 'post',
    data
  })
}

// config参数分页查询
export function configList(params = {}) {
  return request({
    url: '/api/c-config-param-query-for-list',
    method: 'get',
    params
  })
}

// config参数更新
export function updateConfig(data = {}) {
  return request({
    url: '/api/c-config-param-update',
    method: 'post',
    data
  })
}

// 同步配置参数缓存
export function synchronizeConfig(data = {}) {
  return request({
    url: '/api/c-config-param-clear-cache',
    method: 'post',
    data
  })
}

// 系统参数模块
// 系统参数分页查询
export function sysParamsList(params = {}) {
  return request({
    url: '/api/c-sys-param-query-for-list',
    method: 'get',
    params
  })
}


// 系统参数添加
export function insertSysParams(data = {}) {
  return request({
    url: '/api/c-sys-param-insert',
    method: 'post',
    data
  })
}

// 系统参数编辑
export function updateSysParams(data = {}) {
  return request({
    url: '/api/c-sys-param-detail-update',
    method: 'post',
    data
  })
}

// 系统参数删除
export function deleteSysParams(data = {}) {
  return request({
    url: '/api/c-sys-param-delete',
    method: 'post',
    data
  })
}

// 同步系统参数缓存
export function synchronizeSysParams(data = {}) {
  return request({
    url: '/api/c-sys-param-clear-cache',
    method: 'post',
    data
  })
}

// 菜单功能增删改查接口
export const menuAllList = () => request({
  url: '/api/m-sys-menu-select-all',
  method: 'get'
})

export const insertMenu = (param: object) => request({
  url: '/api/m-sys-menu-add',
  method: 'post',
  data: param
})

export const updateMenu = (param: object) => request({
  url: '/api/m-sys-menu-edit',
  method: 'post',
  data: param
})

export const deleteMenu = (data = {}) => request({
  url: '/api/m-sys-menu-del',
  method: 'post',
  data
})

// 亿仟系统模块-上传错误日志
export const insertErrorLog = (param: object) => request({
  url: '/api/m-sys-error-log-insert',
  method: 'post',
  data: param
})

/** 订单列表 */
export const sysOrderList = (params: object) => request({
  url: '/api/m-sys-pay-order-list',
  method: 'get',
  params
})