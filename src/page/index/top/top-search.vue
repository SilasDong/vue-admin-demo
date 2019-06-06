<template>
  <el-autocomplete class="top-search"
                   popper-class="my-autocomplete"
                   v-model="value"
                   :fetch-suggestions="querySearch"
                   placeholder="请输入搜索内容"
                   @select="handleSelect">

    <template slot-scope="{ item }">
      <i :class="[item[iconKey],' icon']"></i>
      <div class="name">{{ item[labelKey] }}</div>
      <p class="addr">{{ item[pathKey] }}</p>
    </template>
  </el-autocomplete>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Getter, Mutation } from 'vuex-class'
import { Watch, Component, Mixins } from 'vue-property-decorator'
import config from '../sidebar/config'

@Component
export default class TopSearch extends Mixins(BaseMixin) {
  // store
  @Getter('menu') private menu: any
  @Getter('website') private website: any

  // 私有属性
  private config = config
  private value = ''
  private menuList: any = []

  // 计算属性
  get labelKey() {
    return (this.website && this.website.menu.props.label) || this.config.propsDefault.label
  }
  get pathKey() {
    return (this.website && this.website.menu.props.path) || this.config.propsDefault.path
  }
  get iconKey() {
    return (this.website && this.website.menu.props.icon) || this.config.propsDefault.icon
  }
  get childrenKey() {
    return (this.website && this.website.menu.props.children) || this.config.propsDefault.children
  }

  // 生命周期函数
  protected created() {
    this.getMenuList()
  }

  @Watch('menu')
  private onWatchMenu() {
    this.getMenuList()
  }

  // 私有方法
  private getMenuList() {
    const findMenu = (list: any) => {
      for (const item of list) {
        const ele: any = Object.assign({}, item)
        if (ele[this.childrenKey]) {
          findMenu(ele[this.childrenKey])
        }
        if (ele.component || (ele.path && ele.path.startsWith('http'))) {
          delete ele[this.childrenKey]
          this.menuList.push(ele)
        }
      }
    }
    this.menuList = []
    findMenu(this.menu)
  }

  private querySearch(queryString: any, cb: any) {
    const restaurants = this.menuList
    const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
    // 调用 callback 返回建议列表的数据
    cb(results)
  }
  private createFilter(queryString: string) {
    return (restaurant: any) => {
      return (restaurant.label.toLowerCase().includes(queryString.toLowerCase()))
    }
  }

  private handleSelect(item: any) {
    this.value = ''
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

<style lang="scss">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .icon {
      margin-right: 5px;
      display: inline-block;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: middle;
    }
    .addr {
      padding-top: 5px;
      width: 100%;
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
