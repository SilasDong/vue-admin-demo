<template>
  <span @click="logsFlag?'':handleOpen()">
    <el-badge :value="logsFlag?'':logsLen">
      <i class="iconfont iconcuowu"></i>
    </el-badge>
    <el-dialog title="日志"
               fullscreen
               :visible.sync="box"
               width="100%"
               append-to-body>
      <err-logs></err-logs>
    </el-dialog>
  </span>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import ErrLogs from '@/page/logs/index.vue'

@Component({ components: {ErrLogs} })
export default class TopLogs extends Mixins(BaseMixin) {
  @Getter('logsFlag') private logsFlag: any
  @Getter('logsLen') private logsLen: any
  private box = false

  private handleOpen() {
    this.box = true
  }
}
</script>

<style lang="scss" scoped>
</style>
