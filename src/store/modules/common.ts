import website from '@/data/website'
import comm from '@/data/common'

const common = {
    state: {
        isCollapse: false,
        isFullScren: false,
        isShade: false,
        screen: -1,
        isLock: comm.isLock || false,
        showTag: comm.showTag,
        showDebug: comm.showDebug || false,
        showCollapse: comm.showCollapse,
        showSearch: comm.showSearch,
        showLock: comm.showLock || false,
        showFullScren: comm.showFullScren || false,
        showTheme: comm.showTheme || false,
        showColor: comm.showColor || true,
        showMenu: comm.showMenu,
        theme: comm.theme || '#698CB0',
        themeName: comm.themeName || '',
        lockPasswd: comm.lockPasswd || '',
        website
    },
    actions: {
    },
    mutations: {
        SET_SHADE: (state: any, active: any) => {
            state.isShade = active
        },
        SET_COLLAPSE: (state: any) => {
            state.isCollapse = !state.isCollapse
        },
        SET_FULLSCREN: (state: any) => {
            state.isFullScren = !state.isFullScren
        },
        SET_SHOWCOLLAPSE: (state: any, active: any) => {
            state.showCollapse = active
            comm.showCollapse = state.showCollapse
        },
        SET_SHOWTAG: (state: any, active: any) => {
            state.showTag = active
            comm.showTag = state.showTag
        },
        SET_SHOWMENU: (state: any, active: any) => {
            state.showMenu = active
            comm.showMenu = state.showMenu
        },
        SET_SHOWLOCK: (state: any, active: any) => {
            state.showLock = active
            comm.showLock = state.showLock
        },
        SET_SHOWSEARCH: (state: any, active: any) => {
            state.showSearch = active
            comm.showSearch = state.showSearch
        },
        SET_SHOWFULLSCREN: (state: any, active: any) => {
            state.showFullScren = active
            comm.showFullScren = state.showFullScren
        },
        SET_SHOWDEBUG: (state: any, active: any) => {
            state.showDebug = active
            comm.showDebug = state.showDebug
        },
        SET_SHOWTHEME: (state: any, active: any) => {
            state.showTheme = active
            comm.showTheme = state.showTheme
        },
        SET_SHOWCOLOR: (state: any, active: any) => {
            state.showColor = active
            comm.showColor = state.showColor
        },
        SET_LOCK: (state: any) => {
            state.isLock = true
            comm.isLock = state.isLock
        },
        SET_SCREEN: (state: any, screen: any) => {
            state.screen = screen
        },
        SET_THEME: (state: any, color: string) => {
            state.theme = color
            comm.theme = state.theme
        },
        SET_THEME_NAME: (state: any, themeName: string) => {
            state.themeName = themeName
            comm.themeName = state.themeName
        },
        SET_LOCK_PASSWD: (state: any, lockPasswd: any) => {
            state.lockPasswd = lockPasswd
            comm.lockPasswd = state.lockPasswd
        },
        CLEAR_LOCK: (state: any) => {
            state.isLock = false
            state.lockPasswd = ''
            comm.isLock = false
            comm.lockPasswd = ''
        }
    }
}
export default common
