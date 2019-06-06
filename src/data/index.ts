import { isEmpty } from '@/utils/validate'
import { Storage } from '@/interface'


// 获取localStorage
export const getStore = (params: any) => {
    const {
        name,
        debug
    } = params
    let obj: any = {}
    let content: any
    obj = window.sessionStorage.getItem(name)
    if (isEmpty(obj)) { obj = window.localStorage.getItem(name) }
    if (isEmpty(obj)) { return }
    obj = JSON.parse(obj)
    if (debug) {
        return obj
    }
    if (obj.dataType === 'string') {
        content = obj.content
    } else if (obj.dataType === 'number') {
        content = Number(obj.content)
    } else if (obj.dataType === 'boolean') {
        content = obj.content
    } else if (obj.dataType === 'object') {
        content = obj.content
    }
    return content
}
export const  setStore = (params: Storage) => {
    const {
        name,
        content,
        isSession
    } = params
    const obj = {
        dataType: typeof (content),
        content,
        isSession,
        datetime: new Date().getTime()
    }
    if (isSession) {
        window.sessionStorage.setItem(name, JSON.stringify(obj))
    } else {
        window.localStorage.setItem(name, JSON.stringify(obj))
    }
}
    // 删除localStorage
export const  removeStore = (name: string) => {
    window.localStorage.removeItem(name)
    window.sessionStorage.removeItem(name)
}

export const  getAllStore = (isSession?: boolean) => {
    const list = []
    for (let i = 1; i <= window.sessionStorage.length; i++) {
        if (isSession) {
            list.push({
                name: window.sessionStorage.key(i),
                content: getStore({
                    name: window.sessionStorage.key(i),
                    isSession
                })
            })
        } else {
            list.push(getStore({
                name: window.localStorage.key(i),
                content: getStore({
                    name: window.localStorage.key(i)
                })
            }))
        }
    }

    return list
}

export const  clearStore = (isSession: boolean) => {
    if (isSession) {
        window.sessionStorage.clear()
        return
    }
    window.localStorage.clear()
}
