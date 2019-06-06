import { setStore, getStore } from '@/data'
import { TagObj } from '@/interface'
const TagKey = 'Tag'
const TagListKey = 'TagList'


class NavsStorage {

    set tag(content: TagObj) {
        setStore({ name: TagKey, content, isSession: true })
    }

    get tag() {
        return getStore({ name: TagKey })
    }

    set tagList(content: any) {
        setStore({ name: TagListKey, content, isSession: true })
    }

    get tagList() {
        return getStore({ name: TagListKey })
    }
}

const navsStorage = new NavsStorage()
export default navsStorage
