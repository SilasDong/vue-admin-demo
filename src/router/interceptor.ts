/**
 * 全站权限配置
 *
 */
import router, { add404 } from '@/router/'
import store from '@/store'
import { isEmpty } from '@/utils/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { timeout } from '@/utils'
import Router from '@/router/'
NProgress.configure({ showSpinner: false })
const lockPage = store.getters.website.lockPage // 锁屏页
let paramsRequestCount = 0
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.topId && store.getters.firstTopMenu !== to.meta.topId) {
        store.dispatch('SetFirstTopMenu', to.meta.topId) // 修改顶部菜单选中状态
    }
    timeout(() => { })
    if (paramsRequestCount === 0) {
        store.dispatch('InitSysParam').then(() => {
            paramsRequestCount = 0
        })
        paramsRequestCount = 1
    }
    // 缓冲设置
    if (to.meta.keepAlive === true && store.getters.tagList.some((ele: any) => {
        return ele.value === to.fullPath
    })) {
        to.meta.$keepAlive = true
    } else {
        NProgress.start()
        if (to.meta.keepAlive === true && isEmpty(to.meta.$keepAlive)) {
            to.meta.$keepAlive = true
        } else {
            to.meta.$keepAlive = false
        }
    }
    const meta = to.meta || {}
    if (store.getters.token) {
        if (store.getters.isLock && to.path !== lockPage) { // 如果系统激活锁屏，全部跳转到锁屏页
            next({ path: lockPage })
        } else if (to.path === '/login') { // 如果登录成功访问登录页跳转到主页
            next({ path: '/' })
        } else {
            // 如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
            if (store.getters.roles.length === 0) {
                store.dispatch('GetUserInfo').then(() => {
                    Router.formatRoutes(store.getters.menu, true)
                    add404()
                    next({ ...to, replace: true })
                }).catch(() => {
                    store.dispatch('FedLogOut')
                })
            } else {
                const value = to.query.src || to.fullPath
                const label = to.query.name || to.name
                if (meta.isTab !== false && !isEmpty(value) && !isEmpty(label)) {
                    store.commit('ADD_TAG', {
                        label,
                        value,
                        params: to.params,
                        query: to.query,
                        group: router.group || []
                    })
                }
                next()
            }
        }
    } else {
        //  判断是否需要认证，没有登录访问去登录页
        if (meta.isAuth === false) {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach((to: any, from: any) => {
    try {
        NProgress.done()
    } catch (err) {
        console.log(err.message)
    }
    let title = store.getters.tag.label
    if (to.meta.isTab === false) {
        title = to.name
    }
    // 根据当前的标签也获取label的值动态设置浏览器标题
    router.setTitle(title)
})
