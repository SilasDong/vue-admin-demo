import Mock from 'mockjs'
export default ({ mock }: any) => {
    if (!mock) {
      return
    }
    Mock.mock(RegExp('/api/m-sys-menu-select-top'), 'get', (res: any) => {
        return {
            data: [
            {
            id: 'ed070f48059f45b8b3d1e891ac602f25',
            label: '功能',
            path: 'https://gitee.com',
            icon: 'el-icon-menu'
            },
            {
            id: '591c0979524d4e668c106ce343b3ac25',
            label: '系统',
            path: '/core/api',
            icon: 'el-icon-setting'
            }]
        }
    })
    Mock.mock(RegExp('/api/p-index-count'), 'get', (res: any) => {
        return {
            data: { sms: [{ useSmsCount: 9, smsCount: 71 }] }
        }
    })
    Mock.mock(RegExp('/api/m-sys-menu-select-left'), 'get', (res: any) => {
        return {
            data: [
                {
                    id: '83ce7fa6a2c1424aaf12e8d7c1afe681',
                    pids: 'ed070f48059f45b8b3d1e891ac602f25',
                    label: '测试1',
                    path: '/url',
                    icon: 'iconfont iconceshi1',
                    component: '',
                    isShow: 1,
                    _children: [
                        {
                            id: '5c676640a008471c961260f8e04336d2',
                            pid: '83ce7fa6a2c1424aaf12e8d7c1afe681',
                            pids: 'ed070f48059f45b8b3d1e891ac602f25,83ce7fa6a2c1424aaf12e8d7c1afe681',
                            label: '测试',
                            path: 'https://gitee.com',
                            icon: 'iconfont iconceshi',
                            component: '',
                            isShow: 1
                        },
                        {
                            id: 'ce82f78969254541a72cf0c5ed900694',
                            pid: '83ce7fa6a2c1424aaf12e8d7c1afe681',
                            pids: 'ed070f48059f45b8b3d1e891ac602f25,83ce7fa6a2c1424aaf12e8d7c1afe681',
                            label: '测试2',
                            path: 'https://www.baidu.com/',
                            icon: 'iconfont iconshujufuwu-APIceshi',
                            component: '',
                            isShow: 1
                        }]
                },
                {
                    id: 'a54759c32f2d11e9881200163e05c695',
                    pids: '591c0979524d4e668c106ce343b3ac25',
                    label: '核心模块',
                    path: '/core',
                    icon: 'iconfont iconwakuangpeizhi-',
                    component: '',
                    isShow: 1,
                    _children: [
                        {
                            id: '5217d30db10e452f86804170eedc0b4f',
                            pid: 'a54759c32f2d11e9881200163e05c695',
                            pids: '591c0979524d4e668c106ce343b3ac25,a54759c32f2d11e9881200163e05c695',
                            label: 'API日志',
                            path: 'apilog',
                            icon: 'iconfont iconrizhi',
                            component: 'page/core/api/log',
                            isShow: 1
                        },
                        {
                            id: '3e02dcad58e44d2a831d5f96656af387',
                            pid: 'a54759c32f2d11e9881200163e05c695',
                            pids: '591c0979524d4e668c106ce343b3ac25,a54759c32f2d11e9881200163e05c695',
                            label: '定时器日志',
                            path: 'timelog',
                            icon: 'iconfont iconshiliangzhinengduixiang',
                            component: 'page/core/time/log',
                            isShow: 1
                        },
                        {
                            id: '9a7cf41073394cb998c5f837c7cce79e',
                            pid: 'a54759c32f2d11e9881200163e05c695',
                            pids: '591c0979524d4e668c106ce343b3ac25,a54759c32f2d11e9881200163e05c695',
                            label: 'API统计',
                            path: 'statistics',
                            icon: 'iconfont icontongji',
                            component: 'page/core/api/statistics',
                            isShow: 1
                        }]
                },
                {
                    id: 'c54759c32f2d11e9881200163e05c696',
                    pids: '591c0979524d4e668c106ce343b3ac25',
                    label: '系统管理',
                    path: '/sys',
                    icon: 'iconfont iconmokuai-',
                    component: '',
                    isShow: 1,
                    _children: [
                        {
                            id: 'd532103342984eddadc9d0357dc65c20',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '角色管理',
                            path: 'role',
                            icon: 'iconfont iconemoji',
                            component: 'page/sys/role/index',
                            isShow: 1
                        },
                        {
                            id: '1dc133602433419ab948d6aa3ecb3671',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '用户管理',
                            path: 'user',
                            icon: 'iconfont iconxueshengguanli',
                            component: 'page/sys/user/index',
                            isShow: 1
                        },
                        {
                            id: 'f1224d82bab74416a389101b7c6b693f',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '字典管理',
                            path: 'dic',
                            icon: 'iconfont iconxuexiku',
                            component: 'page/sys/dic/index',
                            isShow: 1
                        },
                        {
                            id: '15310a3a0a4142578a7be562f3cf619d',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '配置参数',
                            path: 'config',
                            icon: 'iconfont iconpeanut',
                            component: 'page/sys/config/index',
                            isShow: 1
                        },
                        {
                            id: '35a28c590a764bf2b6bff9a4ed436696',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '系统参数',
                            path: 'param',
                            icon: 'iconfont iconjichushezhi',
                            component: 'page/sys/param/index',
                            isShow: 1
                        }]
                },
                {
                    id: '19ba338f60004a2b8c8403e89a7152f6',
                    pids: '591c0979524d4e668c106ce343b3ac25',
                    label: '系统功能',
                    path: '/func',
                    icon: 'iconfont iconbangding',
                    component: '',
                    isShow: 1,
                    _children: [
                        {
                            id: '02656f481506475f80b0c64b8dd83a65',
                            pid: '19ba338f60004a2b8c8403e89a7152f6',
                            pids: '591c0979524d4e668c106ce343b3ac25,19ba338f60004a2b8c8403e89a7152f6',
                            label: '短信模板',
                            path: 'sms',
                            icon: 'iconfont iconduanxin-cehua-xinxixiangqing',
                            component: 'page/func/sms/index',
                            isShow: 1
                        }]
                }]
        }
    })
}