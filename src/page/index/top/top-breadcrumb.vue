<template>
  <el-breadcrumb separator="/"
                 class="avue-breadcrumb-list">
    <template v-for="(item,index) in tagCurrent">
      <el-breadcrumb-item :to="{ path: item.value }"
                          :key="index">{{item.label}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import BaseMixin from '@/mixins/BaseMixin'
@Component
export default class Breadcrumb extends Mixins(BaseMixin) {
  // @Getter('tagCurrent') private tagCurrent: any
  private tagCurrent = ''
}
</script>
<style lang="scss" scoped>
</style>

