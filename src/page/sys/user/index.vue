
<template>
  <div>
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOpt"
        :data="pageList"
        :table-loading="loading"
        @search-change="searchChange"
        @search-reset='searchReset'
        @refresh-change="refreshChange"
        @row-save="rowSave"
        @row-update="rowUpdate"
        @row-del="rowDel"
        :before-open="beforeOpen"
        :before-close="beforeClose"
        v-model="form">
          <template slot="passwordForm" slot-scope="scope">
            <span>
              <el-button style='margin-left:20px' type="primary" :size="uiSize" :text='scope'  @click="resetPwd">重置密码</el-button>
            </span>
          </template>
          <template slot="menu" slot-scope="scope">
          <el-button :size="scope.size" type="text" @click='rowDel(scope.row)' v-if="scope.row.id != 'develop'">删除</el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script lang='ts'>

import PageMixin from '@/mixins/PageMixin'
import TreeMixin from '@/mixins/TreeMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { DIC } from '@/const/dic'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'
import { DialogStatus } from '@/enum'

@Component
export default class SysUser extends Mixins(PageMixin, BaseMixin) {

  private isMenuDialog = false
  private roleId: string = ''
  private menuIds: string[] = []
  private form: any = {}

  protected created() {
    this.pageQueryApi = this.$api.sys.userList
    this.insertApi = this.$api.sys.insertUser
    this.updateApi = this.$api.sys.updateUser
    this.deleteApi = this.$api.sys.deleteUser
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
          delBtn: false,
          labelWidth: 180,
          column: [{
            label: '账号名称',
            prop: 'account',
            search: true,
            row: true,
            span: 18,
            rules: [{
                required: true,
                message: '请输入账号名称',
                trigger: 'blur'
            }, { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]
          }, {
            label: '用户密码',
            prop: 'password',
            type: 'password',
            row: true,
            span: 18,
            formslot: false,
            hide: true,
            rules: [{
                required: true,
                message: '请输入用户密码',
                trigger: 'blur'
            }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
        }, {
            label: '确认密码',
            prop: 'verifypassword',
            type: 'password',
            row: true,
            span: 18,
            hide: true,
            display: true,
            rules: [{
                required: true,
                message: '请输入确认密码',
                trigger: 'blur'
            }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
        }, {
            label: '用户昵称',
            prop: 'realName',
            row: true,
            span: 18,
            rules: [{
                required: true,
                message: '请输入用户昵称',
                trigger: 'blur'
            }, { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]
        }, {
            label: '角色名称',
            prop: 'roleId',
            type: 'select',
            row: true,
            span: 18,
            dicUrl: '/api/xcd-m-sys-role-dic?isMenu=1&createId=1',
            rules: [{
                required: true,
                message: '请选择有无菜单',
                trigger: 'blur'
            }]
        }, {
            label: '用户状态',
            prop: 'state',
            type: 'radio',
            dicData: DIC.STATUS,
            valueDefault: 1,
            span: 18,
            row: true,
            rules: [{
                required: true,
                message: '请选择用户状态',
                trigger: 'blur'
            }]
        }, {
            label: '创建时间',
            prop: 'createTime',
            type: 'datetime',
            valueFormat: 'timestamp',
            format: 'yyyy-MM-dd HH:mm',
            display: false
        }]
    })
  }

  protected mounted() {
    this.page.pageSize = 100
    this.queryList()
  }

  protected validate(form: any, done: any, loading: any): boolean {
    if (this.form.password !== this.form.verifypassword) {
      loading()
      this.$message.warning('输入的两次密码不一致')
      return false
    }
    return true
  }

  @Watch('dialogStatus')
  private onWatchDialogStatus() {
    this.tableOpt.column[0].disabled = this.dialogStatus === DialogStatus.EDIT
    if (this.dialogStatus === DialogStatus.EDIT) {
      this.tableOpt.column[2].display = false
      this.tableOpt.column[1].rules = []
      this.tableOpt.column[1].formslot = true
    } else if (this.dialogStatus === DialogStatus.ADD) {
      this.tableOpt.column[2].display = true
      this.tableOpt.column[1].formslot = false
      this.tableOpt.column[1].rules = [{ required: true, message: '请输入用户密码', trigger: 'blur' },
                                            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
    }
  }

  private resetPwd() {
    this.tableOpt.column[2].display = true
    this.tableOpt.column[1].formslot = false
    this.tableOpt.column[1].rules = [{ required: true, message: '请输入用户密码', trigger: 'blur' },
                                          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
  }
}
</script>
