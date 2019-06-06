import cookies from 'js-cookie'
import { setStore, getStore } from '@/data'
const TokenKey = 'USER-Admin-Token'
const Menu = 'USER-Menu'
const FirstTopMenu = 'USER-FirstTopMenu'
const IconfontKey = 'USER-iconfontKey'
const HasResponse = 'USER-HasResponse'
const JumpRouter = 'USER-JumpRouter'

class UserStorage {
    set token(content) {
        cookies.set(TokenKey, content)
    }
    get token() {
        return cookies.get(TokenKey) || ''
    }

    set menu(content: any) {
        setStore({name: Menu, content, isSession: true})
    }

    get menu() {
        return getStore({ name: Menu }) || []
    }

    set firstTopMenu(content: any) {
        setStore({ name: FirstTopMenu, content, isSession: true})
    }

    get firstTopMenu() {
        return getStore({ name: FirstTopMenu })
    }
    set iconfontKey(content: any) {
        setStore({ name: IconfontKey, content })
    }

    get iconfontKey() {
        return getStore({ name: IconfontKey })
    }

    set hasResponse(content: any) {
        setStore({ name: HasResponse, content, isSession: true })
    }
    get hasResponse() {
        return getStore({ name: HasResponse })
    }
}

const userStorage = new UserStorage()
export default userStorage
