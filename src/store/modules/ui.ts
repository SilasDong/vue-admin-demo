import uiStorage from '@/data/ui'
const ui = {
  state: {
    size: uiStorage.size,
    border: uiStorage.border,
    stripe: uiStorage.stripe,
    logo: uiStorage.logo,
    logoDesc: uiStorage.logoDesc,
    clientWidth: document.body.clientWidth
  },
  actions: {
  },
  mutations: {
    SET_SIZE: (state: any, size: any) => {
      state.size = size
      uiStorage.size = size
    },
    SET_BORDER: (state: any, border: any) => {
      state.border = border
      uiStorage.border = border
    },
    SET_STRIPE: (state: any, stripe: any) => {
      state.stripe = stripe
      uiStorage.stripe = stripe
    },
    SET_LOGO: (state: any, logo: any) => {
      state.logo = logo
      uiStorage.logo = logo
    },
    SET_LOGO_DESC: (state: any, logoDesc: any) => {
      state.logoDesc = logoDesc
      uiStorage.logoDesc = logoDesc
    },
    SET_CLIENT_WIDTH: (state: any, clientWidth: any) => {
      state.clientWidth = clientWidth
    }
  }

}

export default ui
