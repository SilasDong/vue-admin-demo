import { setStore, getStore } from '@/data'
const Size = 'Ui-Size'
const Border = 'Ui-Border'
const Stripe = 'Ui-Stripe'
const Logo = 'Ui-Logo'
const LogoDesc = 'Ui-LogoDesc'

class UiStorage {
  get size() {
    return getStore({ name: Size })
  }
  set size(content) {
    setStore({ name: Size, content })
  }
  get border() {
    return getStore({ name: Border })
  }
  set border(content) {
    setStore({ name: Border, content })
  }
  get stripe() {
    return getStore({ name: Stripe })
  }
  set stripe(content) {
    setStore({ name: Stripe, content })
  }
  get logo() {
    return getStore({ name: Logo })
  }
  set logo(content) {
    setStore({ name: Logo, content })
  }
  get logoDesc() {
    return getStore({ name: LogoDesc })
  }
  set logoDesc(content) {
    setStore({ name: LogoDesc, content })
  }
}

const uiStorage = new UiStorage()
export default uiStorage
