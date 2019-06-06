<template>
  <span @click="handleOpen()" >
    修改密码
    <el-dialog title="修改密码"
               :visible.sync="box"
               append-to-body>
        <avue-form :option="formOpt" v-model="form" @submit="handleSubmit">
        </avue-form>
    </el-dialog>
  </span>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import FormMixin from '@/mixins/FormMixin'
import { Component, Mixins } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class TopPwd extends Mixins(FormMixin, BaseMixin) {
  private box = false

  protected created() {
    this.formOpt = {
      submitText: '确认修改',
      labelWidth: 180,
      menuPostion: 'left',
      column: [{
          label: '原始密码',
          prop: 'oldPassword',
          type: 'password',
          rules: [{ required: true, message: '原始密码不能为空', trigger: 'blur' },
                  { min: 6, max: 15, message: '长度在 6 到 32 个字符', trigger: 'blur' }],
          row: true,
          span: 18
        },
        {
          label: '新的密码',
          prop: 'newPassword',
          type: 'password',
          rules: [{ required: true, message: '新的密码不能为空', trigger: 'blur' },
                  { min: 6, max: 15, message: '长度在 6 到 32 个字符', trigger: 'blur' }],
          row: true,
          span: 18
        },
        {
          label: '确认密码',
          prop: 'verifypassword',
          type: 'password',
          rules: [{ required: true, message: '请输入确认密码', trigger: 'blur' },
                  { min: 6, max: 15, message: '长度在 6 到 32 个字符', trigger: 'blur' }],
          row: true,
          span: 18
        }]
    }
  }

  protected editFormData(form: any): any {
    if (this.form.newPassword !== this.form.verifypassword) {
      this.$message.warning('输入的两次密码不一致')
      return null
    }
    this.fromSubmitApi = this.$api.admin.updatePwd
    return form
  }

  private handleOpen() {
    this.box = true
  }
}
</script>

<style lang="scss" scoped>
</style>
