<template>
  <div>
    <basic-container>
      <iframe v-if="$route.query.src"
              :src='$route.query.src'
              class="iframe"
              ref="iframe"></iframe>
      <iframe v-else
              :src="urlPath"
              class="iframe"
              ref="iframe"></iframe>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

@Component
export default class AvueIframe extends Mixins(BaseMixin) {
  @Getter('screen') private screen: any

  @Prop() private routerPath: any

  private urlPath = ''
  protected created() {
    NProgress.configure({ showSpinner: false })
  }
  protected mounted() {
    this.urlPath = this.getUrlPath()
    this.load()
    this.resize()
  }

  @Watch('$route')
  private onWatchRoute() {
    // this.load()
  }

  @Watch('routerPath')
  private onWatchRouterPath() {
    // 监听routerPath变化，改变src路径
    this.urlPath = this.getUrlPath()
  }

  // 显示等待框
  private show() {
    NProgress.start()
  }
    // 隐藏等待狂
  private hide() {
    NProgress.done()
  }
    // 加载浏览器窗口变化自适应
  private resize() {
    window.onresize = () => {
      this.iframeInit()
    }
  }
    // 加载组件
  private load() {
    this.show()
    let flag = true // URL是否包含问号
    if (this.$route.query.src.indexOf('?') === -1) {
      flag = false
    }
    let list: any = []
    for (const key of Object.keys(this.$route.query)) {
      if (key !== 'src' && key !== 'name') {
        list.push(`${key}= this.$route.query[key]`)
      }
    }
    list = list.join('&').toString()
    if (flag) {
      this.$route.query.src = `${this.$route.query.src}${
        list.length > 0 ? `&list` : ''
        }`
    } else {
      this.$route.query.src = `${this.$route.query.src}${
        list.length > 0 ? `?list` : ''
        }`
    }
    // 超时3s自动隐藏等待狂，加强用户体验
    let time = 3
    const timeFunc = setInterval(() => {
      time--
      if (time === 0) {
        this.hide()
        clearInterval(timeFunc)
      }
    }, 1000)
    this.iframeInit()
  }
  // iframe窗口初始化
  private iframeInit() {
    const iframe: any = this.$refs.iframe
    const clientHeight = document.documentElement.clientHeight - ((window as any).screen > 1 ? 200 : 130)
    iframe.style.height = `${clientHeight}px`
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', () => {
        this.hide()
      })
    } else {
      iframe.onload = () => {
        this.hide()
      }
    }
  }
  private getUrlPath() {
    // 获取 iframe src 路径
    let url = window.location.href
    url = url.replace('/myiframe', '')
    return url
  }
}
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>