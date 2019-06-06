import Vue from 'vue'
import Api from './api'
const apiContext = require.context('@/api', true, /\.ts$/)

const api: Api = new Api()
apiContext.keys().forEach((modules) => {
    const obj = apiContext(modules)
    if (obj && !modules.includes('index') && !modules.includes('api')) {
        let name = modules.replace(/(\.\/|\.ts)/g, '').toString()
        if (name.includes('/')) {
            name = name.split('/')[1]
        }
        if (!Object.keys(name)) {
            (api as any)[name] = obj
        }
    }
})


Vue.prototype.$api = api

export default api
