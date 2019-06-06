<template>
  <div class="avue-contail"
       :class="{'avue--collapse':isCollapse}">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top />
    </div>

    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar />
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags />
        <!-- 主体视图层 -->
        <el-scrollbar style="height:100%">
          <keep-alive>
            <router-view class="avue-view"
                         v-if="$route.meta.$keepAlive" />
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.$keepAlive" />
        </el-scrollbar>

      </div>
    </div>
    <div class="avue-shade"
         @click="showCollapse"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import tags from './tags.vue'
import top from './top/index.vue'
import sidebar from './sidebar/index.vue'
import BaseMixin from '@/mixins/BaseMixin'

@Component({ components: {top, tags, sidebar} })
export default class Index extends Mixins(BaseMixin) {

  @Getter('isLock') private isLock: any
  @Getter('isCollapse') private isCollapse: any
  @Getter('website') private website: any
  @Mutation('SET_COLLAPSE') private mCollapse: any
  @Mutation('SET_SCREEN') private mScreen: any

  private refreshLock: boolean = false // 刷新token锁
  private refreshTime: string = '' // 刷新token的时间
  protected created() {
    // 实时检测刷新token
    // this.refreshToken();
  }
  protected mounted() {
    this.init()
  }

  private showCollapse() {
    this.mCollapse()
  }
  // 屏幕检测
  private init() {
    this.mScreen(this.$util.getScreen())
    window.onresize = () => {
      setTimeout(() => {
        this.mScreen(this.$util.getScreen())
      }, 0)
    }
  }
}
</script>
