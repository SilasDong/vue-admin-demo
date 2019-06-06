<template>
  <div>
    <basic-container>
      <avue-tabs :option="option" @change="handleChange">
        <div v-for="(item,index) in option.column" :slot="item.prop" :key='index'>
          <avue-form :option="formOpt" v-model="form" @submit="handleSubmit">
            <template slot="avatar">
              <silas-upload v-model="form.avatar" listType='picture-img'></silas-upload>
            </template>
          </avue-form>
        </div>
      </avue-tabs>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import FormMixin from '@/mixins/FormMixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import SilasUpload from '@/components/silas-upload/index.vue'

@Component({components: {SilasUpload}})
export default class UserInfo extends Mixins(FormMixin, BaseMixin) {
  @Getter('userInfo') private userInfo: any
  @Action('GetUserInfo') private aGetUserInfo: any

  private type = ''
  private option: any = { column: [{label: '个人信息', prop: '0'},
                        {label: '修改密码', prop: '1'}] }

  private column0 = [{
          label: '昵称',
          prop: 'realName',
          rules: [{ required: true, message: '昵称不能为空', trigger: 'blur' },
                  { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }],
          span: 18,
          row: true
        }, {
          label: '账号',
          prop: 'account',
          disabled: true,
          span: 18,
          row: true
        }, {
          label: '头像',
          prop: 'avatar',
          formslot: true,
          span: 18,
          slot: true,
          rules: [{ required: true, message: '头像不能为空', trigger: 'blur' }]
        }]
  private column1 = [{
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

  protected created() {
    this.formOpt = Object.assign(this.formOpt, {
      submitText: '修改',
      labelWidth: 180,
      menuPostion: 'left',
      emptyBtn: true,
      column: []
    })
  }

  protected editFormData(form: any) {
    if (this.type !== '0' && this.form.newPassword !== this.form.verifypassword) {
      this.$message.warning('输入的两次密码不一致')
      return null
    }
    this.fromSubmitApi = this.type === '0' ? this.$api.admin.updateUserInfo : this.$api.admin.updatePwd
    return this.type === '0' ? {realName: form.realName, avatar: form.avatar, id: form.id} : form
  }

  protected submitCallBack(res: any) {
    if (this.type === '0') {
      this.aGetUserInfo()
    }
  }

  private handleChange(item: any) {
    this.type = item.prop
    this.form = {}
    const index = Number.parseInt(item.prop, 10)
    this.formOpt.column = (this as any)['column' + index]
    if (this.type === '0') {
      this.form = this.userInfo
    }
    this.formOpt.emptyBtn = this.type !== '0'
  }
}
</script>

<style>
</style>
