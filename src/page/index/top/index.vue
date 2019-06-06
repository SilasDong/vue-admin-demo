<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div class="avue-breadcrumb"
           v-if="showCollapse">
        <i class="icon-navicon avue-breadcrumb_collapse"
           :class="[{ 'avue-breadcrumb_collapse--right': isCollapse }]"
           @click="setCollapse"></i>
      </div>
    </div>
    <h1 class="top-bar__title">
      <div class="top-bar__item top-bar__item--show"
           v-if="showMenu">
        <top-menu></top-menu>
      </div>
      <span class="top-bar__item"
            v-if="showSearch">
        <top-search></top-search>
      </span>
    </h1>
    <div class="top-bar__right">
      <el-tooltip v-if="showColor"
                  effect="dark"
                  content="主题色"
                  placement="bottom">
        <div class="top-bar__item">
          <top-color></top-color>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showDebug"
                  effect="dark"
                  :content="logsFlag?'没有错误日志':`${logsLen}条错误日志`"
                  placement="bottom">
        <div class="top-bar__item">
          <top-logs></top-logs>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showLock"
                  effect="dark"
                  content="锁屏"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showTheme"
                  effect="dark"
                  content="特色主题"
                  placement="bottom">
        <div class="top-bar__item">
          <top-theme></top-theme>
        </div>
      </el-tooltip>
      <!-- <div class="top-bar__item">
        <top-msg></top-msg>
      </div> -->

      <el-tooltip v-if="showFullScren"
                  effect="dark"
                  :content="isFullScren?'退出全屏':'全屏'"
                  placement="bottom">
        <div class="top-bar__item">
          <i :class="isFullScren?'iconfont iconxuanfuanniu-xiaopingx':'iconfont iconquanping'"
             @click="handleScreen"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark"
                  content="用户头像"
                  placement="bottom">
        <img class="top-bar__img" v-if='userInfo.avatar'
             :src="showImage(userInfo.avatar, '@50w')">
        <img class="top-bar__img" v-else>
      </el-tooltip>
      <el-dropdown>
       <span class="el-dropdown-link">
            <span>{{userInfo.realName | substr(10)}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="goHome">
            首页
          </el-dropdown-item>
          <el-dropdown-item>
             <!-- <top-pwd></top-pwd> -->
             <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout"
                            divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <top-setting class="top-bar__item"></top-setting>
    </div>
  </div>
</template>
<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { mapGetters, mapState } from 'vuex'
import topLock from './top-lock.vue'
import topMenu from './top-menu.vue'
import topSearch from './top-search.vue'
import topBreadcrumb from './top-breadcrumb.vue'
import topColor from './top-color.vue'
import topTheme from './top-theme.vue'
import topLogs from './top-logs.vue'
import topPwd from './top-pwd.vue'
import topSetting from './top-setting.vue'
import topMsg from './top-msg.vue'

@Component({
  components: {topLock, topMenu, topSearch, topBreadcrumb, topColor, topTheme, topLogs, topPwd, topSetting, topMsg}
})

export default class Top extends Mixins(BaseMixin) {
  @Getter('userInfo') private userInfo: any
  @Getter('isFullScren') private isFullScren: any
  @Getter('tagWel') private tagWel: any
  @Getter('tagList') private tagList: any
  @Getter('isCollapse') private isCollapse: any
  @Getter('tag') private tag: any
  @Getter('logsLen') private logsLen: any
  @Getter('logsFlag') private logsFlag: any
  @Getter('showDebug') private showDebug: any
  @Getter('showColor') private showColor: any
  @Getter('showTheme') private showTheme: any
  @Getter('showLock') private showLock: any
  @Getter('showFullScren') private showFullScren: any
  @Getter('showCollapse') private showCollapse: any
  @Getter('showSearch') private showSearch: any
  @Getter('showMenu') private showMenu: any
  @Action('FedLogOut') private aFedLogOut: any

  protected mounted() {
    this.$util.listenfullscreen(this.setScreen)
  }

  private goHome() {
    this.$router.push({path: '/'})
  }

  private handleScreen() {
    this.$util.fullscreenToggel()
  }
  private setCollapse() {
    this.$store.commit('SET_COLLAPSE')
  }
  private setScreen() {
    this.$store.commit('SET_FULLSCREN')
  }
  private logout() {
    this.$confirm('是否退出系统, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.aFedLogOut()
    })
  }
}
</script>

<style lang="scss" scoped>
</style>

