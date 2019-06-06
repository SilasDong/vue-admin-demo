import Layout from '@/page/index/index.vue'
export default [{
    path: '/login',
    name: '登录页',
    component: () =>
        import(/* webpackChunkName: "page" */ '@/page/login/index.vue'),
    meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
    }
    },
    {
        path: '/lock',
        name: '锁屏页',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/page/lock/index.vue'),
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
    {
        path: '/403',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/components/error-page/403.vue'),
        name: '403',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
    {
        path: '/500',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/components/error-page/500.vue'),
        name: '500',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
    {
        path: '/',
        name: '主页',
        redirect: '/wel'
    },
    {
        path: '/myiframe',
        component: Layout,
        redirect: '/myiframe',
        children: [{
            path: ':routerPath',
            name: 'iframe',
            component: () =>
                import( /* webpackChunkName: "page" */ '@/components/iframe/main.vue'),
            props: true
        }]
}]

export const component404 = [{
    path: '*',
    component: () =>
        import( /* webpackChunkName: "views" */ '@/components/error-page/404.vue'),
    name: '404',
    meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
    }

}]