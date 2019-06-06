<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item[childrenKey]) && vaildRoles(item)"
                    :index="item[pathKey]"
                    @click="open(item)"
                    :key="item[labelKey]"
                    :style='styleObject'
                    :class="{'is-active':vaildAvtive(item)}">
        <i :class="item[iconKey]"></i>&nbsp;
        <span slot="title">{{item[labelKey]}}</span>
      </el-menu-item>
      <el-submenu v-else-if="!validatenull(item[childrenKey])&&vaildRoles(item)"
                  :index="item[pathKey]"
                  :key="item[labelKey]">
        <template slot="title">
          <i :class="item[iconKey]"></i>&nbsp;
          <span slot="title"
                :class="{'el-menu--display':collapse&&first}">{{item[labelKey]}}</span>
        </template>
        <template v-for="(child,cindex) in item[childrenKey]">
          <el-menu-item :index="child[pathKey]"
                        @click="open(child)"
                        :class="{'is-active':vaildAvtive(child)}"
                        v-if="validatenull(child[childrenKey])"
                        :style='styleObject'
                        :key="child[labelKey]">
            <i :class="child[iconKey]"></i>&nbsp;
            <span slot="title">{{child[labelKey]}}</span>
          </el-menu-item>
          <sidebar-item v-else
                        :menu="[child]"
                        :key="cindex"
                        :props="props"
                        :screen="screen"
                        :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import config from './config'
import BaseMixin from '@/mixins/BaseMixin'

@Component
export default class SidebarItem extends Mixins(BaseMixin) {
  @Getter('roles') private roles: any
  @Getter('isCollapse') private isCollapse: any
  @Mutation('SET_COLLAPSE') private mCollapse: any

  @Prop({type: Array})
  private menu: any
  @Prop({type: Number})
  private screen: any
  @Prop({type: Boolean, default: false})
  private first: any
  @Prop({type: Object, default: {}})
  private props: any
  @Prop({type: Boolean})
  private collapse: any

  private config = config
  private styleObject = {}

  get labelKey() {
    return this.props.label || this.config.propsDefault.label
  }
  get pathKey() {
    return this.props.path || this.config.propsDefault.path
  }
  get iconKey() {
    return this.props.icon || this.config.propsDefault.icon
  }
  get childrenKey() {
    return this.props.children || this.config.propsDefault.children
  }
  get nowTagValue() {
    return this.$router.getValue(this.$route)
  }

  // @Watch('isCollapse', { immediate: true })
  // private onWatchIsCollapse() {
  //   this.styleObject = {backgroundColor: this.isCollapse ? 'rgb(32, 34, 42)' : 'transparent'}
  // }
  private vaildAvtive(item: any) {
    const groupFlag = (item.group || []).some((ele: any) => this.$route.path.includes(ele))
    return this.nowTagValue === item[this.pathKey] || groupFlag
  }
  private vaildRoles(item: any) {
    item.meta = item.meta || {}
    return item.meta.roles ? item.meta.roles.includes(this.roles) : true
  }
  private validatenull(val: any) {
    return this.$validate.isEmpty(val)
  }
  private open(item: any) {
    if (this.screen <= 1) {
      this.mCollapse()
    }
    this.$router.group = item.group
    this.$router.push({
      path: this.$router.getPath({
        name: item[this.labelKey],
        src: item[this.pathKey]
      }),
      query: item.query
    })
  }
}
</script>

