import { setStore, getStore } from '@/data'
const IsLock = 'SET-isLock'
const ShowTag = 'SET-showTag'
const ShowDebug = 'SET-showDebug'
const ShowCollapse = 'SET-showCollapse'
const ShowSearch = 'SET-showSearch'
const ShowLock = 'SET-showLock'
const ShowFullScren = 'SET-showFullScren'
const ShowTheme = 'SET-showTheme'
const ShowColor = 'SET-showColor'
const ShowMenu = 'SET-showMenu'
const Theme = 'SET-theme'
const ThemeName = 'SET-themeName'
const LockPasswd = 'SET-lockPasswd'


class Common {
    set isLock(content: any) {
        setStore({ name: IsLock, content, isSession: true })
    }

    get isLock() {
        return getStore({ name: IsLock })
    }
    set showTag(content: any) {
        setStore({ name: ShowTag, content })
    }

    get showTag() {
        return getStore({ name: ShowTag})
    }
    set showDebug(content: any) {
        setStore({ name: ShowDebug, content })
    }

    get showDebug() {
        return getStore({ name: ShowDebug})
    }
    set showCollapse(content: any) {
        setStore({ name: ShowCollapse, content })
    }

    get showCollapse() {
        return getStore({ name: ShowCollapse})
    }
    set showSearch(content: any) {
        setStore({ name: ShowSearch, content })
    }

    get showSearch() {
        return getStore({ name: ShowSearch})
    }
    set showLock(content: any) {
        setStore({ name: ShowLock, content })
    }

    get showLock() {
        return getStore({ name: ShowLock})
    }
    set showFullScren(content: any) {
        setStore({ name: ShowFullScren, content })
    }

    get showFullScren() {
        return getStore({ name: ShowFullScren})
    }
    set showTheme(content: any) {
        setStore({ name: ShowTheme, content })
    }

    get showTheme() {
        return getStore({ name: ShowTheme})
    }
    set showColor(content: any) {
        setStore({ name: ShowColor, content })
    }

    get showColor() {
        return getStore({ name: ShowColor})
    }
    set showMenu(content: any) {
        setStore({ name: ShowMenu, content })
    }

    get showMenu() {
        return getStore({ name: ShowMenu})
    }
    set theme(content: any) {
        setStore({ name: Theme, content })
    }

    get theme() {
        return getStore({ name: Theme})
    }
    set themeName(content: any) {
        setStore({ name: ThemeName, content })
    }

    get themeName() {
        return getStore({ name: ThemeName})
    }
    set lockPasswd(content: any) {
        setStore({ name: LockPasswd, content })
    }

    get lockPasswd() {
        return getStore({ name: LockPasswd})
    }
}

const comm = new Common()
export default comm
