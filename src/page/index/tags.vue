<template>
  <div class="avue-tags"
       v-if="showTag">
    <!-- tag盒子 -->
    <div class="avue-tags__box"
         :class="{'avue-tags__box--close':!website.isFirstPage}">
      <el-tabs v-model="active"
               type="card"
               :closable="tagLen!==1"
               @tab-click="openTag"
               @edit="menuTag">
        <el-tab-pane :key="item.value"
                     v-for="item in tagList"
                     :label="item.label"
                     :name="item.value">
        </el-tab-pane>
      </el-tabs>
      <el-dropdown class="avue-tags__menu">
        <el-button type="primary"
                   :size="uiSize">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeOthersTags">关闭其他</el-dropdown-item>
          <el-dropdown-item @click.native="closeAllTags">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>
<script lang='ts'>
import { Watch, Component, Mixins } from 'vue-property-decorator'
import { Getter, Action, State, Mutation } from 'vuex-class'
import BaseMixin from '@/mixins/BaseMixin'

interface TagKey {
    tag: any,
    key: any
}

@Component
export default class Tags extends Mixins(BaseMixin) {
    @Getter('tagWel') private tagWel: any
    @Getter('tagList') private tagList: any
    @Getter('showTag') private showTag: any
    @Getter('website') private website: any
    @Getter('tag') private tag: any
    @Mutation('DEL_TAG') private mDelTag: any
    @Mutation('DEL_TAG_OTHER') private mDelOtherTag: any
    @Mutation('DEL_ALL_TAG') private mDelAllTag: any

    private active = ''

    protected mounted() {
      this.setActive()
    }

    @Watch('tag')
    private onWatchTag() {
      this.setActive()
    }
    get tagLen() {
      return this.tagList.length || 0
    }

    // 激活当前选项
    private setActive() {
      this.active = this.tag.value
    }

    private menuTag(value: any, action: any) {
      if (action === 'remove') {
        const { tag, key }: TagKey = this.findTag(value)
        this.mDelTag(tag)
        if (tag.value === this.tag.value) {
          const tempTag = this.tagList[key === 0 ? key : key - 1] // 如果关闭本标签让前推一个
          this.openTag(tempTag)
        }
      }
    }

    private openTag(item: any) {
      let tag
      if (item.name) {
        tag = this.findTag(item.name).tag
      } else {
        tag = item
      }
      this.$router.push({
        path: this.$router.getPath({
          name: tag.label,
          src: tag.value
        }),
        query: tag.query
      })
    }

    private closeOthersTags() {
      this.mDelOtherTag()
    }

    private findTag(value: any) {
      let tag
      let key
      this.tagList.map((item: any, index: any) => {
        if (item.value === value) {
          tag = item
          key = index
        }
      })
      return { tag, key }
    }

    private closeAllTags() {
      this.mDelAllTag()
      this.$router.push({
        path: this.$router.getPath({
          src: this.tagWel.value
        }),
        query: this.tagWel.query
      })
    }
}
</script>

