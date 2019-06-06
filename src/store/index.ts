import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    getters
})

const storeContext = require.context('@/store/modules', true, /\.ts$/)

storeContext.keys().forEach((modules) => {
    store.registerModule(modules.replace(/(^\.\/)|(\.ts$)/g, ''), storeContext(modules).default)
})

Vue.prototype.$store = store
export default store
