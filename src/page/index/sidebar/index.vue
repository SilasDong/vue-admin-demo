<template>
  <div class="avue-sidebar">
    <logo></logo>
    <el-scrollbar style="height:100%">
      <el-menu unique-opened
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               background-color="#20222a"
               text-color="rgba(255,255,255,0.7)"
               :collapse="keyCollapse">
        <sidebar-item :menu="subMenu"
                      first
                      :screen="screen"
                      :props="website.menu.props"
                      :collapse="keyCollapse"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import logo from '../logo.vue'
import sidebarItem from './sidebarItem.vue'

@Component({ components: {sidebarItem, logo} })
export default class Sidebar extends Mixins(BaseMixin) {
  @Getter('website') private website: any
  @Getter('menu') private menu: any
  @Getter('tag') private tag: any
  @Getter('keyCollapse') private keyCollapse: any
  @Getter('screen') private screen: any
  @Getter('topMenu') private topMenu: any
  @Getter('firstTopMenu') private firstTopMenu: any
  private menus: any

  get nowTagValue() {
    return this.$router.getValue(this.$route)
  }

  get subMenu() {
    this.menus = this.menu.filter((item: any) => {
      return (item.pids || '').startsWith(this.firstTopMenu)
    })
    this.filterHideMenu(this.menus)
    return this.menus
  }

  private filterHideMenu(menu: any) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].isShow === 0) {
        menu[i] = []
      } else if (menu[i]._children) {
        this.filterHideMenu(menu[i]._children)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

