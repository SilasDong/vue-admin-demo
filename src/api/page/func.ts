import request from '@/http/axios'
// 短信模板分页查询 m_sms_template
export function smsTemplateList(params = {}) {
  return request({
    url: '/api/m-sms-template-query-for-list',
    method: 'get',
    params
  })
}

// 短信模板修改 m_sms_template
export function updateSmsTemplate(data = {}) {
  return request({
    url: '/api/m-sms-template-update',
    method: 'post',
    data
  })
}

// 短信数量查询
export function smsRechargeList(data = {}) {
  return request({
    url: '/api/m-sms-recharge-query-for-list',
    method: 'post',
    data
  })
}
// 短信数量更新
export function smsRechargeUpage(data = {}) {
  return request({
    url: '/api/m-sms-recharge-update',
    method: 'post',
    data
  })
}

/* 数据库备份分页查询*/
export function backUpList(params = {}) {
  return request({
    url: '/api/m-mysql-backUp-query-for-list',
    method: 'get',
    params
  })
}

/**
 * 数据库备份
 */
export function backUp() {
  return request({
    url: '/api/m-mysql-backUp',
    method: 'post'
  })
}

// 微信分享查询
export function wechatList(params = {}) {
  return request({
    url: '/api/m-wechat-share-query-for-list',
    method: 'get',
    data: params
  })
}
// 微信分享更新
export function updateWechat(data = {}) {
  return request({
    url: '/api/m-wechat-share-update',
    method: 'post',
    data
  })
}
// 微信分享新增
export function inertWechat(data = {}) {
  return request({
    url: '/api/m-wechat-share-inert',
    method: 'post',
    data
  })
}
// 微信分享删除
export function deleteWechat(data = {}) {
  return request({
    url: '/api/m-wechat-share-del',
    method: 'post',
    data
  })
}

// 错误码分页查询
export function errorList(params = {}) {
  return request({
    url: '/api/c-error-msg-query-list',
    method: 'get',
    params
  })
}
// 错误码新增
export function insertError(data = {}) {
  return request({
    url: '/api/c-error-msg-insert',
    method: 'post',
    data
  })
}
// 错误码更新
export function updateError(data = {}) {
  return request({
    url: '/api/c-error-msg-update',
    method: 'post',
    data
  })
}
// 错误码删除
export function deleteError(data = {}) {
  return request({
    url: '/api/c-error-msg-delete',
    method: 'post',
    data
  })
}

// 错误码分页查询
export function IconPageList(params = {}) {
  return request({
    url: '/api/m-sys-icon-query-for-list',
    method: 'get',
    params
  })
}
export function IconList(params = {}) {
  return request({
    url: '/api/m-sys-icon-query-list',
    method: 'get',
    params
  })
}
// 错误码新增
export function insertIcon(data = {}) {
  return request({
    url: '/api/m-sys-icon-insert',
    method: 'post',
    data
  })
}
// 错误码更新
export function updateIcon(data = {}) {
  return request({
    url: '/api/m-sys-icon-update',
    method: 'post',
    data
  })
}
// 错误码删除
export function deleteIcon(data = {}) {
  return request({
    url: '/api/m-sys-icon-delete',
    method: 'post',
    data
  })
}