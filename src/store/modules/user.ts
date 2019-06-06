import userStorage from '@/data/user'
import { deepClone } from '@/utils'
import { isURL } from '@/utils/validate'
import webiste from '@/data/website'
import { DIC } from '@/const/dic'
import { loginByUsername } from '@/api/page/user'
import { getUserInfo } from '@/api/page/admin'
import { queryParam } from '@/api/comm'
import { IconList } from '@/api/page/func'
import { loadIcon } from '@/utils/iconfont'
const user = {
    state: {
        token: userStorage.token,
        userInfo: {},
        permission: {},
        roles: [],
        menu: userStorage.menu,
        firstTopMenu: userStorage.firstTopMenu,
        topMenu: [],
        hasResponse: userStorage.hasResponse || 0,
        iconfontKey: userStorage.iconfontKey || ''
    },
    actions: {
        setToken({ commit }: any, token: any) {
            commit('SET_TOKEN', token)
        },
        // 根据用户名登录
        LoginByUsername({ commit }: any, userInfo: object) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo).then((res: any) => {
                    const data = res.data
                    commit('SET_TOKEN', data['x-token'])
                    commit('DEL_ALL_TAG')
                    commit('CLEAR_LOCK')
                    resolve(res)
                }).catch((res: any) => {
                    reject(res)
                })
            })
        },
        GetUserInfo({ commit, state }: any) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(({ userResp, menuResp}) => {
                    // 用户信息
                    commit('SET_USERIFNO', userResp.user[0])
                    // 角色信息
                    commit('SET_ROLES', userResp.role[0].roleId)
                    // 权限信息
                    commit('SET_PERMISSION', userResp.permissions)
                    // 顶部菜单信息
                    commit('SET_TOP_MENU', userResp.topMenu)
                    if (userResp.topMenu && !state.firstTopMenu) {
                        commit('SET_FIRST_TOP_MENU', userResp.topMenu[0].id)
                    }
                    // 左侧菜单数据
                    if (menuResp) {
                        const menu = deepClone(menuResp)
                        menu.forEach((ele: any) => {
                            addPath(ele, true)
                        })
                        commit('SET_MENU', menu)
                    }
                    resolve(userResp.user[0])
                }).catch((err: any) => {
                    reject(err)
                })
            })
        },
        // 获取图标库
        GetIcons({ commit, state }: any) {
            return new Promise((resolve, reject) => {
                IconList().then((res: any) => {
                    const data = res.data
                    const icons: any = DIC.ICONTYPE
                    icons.forEach((it: any) => {
                        const icon: any = []
                        data.filter((it1: any) => {
                            return it1.type === it.value
                        }).forEach((it2: any) => {
                            icon.push(it2.icon)
                        })
                        it.list = icon
                    })
                    resolve(icons)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        },
        // 注销session
        FedLogOut({ commit }: any) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('SET_FIRST_TOP_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG')
                commit('CLEAR_LOCK')
                commit('SET_FIRST_TOP_MENU', '')
                location.reload()
                resolve()
            })
        },
        // 初始化系统参数
        InitSysParam({ commit, state }: any) {
            return new Promise((resolve) => {
                if (state.iconfontKey && state.iconfontKey.length > 0) {
                    return
                }
                queryParam('iconfontKey,uiSize,uiStripe,uiBorder,uiLogo,loginDesc').then((res: any) => {
                    const data: any = res.data
                    const iconfontKey: string = data.iconfontKey || ''
                    iconfontKey.split(',').forEach((it: any) => {
                        loadIcon(it)
                    })
                    commit('SET_ICONFONT_KEY', iconfontKey)
                    commit('SET_SIZE', data.uiSize || '')
                    commit('SET_BORDER', data.uiBorder || '')
                    commit('SET_STRIPE', data.uiStripe || '')
                    commit('SET_LOGO', data.uiLogo || '')
                    commit('SET_LOGO_DESC', data.loginDesc || '')
                    resolve(data)
                })
            })
        },
        // 设置顶部菜单位置
        SetFirstTopMenu({ commit }: any, topId: string) {
            commit('SET_FIRST_TOP_MENU', topId)
        }
    },
    mutations: {
        SET_TOKEN: (state: any, token: string) => {
            userStorage.token = token
            state.token = token
        },
        SET_USERIFNO: (state: any, userInfo: any) => {
            state.userInfo = userInfo
        },
        SET_MENU: (state: any, menu: any) => {
            state.menu = menu
            userStorage.menu = state.menu
        },
        SET_ROLES: (state: any, roles: any) => {
            state.roles = roles
        },
        SET_PERMISSION: (state: any, permission: any) => {
            state.permission = permission || []
        },
        SET_FIRST_TOP_MENU: (state: any, firstTopMenu: any) => {
            userStorage.firstTopMenu = firstTopMenu
            state.firstTopMenu = firstTopMenu
        },
        SET_TOP_MENU: (state: any, topMenu: any[]) => {
            state.topMenu = topMenu
        },
        SET_ICONFONT_KEY: (state: any, iconfontKey: string) => {
            state.iconfontKey = iconfontKey
        },
        SET_RESPONSE: (state: any, hasResponse: any) => {
            state.hasResponse = hasResponse
            userStorage.hasResponse = hasResponse
        }
    }
}
export default user


function addPath(ele: any, first: any) {
    const propsConfig = webiste.menu.props
    const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || '_children'
    }
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
    if (!isChild && first) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
        return
    }
    (ele[propsDefault.children] || []).forEach((child: any) => {
        if (!isURL(child[propsDefault.path])) {
            child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path]
                ? child[propsDefault.path] : 'index'}`
        }
        addPath(child, false)
    })
}
