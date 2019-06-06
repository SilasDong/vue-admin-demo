<template>
  <div class="top-menu">
    <el-menu :default-active="firstTopMenu"
             mode="horizontal"
             text-color="#333">
      <template v-for="(item,index) in topMenu">
        <el-menu-item :index="item.id+''"
                      @click.native="openMenu(item)"
                      :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span class="top-menu-span">{{item.label}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins } from 'vue-property-decorator'
import { Getter, Action, Mutation } from 'vuex-class'
import { add404 } from '@/router/'

@Component
export default class TopMenu extends Mixins(BaseMixin) {
  @Getter('tagCurrent') private tagCurrent: any
  @Getter('menu') private menu: any
  @Getter('firstTopMenu') private firstTopMenu: any
  @Getter('topMenu') private topMenu: any
  @Mutation('SET_FIRST_TOP_MENU') private mFirstTopMenu: any
  @Mutation('SET_TOP_MENU') private mTopMenu: any

  protected mounted() {
  }

  private openMenu(item: any) {
    if (this.menu.length === 0) {
      return
    }
    this.mFirstTopMenu(item.id)
    let itemActive: any
    const childItemActive = 0
    if (item.path) {
      itemActive = this.getFirstUrl(item)
    } else {
      if (this.menu[childItemActive].length === 0) {
        itemActive = this.menu[childItemActive]
      } else {
        itemActive = this.menu[childItemActive].children[childItemActive]
      }
    }
    this.$router.push({
      path: this.$router.getPath({
        name: itemActive.label,
        src: itemActive.path
      })
    })
  }

  private getFirstUrl(item: any) {
    let result: any
    if (item.path.startsWith('http')) {
      result = item
    } else {
      this.menu.forEach((it: any) => {
        if (item.path.startsWith(it.path) && it._children) {
          it._children.forEach((it1: any) => {
            if (item.path === it1.path) {
              result = item
            }
          })
        }
      })
      if (!result) {
        this.menu.forEach((it: any) => {
          if (item.path.startsWith(it.path) && it._children) {
            result = Object.assign({}, item)
            result.path = it._children[0].path
          }
        })
      }
      if (!result) {
        this.menu.forEach((it: any) => {
          if (it._children) {
            result = Object.assign({}, item)
            result.path = it._children[0].path
          }
        })
      }
    }
    return result
  }
}
</script>
