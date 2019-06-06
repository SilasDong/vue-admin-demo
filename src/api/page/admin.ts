/**
 * 所有后台角色都需要授权的接口，设置api表接口 isSystem = 1
 */
import request from '@/http/axios'
import store from '@/store'
// 密码修改
export function updatePwd(data = {}) {
    return request({
        url: '/api/xcd-module-sys-user-chg-pwd',
        method: 'post',
        data
    })
}

/**
 * 用户信息修改
 * @param data
 */
export function updateUserInfo(data = {}) {
    return request({
        url: '/api/m-sys-user-info-update',
        method: 'post',
        data
    })
}
/**
 * 短信历史记录
 * @param data
 */
export function smsHistoryList(params = {}) {
    return request({
        url: '/api/m-sms-history-query-for-list',
        method: 'get',
        params
    })
}

// 获取用户信息
export function getUserInfo() {
    return new Promise((resolve, reject) => {
        const requests = [request.get('/api/s-user-roles-query')]
        if (!store.getters.menu || store.getters.menu.length === 0) {
            requests.push(request.get('/api/m-sys-menu-select-left'))
        }
        request.all(requests).then(request.spread((userResp: any, menuResp: any) => {
            resolve({ userResp: userResp.data, menuResp: menuResp && menuResp.data})
        })).catch((err: any) => {
            reject(err)
        })
    })
}

/* 首页统计*/
export function indexCount(params = {}) {
    return request({
        url: '/api/p-index-count',
        method: 'get',
        data: params
    })
}
