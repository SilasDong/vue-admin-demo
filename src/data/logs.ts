import { setStore, getStore } from '@/data'
const TogsList = 'logsList'

class LogsStorage {
    get logsList() {
        return getStore({ name: TogsList}) || []
    }
    set logsList(content) {
        setStore({name: TogsList, content})
    }
}

const logsStorage = new LogsStorage()
export default logsStorage
