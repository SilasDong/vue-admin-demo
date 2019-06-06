<template>
  <span class="setting">
    <div class="setting__shade"
         :class="{'setting__shade--show':isShade}"
         @click="close"></div>
    <i class="el-icon-more setting__icon"
       @click="open"></i>
    <div class="setting__content"
         :class="{'setting__content--show':box}">
      <div class="setting__header">设置
      </div>
      <el-scrollbar style="height:800px">
        <div class="setting__body setting__form">
          <avue-form v-model="form"
                     :option="option"></avue-form>
        </div>
      </el-scrollbar>
    </div>
  </span>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Getter, Mutation } from 'vuex-class'
import { Watch, Component, Mixins } from 'vue-property-decorator'
import { option, list } from '@/const/setting/'
@Component
export default class TabSetting extends Mixins(BaseMixin) {
  @Getter('isShade') private isShade: any
  @Getter('showTag') private showTag: any
  @Getter('showDebug') private showDebug: any
  @Getter('showLock') private showLock: any
  @Getter('showColor') private showColor: any
  @Getter('showFullScren') private showFullScren: any
  @Getter('showCollapse') private showCollapse: any
  @Getter('showSearch') private showSearch: any
  @Getter('showMenu') private showMenu: any
  @Getter('showTheme') private showTheme: any
  @Mutation('SET_SHADE') private mShade: any

  private box = false
  private form: any = {}
  private list = list
  private option = option(this)

  // 生命周期方法
  protected mounted() {
    this.init()
  }
  // 私有方法
  private close() {
    this.box = false
    this.mShade(false)
  }
  private set(key: any) {
    const ele = this.find(key)
    this.$store.commit(ele.commit, (this.form as any)[key] === 'true')
  }
  private find(key: any) {
    return this.list.filter((ele: any) => ele.key === key)[0]
  }
  private init() {
    this.list.forEach((ele: any) => {
      this.form[ele.key] = this.$validate.isEmpty((this as any)[ele.key]) ?
        'true' : (this as any)[ele.key] + ''
      this.set(ele.key)
    })
  }
  private open() {
    this.box = true
    this.mShade(true)
  }
}
</script>

<style lang="scss" scoped>
.setting {
  margin-left: 10px;
  &__icon {
    transform: rotate(90deg);
  }
  &__header {
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    color: #333;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    small {
      margin-left: 8px;
      color: #999;
    }
  }
  &__body {
    padding: 10px 15px;
    line-height: 24px;
  }
  &__about {
    font-size: 14px;
    line-height: 30px;
  }
  &__shade {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2048;
    &--show {
      display: block;
    }
  }
  &__form {
    width: 230px;
    margin: 0 auto;
  }
  &__content {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    position: fixed;
    width: 320px;
    height: 100%;
    right: -450px;
    top: 0;
    z-index: 2048;
    background-color: #fff;
    &--show {
      right: 0;
    }
  }
}
</style>
