

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Watch, Component } from 'vue-property-decorator'
import {Mutation} from 'vuex-class'
@Component
export default class App extends Vue {
  @Mutation('SET_CLIENT_WIDTH') private mSetClientWidth: any

  private clientWidth: any = document.body.clientWidth

  private mounted() {
    this.onresize()
  }

  private onresize() {
    this.clientWidth = document.body.clientWidth
    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    const that = this
    window.onresize = function temp() {
      that.clientWidth = document.body.clientWidth
      that.mSetClientWidth(that.clientWidth)
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
