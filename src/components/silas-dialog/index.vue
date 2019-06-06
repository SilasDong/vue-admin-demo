<template>
  <div>
    <el-dialog :title='title' :append-to-body='true' :visible.sync="descVisibel" :width='width' :fullscreen='full' :top='top + "vh"' :modal='modal'>
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <slot name="footer">
          <el-button type="primary" @click="sure" :loading="loading">{{sureText}}</el-button>
        </slot>
        <el-button @click="descVisibel = false" v-if='cancelBtn' style="margin-left: 10px;">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>

import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins, Watch, Prop } from 'vue-property-decorator'

@Component
export default class SilasDialog extends Mixins(BaseMixin) {
  @Prop({ type: String, default: ''})
  private title: any
  @Prop({ type: String })
  private id: any
  @Prop({ type: Boolean, default: true })
  private cancelBtn: any
  @Prop({ type: String, default: '确 定' })
  private sureText: any
  @Prop({ type: Boolean, default: false })
  private full: any
  @Prop({ type: Boolean, default: true })
  private modal: any
  @Prop({ type: String, default: '50%' })
  private width: any
  @Prop({ type: Number, default: 15 })
  private top: any

  private descVisibel = false
  private loading = false

  protected mounted() {
  }

  @Watch('id', { immediate: true })
  private onWatchId() {
    this.descVisibel = true
  }

  private sure() {
    this.loading = true
    this.$emit('sure', () => {
      this.descVisibel = false
    }, () => {
      this.loading = false
    })
  }
}
</script>
