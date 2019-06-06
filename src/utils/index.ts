import {isEmpty} from './validate'

export const vaildData = (val: any, dafult: any) => {
  if (typeof val === 'boolean') {
    return val
  }
  return !isEmpty(val) ? val : dafult
}

export const serialize = (data: any) => {
  const list: any = []
  Object.keys(data).forEach((ele: any) => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}

export const getObjType = (obj: any): string => {
  const toString = Object.prototype.toString
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
      return 'element'
  }
  return map[toString.call(obj)]
}

export const loadStyle = (url: any) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

    // 判断路由是否相等
export const diff = (obj1: any, obj2: any): any => {
  delete obj1.close
  const o1: boolean = obj1 instanceof Object
  const o2: boolean = obj2 instanceof Object
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    // 例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    return false
  }

  for (const attr of Object.keys(obj1)) {
    const t1 = obj1[attr] instanceof Object
    const t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}

    // 对象深拷贝
export const deepClone = (data: any) => {
  const type = getObjType(data)
  let obj: any
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (const key of Object.keys(data)) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

    // 获取屏幕宽度
export const getScreen = () => {
  const width = document.body.clientWidth
  if (width >= 1200) {
    return 3 // 大屏幕
  } else if (width >= 992) {
    return 2 // 中屏幕
  } else if (width >= 768) {
    return 1 // 小屏幕
  } else {
    return 0 // 超小屏幕
  }
}

    // 浏览器判断是否全屏
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}

    // esc监听全屏
export const listenfullscreen = (callback: any) => {
  function listen() {
    callback()
  }
  document.addEventListener('fullscreenchange', () => {
    listen()
  })
  document.addEventListener('mozfullscreenchange', () => {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', () => {
    listen()
  })
  document.addEventListener('msfullscreenchange', () => {
    listen()
  })
}

    // 浏览器判断是否全屏
export const fullscreenEnable = () => {
  console.log('full', document.fullscreenEnabled)
  const isFullscreen = (document as any).fullscreenElement ||
    (document as any).msFullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).webkitFullscreenElement || false
  return isFullscreen
}

    // 浏览器全屏
export const reqFullScreen = () => {
  if ((document as any).documentElement.requestFullScreen) {
    (document as any).documentElement.requestFullScreen()
  } else if ((document as any).documentElement.webkitRequestFullScreen) {
    (document as any).documentElement.webkitRequestFullScreen()
  } else if ((document as any).documentElement.mozRequestFullScreen) {
    (document as any).documentElement.mozRequestFullScreen()
  }
}

    // 浏览器退出全屏
export const exitFullScreen = () => {
  if ((document as any).documentElement.requestFullScreen) {
    (document as any).exitFullScreen()
  } else if ((document as any).documentElement.webkitRequestFullScreen) {
    (document as any).webkitCancelFullScreen()
  } else if ((document as any).documentElement.mozRequestFullScreen) {
    (document as any).mozCancelFullScreen()
  }
}

    // 设置主题
export const setTheme = (name: string) => {
  document.body.className = name
}

    // 递归寻找子类的父类
export const findParent = (menu: any, id: any): any => {
  for (const item of menu) {
    if (item.children && item.children.length !== 0) {
      for (const subItem of item.children) {
        if (subItem.id === id) {
          return item
        } else {
          const tmp = findParent(item.children, id)
          if (tmp) {
            return tmp
          }
        }
      }
    }
  }
}

export const formatDate = (time: number | Date, fmt = 'yyyy-MM-dd HH:mm') => {
  if (!time) {
    return ''
  }
  let date: any
  if (getObjType(time) === 'number') {
    date = new Date(time)
  } else {
    date = time
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export const padLeftZero = (str: string) => {
  return ('00' + str).substr(str.length)
}

/**
 * 延迟执行函数
 * @param callback 执行函数
 * @param delay 延迟时间
 */
export const timeout = (callback: any, delay = 200) => {
  setTimeout(callback, delay)
}

/**
 * 生成32位的uuid
 */
export const uuid = () => {
  const s: any = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = ''
  return s.join('')
}

/**
 * 初始化数据格式
 */
export const initVal = ({ type, multiple, value, listType }: any) => {
  if ((['select', 'tree'].includes(type) && multiple) || ['checkbox', 'cascader'].includes(type)
    || ['upload'].includes(type) && listType !== 'picture-img') {
    if (!Array.isArray(value)) {
      return (value || '').split(',')
    } else {
      return value
    }
  } else {
    return value
  }
}

