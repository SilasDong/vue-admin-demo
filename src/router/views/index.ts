import Layout from '@/page/index/index.vue'
export default [{
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
        path: 'index',
        name: '首页',
        component: () =>
            import(/* webpackChunkName: "views" */ '@/page/wel.vue')
    }]
}, {
    path: '/info',
    component: Layout,
    redirect: '/wel/index',
    children: [{
        path: 'index',
        name: '个人信息',
        component: () =>
            import( /* webpackChunkName: "views" */ '@/page/comm/info/index.vue')
    }]
}, {
    path: '/smsHistory',
    component: Layout,
    redirect: '/wel/index',
    children: [{
        path: 'index',
        name: '短信记录',
        component: () =>
            import( /* webpackChunkName: "views" */ '@/page/comm/sms/index.vue')
    }]
}]
