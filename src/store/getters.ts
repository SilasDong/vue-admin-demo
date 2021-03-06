const getters = {
    tag: (state: any) => state.navs.tag,
    tagList: (state: any) => state.navs.tagList,
    tagWel: (state: any) => state.navs.tagWel,
    website: (state: any) => state.common.website,
    theme: (state: any) => state.common.theme,
    themeName: (state: any) => state.common.themeName,
    isShade: (state: any) => state.common.isShade,
    isCollapse: (state: any) => state.common.isCollapse,
    showTag: (state: any) => state.common.showTag,
    showDebug: (state: any) => state.common.showDebug,
    showLock: (state: any) => state.common.showLock,
    showColor: (state: any) => state.common.showColor,
    showFullScren: (state: any) => state.common.showFullScren,
    showCollapse: (state: any) => state.common.showCollapse,
    showSearch: (state: any) => state.common.showSearch,
    showMenu: (state: any) => state.common.showMenu,
    showTheme: (state: any) => state.common.showTheme,
    keyCollapse: (state: any, get: any) => get.screen > 1 ? get.isCollapse : false,
    screen: (state: any) => state.common.screen,
    isLock: (state: any) => state.common.isLock,
    isFullScren: (state: any) => state.common.isFullScren,
    lockPasswd: (state: any) => state.common.lockPasswd,
    roles: (state: any) => state.user.roles,
    permission: (state: any) => state.user.permission || [],
    menu: (state: any) => state.user.menu,
    topMenu: (state: any) => state.user.topMenu,
    firstTopMenu: (state: any) => state.user.firstTopMenu,
    userInfo: (state: any) => state.user.userInfo,
    token: (state: any) => state.user.token,
    hasResponse: (state: any) => state.user.hasResponse,
    logsList: (state: any) => state.logs.logsList,
    logsLen: (state: any) => state.logs.logsList.length || 0,
    logsFlag: (state: any, get: any) => get.logsLen === 0,
    size: (state: any) => state.ui.size || 'small',
    border: (state: any) => state.ui.border === 'true',
    stripe: (state: any) => state.ui.stripe === 'true',
    logo: (state: any) => state.ui.logo,
    logoDesc: (state: any) => state.ui.logoDesc,
    clientWidth: (state: any) => state.ui.clientWidth
}
export default getters
