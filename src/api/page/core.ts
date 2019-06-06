import request from '@/http/axios'

/** api表操作  c_api_base */
export const queryApiList = (params: object) => request({
  url: '/api/xcd-core-apiBase-query-for-list',
  method: 'get',
  params
})

// 更新单个参数
export const updataApiOneParams = (data: object) => request({
  url: '/api/xcd-core-apiBase-update-one-params',
  method: 'post',
  data
})

// 新增
export const insertApi = (data: object) => request({
  url: '/api/xcd-core-apiBase-add',
  method: 'post',
  data
})

// 更新
export const updateApi = (data: object) => request({
  url: '/api/xcd-core-apiBase-update',
  method: 'post',
  data
})

// 删除
export const deleteApi = (data: object) => request({
  url: '/api/xcd-core-apiBase-delete',
  method: 'post',
  data
})

// 同步api
export const synchronizeApi = () => request({
  url: '/api/xcd-core-apiBase-api-clear',
  method: 'get'
})

/** api日志表操作  m_sys_operation_log */
// api日志列表查询
export const apiLogList = (params: object) => request({
  url: '/api/m-sys-operation-log-query-for-list',
  method: 'get',
  params
})

// 清空api日志列表
export const apiLogDelete = () => request({
  url: '/api/m-sys-operation-log-deleteList',
  method: 'get'
})

/** 定时器操作 */
// 定时器分页查询
export function timesList(params = {}) {
  return request({
    url: '/api/m-scheduler-task-select-for-page',
    method: 'get',
    params
  })
}
// 定时器新增
export function insertTimes(data = {}) {
  return request({
    url: '/api/m-scheduler-task-insert',
    method: 'post',
    data
  })
}

// 定时器更新
export function updateTimes(data = {}) {
  return request({
    url: '/api/m-scheduler-task-update',
    method: 'post',
    data
  })
}
// 定时器删除
export function deleteTimes(data = {}) {
  return request({
    url: '/api/m-scheduler-task-delete',
    method: 'post',
    data
  })
}

// 定时器运行
export function runTimes(data = {}) {
  return request({
    url: '/api/m-scheduler-start-scheduler',
    method: 'post',
    data
  })
}

// 定时器启用
export function openTimes(data = {}) {
  return request({
    url: '/api/m-scheduler-task-open',
    method: 'post',
    data
  })
}

// 定时器停用
export function closeTimes(data = {}) {
  return request({
    url: '/api/m-scheduler-task-close',
    method: 'post',
    data
  })
}

// 定时器日志查询
export function timeLogList(params = {}) {
  return request({
    url: '/api/m-scheduler-task-run-record-query-for-list',
    method: 'get',
    params
  })
}

// 清空定时器日志
export function deleteTimeLogList(params = {}) {
  return request({
    url: '/api/m-scheduler-task-run-record-deleteList',
    method: 'get',
    params
  })
}


// api操作统计 m_sys_operation_statistics
export function operationStatisticsList(params = {}) {
  return request({
    url: '/api/m-sys-operation-statistics-query-for-list',
    method: 'get',
    params
  })
}

// 清空api统计日志列表
export const apiStatisticsDelete = () => request({
  url: '/api/m-sys-statistics-log-deleteList',
  method: 'get'
})