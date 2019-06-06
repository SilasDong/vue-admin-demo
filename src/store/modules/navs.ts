import navsStorage from '@/data/nvas'
import {TagObj} from '@/interface'
import { diff } from '@/utils'
import website from '@/data/website'
const isFirstPage = website.isFirstPage
const tagWel = website.fistPage
const tagObj: TagObj = {
    label: '', // 标题名称
    value: '', // 标题的路径
    params: '', // 标题的路径参数
    query: '', // 标题的参数
    group: [] // 分组
}
// 处理首个标签
function setFistTag(list: any) {
    if (list.length === 1) {
        list[0].close = false
    } else {
        list.forEach((ele: any) => {
            if (ele.value === tagWel.value && isFirstPage === false) {
                ele.close = false
            } else {
                ele.close = true
            }
        })
    }
}

const navs = {
    state: {
        tagList: navsStorage.tagList || [],
        tag: navsStorage.tag || tagObj,
        tagWel
    },
    actions: {

    },
    mutations: {
        ADD_TAG: (state: any, action: any) => {
            state.tag = action
            navsStorage.tag = state.tag
            if (state.tagList.some((ele: any) => diff(ele, action))) { return }
            state.tagList.push(action)
            setFistTag(state.tagList)
            navsStorage.tagList = state.tagList
        },
        DEL_TAG: (state: any, action: any) => {
            state.tagList = state.tagList.filter((item: any) => {
                return !diff(item, action)
            })
            setFistTag(state.tagList)
            navsStorage.tagList = state.tagList
        },
        DEL_ALL_TAG: (state: any) => {
            state.tagList = [state.tagWel]
            navsStorage.tagList = state.tagList
        },
        DEL_TAG_OTHER: (state: any) => {
            state.tagList = state.tagList.filter((item: any) => item.value === state.tag.value)
            setFistTag(state.tagList)
            navsStorage.tagList = state.tagList
        }
    }
}
export default navs
