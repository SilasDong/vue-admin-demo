import logsStorage from '@/data/logs'
import { dateFormat } from '@/filters/'
import { sendLogs } from '@/api/page/logs'
import { uuid } from '@/utils'
const logs = {
    state: {
        logsList: logsStorage.logsList
    },
    actions: {
        // 发送错误日志
        SendLogs({ state, commit }: any) {
            return new Promise((resolve, reject) => {
                sendLogs(state.logsList).then(() => {
                    commit('CLEAR_LOGS')
                    resolve()
                }).catch((error: any) => {
                    reject(error)
                })
            })
        }
    },
    mutations: {
        ADD_LOGS: (state: any, { type, message, stack, info }: any) => {
            const id = uuid()
            const indexs: number[] = []
            for ( let i = 0; i < state.logsList.length; i++) {
                if (message === state.logsList[i].message && window.location.href === state.logsList[i].url) {
                    indexs.push(i)
                }
            }
            for (const listIndex of indexs) {
                state.logsList.splice(listIndex, 1)
            }
            if (state.logsList.length > 49) {
                state.logsList.length = 49
            }
            state.logsList.push(Object.assign({
                id,
                url: window.location.href,
                time: dateFormat(new Date())
            }, {
                    type,
                    message,
                    stack,
                    info: info.toString()
                }))
            logsStorage.logsList = state.logsList
        },
        CLEAR_LOGS: (state: any) => {
            state.logsList = []
            logsStorage.logsList = state.logsList
        }
    }

}

export default logs
