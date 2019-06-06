import VueRouter from 'vue-router'
import $store from '@/store'
export default class AvueRouter extends VueRouter {
  // 全局配置
  public group = ''
  private $website = $store.getters.website
  private routerList: any[] = []

  // 设置标题
  public setTitle(title: string) {
    title = title ? `${title}` : ''
    document.title = title
  }
  public closeTag(value: any) {
    const tag = value || $store.getters.tag
    $store.commit('DEL_TAG', tag)
  }
  /**
   *  处理路由
   * @param params
   */
  public getPath(params: any) {
    const { src } = params
    let result = src || '/'
    if (src.includes('http') || src.includes('https')) {
      params.src = encodeURIComponent(params.src)
      result = `/myiframe/urlPath?${this.objToform(params)}`
    }
    return result
  }
  /**
   * 正则处理路由
   * @param list
   * @param path
   */
  public vaildPath(list: any, path: string) {
    let result = false
    list.forEach((ele: any) => {
      if (new RegExp('^' + ele + '.*', 'g').test(path)) {
        result = true
      }
    })
    return result
  }
  /**
   * 设置路由值
   * @param route
   */
  public getValue(route: any) {
    let value = ''
    if (route.query.src) {
      value = route.query.src
    } else {
      value = route.path
    }
    return value
  }

  /**
   *  动态路由
   * @param aMenu
   * @param first
   */
  public formatRoutes(aMenu: any[] = [], first: any) {
    const aRouter: any = []
    const propsConfig = this.$website.menu.props
    const propsDefault = {
      label: propsConfig.label || 'label',
      path: propsConfig.path || 'path',
      icon: propsConfig.icon || 'icon',
      children: propsConfig.children || '_children',
      meta: propsConfig.meta || 'meta'
    }
    if (aMenu.length === 0) { return }
    for (const oMenu of aMenu) {
      if (this.routerList.includes(oMenu[propsDefault.path])) { return }
      const path = (() => {
        if (first) {
          return oMenu[propsDefault.path].replace('/index', '')
        } else {
          return oMenu[propsDefault.path]
        }
      })()
      const component = oMenu.component
      const name = oMenu[propsDefault.label]
      const icon = oMenu[propsDefault.icon]
      const children = oMenu[propsDefault.children]
      const meta = oMenu[propsDefault.meta] || {}
      if (oMenu && oMenu.pids) {
        meta.topId = oMenu.pids.split(',')[0]
        meta.menuId = oMenu.id
      }
      const isChild = children && children.length !== 0
      const oRouter = {
        path,
        component(resolve: any) {
          // 判断是否为首路由
          if (first) {
            require(['../page/index'], resolve)
            return
            // 判断是否为多层路由
          } else if (isChild && !first) {
            require(['../page/index/layout'], resolve)
            return
            // 判断是否为最终的页面视图
          } else {
            require([`../${component}.vue`], resolve)
          }
        },
        name,
        icon,
        meta,
        redirect: (() => {
          if (!isChild && first) { return `${path}/index` } else { return '' }
        })(),
        // 处理是否为一级路由
        children: !isChild ? (() => {
          if (first) {
            oMenu[propsDefault.path] = `${path}/index`
            return [{
              component(resolve: any) { require([`../${component}.vue`], resolve) },
              icon,
              name,
              meta,
              path: 'index'
            }]
          }
          return []
        })() : (() => {
          return this.formatRoutes(children, false)
        })()
      }
      aRouter.push(oRouter)
    }
    if (first) {
      if (!this.routerList.includes(aRouter[0][propsDefault.path])) {
        this.addRoutes(aRouter)
        this.routerList.push(aRouter[0][propsDefault.path])
      }
    } else {
      return aRouter
    }
  }

  private objToform(obj: any) {
    const result: any = []
    Object.keys(obj).forEach((ele: string) => {
      result.push(`${ele}=${obj[ele]}`)
    })
    return result.join('&')
  }
}