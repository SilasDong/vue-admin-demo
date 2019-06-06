import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import * as util from '@/utils/'
import * as log from '@/utils/log'
import * as validate from '@/utils/validate'
import store from '@/store/'
import axios from '@/http/axios'
import api from '@/api/'
@Component
export default class BaseMixin extends Vue {
  public $refs: any
  public $parent: any
  @Getter('permission') protected permission: any
  @Getter('size') protected uiSize: any

  protected $api = api
  protected $http = axios
  protected $router: any
  protected $route: any
  protected $store = store
  protected $validate = validate
  protected $confirm: any
  protected $message: any
  protected $notify: any
  protected $loading: any
  protected $log = log
  protected $util = util

  protected fileDownloadurl = '/api/xcd-module-filemanager-file-download?id='

  protected created() {
  }

  protected mounted() {
    //
  }

  protected beforeRouteEnter(to: any, from: any, next: any) {
    // 这里还无法访问到组件实例，this === undefined
    next((vm: any) => {
      // 通过 `vm` 访问组件实例
    })
  }

  protected destroyed() {
    //
  }

  // 判断是否又权限
  protected hasPermission(code: string) {
    let permission = this.permission.filter((res: any) => {
      return res.menuId === this.$route.meta.menuId
    })
    permission = permission && permission[0] && permission[0].permissions
    if (permission) {
      return permission.includes(code)
    }
    return true
  }

  protected uploadBefore(file: any, done: any, loading: any) {
    done()
  }

  protected uploadAfter(res: any, done: any, loading: any) {
    done()
  }

  protected showImage(url: any, perfi = '@100w') {
    if (url && url.length === 32) {
      return `${this.fileDownloadurl}${url}`
    } else if (url && url.includes('uploadfiles')) {
      if (url.includes(',')) {
        return `${url.split(',')[0]}` + perfi
      } else {
        return `${url}` + perfi
      }
    }
    return url
  }

  protected clipboardSuccess() {
    this.$message({
      message: '拷贝成功',
      type: 'success',
      duration: 1500
    })
  }
}
