import { loadStyle } from './index'
const iconfontVersion = ['567566_qo5lxgtishg']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`
// 动态加载阿里云字体库
iconfontVersion.forEach((ele: string) => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

export function loadIcon(key: string) {
  if (key) {
    loadStyle(iconfontUrl.replace('$key', key))
  }
}
