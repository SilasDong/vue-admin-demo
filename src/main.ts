import Vue from 'vue'
import App from './App.vue'
import axios from '@/http/axios'
import router from '@/router/'
import store from '@/store/'
import '@/styles/common.scss'
import * as filters from '@/filters/'
import '@/error'
import '@/api'
import '@/utils/export'
import '@/router/interceptor' // 导入路由拦截器
import basicContainer from '@/components/basic-container/index.vue'
import silasTree from '@/components/salis-tree/index.vue'
import silasDialog from '@/components/silas-dialog/index.vue'


// 注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('silasTree', silasTree)
Vue.component('silasDialog', silasDialog)


Vue.prototype.$http = axios
const win: any = window
// import Avue from '@smallwei/avue'
// import '@smallwei/avue/lib/index.css'
Vue.use(win.AVUE)

import * as Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element, {
  size: 'small'
})

// 加载过滤器
Object.keys(filters).forEach((key: any) => {
  Vue.filter(key, (filters as any)[key])
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
