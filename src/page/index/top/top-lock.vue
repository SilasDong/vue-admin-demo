<template>
  <span>
    <i class="iconfont iconsuoping" @click="handleLock"></i>
    <el-dialog title="设置锁屏密码" :visible.sync="box" width="30%" append-to-body >
      <el-form :model="form" ref="form" label-width="80px" >
        <el-form-item label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能为空'}]" >
          <el-input v-model="form.passwd" placeholder="请输入锁屏密码" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="handleSetLock" >确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'

@Component
export default class TopLock extends Mixins(BaseMixin) {
  @Getter('lockPasswd') private lockPasswd: any
  @Mutation('SET_LOCK_PASSWD') private mLockPasswd: any
  @Mutation('SET_LOCK') private mLock: any

  private box = false
  private form = { passwd: '' }

  private handleSetLock() {
    (this.$refs.form as any).validate((valid: any) => {
      if (valid) {
        this.mLockPasswd(this.form.passwd)
        this.handleLock()
      }
    })
  }
  private handleLock() {
    if (this.$validate.isEmpty(this.lockPasswd)) {
      this.box = true
      return
    }
    this.mLock()
    setTimeout(() => {
      this.$router.push({ path: '/lock' })
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
</style>
