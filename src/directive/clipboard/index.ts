import Clipboard from './clipboard'

const install = (Vue: any) => {
  Vue.directive('Clipboard', Clipboard)
}
const win: any = window
if (win.Vue) {
  win.clipboard = Clipboard
  win.Vue.use(install)
}

(Clipboard as any).install = install
export default Clipboard