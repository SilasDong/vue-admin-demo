interface Commit { commit: any }
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import { getObjType } from '@/utils'
// 取消请求
const CancelToken = axios.CancelToken
// 设置默认请求头
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
// 请求超时的时间限制
axios.defaults.timeout = 15000
axios.defaults.baseURL = process.env.VUE_APP_BASE_API

// 处理数据
axios.defaults.transformRequest = [(data: any, headers: any) => {
    if (headers['Content-Type'] && headers['Content-Type'].includes('multipart/form-data')) {
        return data
    }
    data = qs.stringify(data)
    return data
}]

// 在设置全局的请求次数，请求的间隙
const retry = 3
const retryDelay = 1000

// 设置错误请求文字
const errorMessage = '网络请求错误，请检查网络连接在重试'

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
let requestName: any
axios.interceptors.request.use((config: any) => {
    if (store.getters.token) {
        config.headers['x-token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (store.getters.sessionId) {
        config.headers.Cookie = store.getters.sessionId // 设置sessionId
    }
    // url当然请求名称
    requestName = config.url
    // 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
    // 如果没有 requestName 就默认添加一个 不同的时间戳
    if (config.method === 'post') {
        // 清除数据中的前后空格
        if (getObjType(config.data) !== 'string') {
            for (const item in config.data) {
                if (config.data[item] && typeof config.data[item] === 'string' && config.data.hasOwnProperty(item)) {
                    config.data[item] = config.data[item].trim()
                }
            }
        }
    } else {
        // 清除数据中的前后空格
        if (getObjType(config.data) !== 'string') {
            for (const item in config.params) {
                if (config.params[item] && typeof getObjType(config.data) !== 'string'
                && config.params.hasOwnProperty(item)) {
                    config.params[item] = config.params[item].trim()
                }
            }
        }
    }
    // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求，有附件上传可以连续请求，支持饿了么上传组件的多附件上传
    const axiosTmp: any = axios
    if (requestName && !config.headers['Content-Type'].includes('multipart/form-data')) {
        if (axiosTmp[requestName] && axiosTmp[requestName].cancel) {
            axiosTmp[requestName].cancel('取消了请求：' + requestName)
        }
        config.cancelToken = new CancelToken((c: any) => {
            axiosTmp[requestName] = {}
            axiosTmp[requestName].cancel = c
        })
    }
    return config
}, (error: any) => {
    return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use((res: any) => {
    if (store.getters.hasResponse === 0) {
        store.commit('SET_RESPONSE', 1)
    }
    const code = res.data.code
    if (code !== undefined && code !== 9999) {
        let message = res && res.data.message
        if (code === 11003 || code === 11004 || code === 11006 || code === 11001) {
            message = '登录信息过期，请重新登录'
            store.dispatch('FedLogOut')
        }
        if (code === 500 && process.env.NODE_ENV !== 'development') {
            res.message = ''
        }
        if (res.optionMsg && process.env.NODE_ENV === 'development') {
            message += `【optionMsg】${res.optionMsg}`
        }
        message = message || errorMessage
        Message({
            message,
            type: 'error'
        })
        return Promise.reject(new Error(message))
    }
    return res.data
}, (err: any) => {
        const config = err.config
        // If config does not exist or the retry option is not set, reject
        if (!config) { return Promise.reject(err) }

        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0

        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= retry) {
            // Reject with the error
            Message({
                message: (err.message || '').includes('timeout') ? errorMessage : err.message,
                type: 'error'
            })
            return Promise.reject(err)
        }

        // Increase the retry count
        config.__retryCount += 1

        // Create new promise to handle exponential backoff
        const backoff = new Promise((resolve) => {
            setTimeout( () => {
                resolve()
            }, retryDelay || 1)
        })

        // Return the promise in which recalls axios to retry the request
        return backoff.then( () => {
            return axios(config)
        })
})
export default axios
