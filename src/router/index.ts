/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */
import Vue from 'vue'
import AvueRouter from './AvueRouter'
import PageRouter from './page/'
import { component404 } from './page/'
import ViewsRouter from './views/'
import Store from '@/store'
Vue.use(AvueRouter)
const Router = new AvueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    },
    routes: []
})

Router.formatRoutes(Store.state.user.menu, true)
Router.addRoutes([...PageRouter, ...ViewsRouter])
export default Router

export function add404() {
    Router.addRoutes([...component404])
}
