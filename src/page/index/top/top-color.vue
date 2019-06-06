<template>
  <el-color-picker :size="uiSize"
                   class="theme-picker"
                   popper-class="theme-picker-dropdown"
                   v-model="themeVal"></el-color-picker>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator'
import colorMixin from '@/mixins/color'
import BaseMixin from '@/mixins/BaseMixin'

@Component
export default class TopColor extends Mixins(colorMixin, BaseMixin) {
  private chalk = ''
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
