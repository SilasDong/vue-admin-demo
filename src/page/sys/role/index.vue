
<template>
  <div>
    <basic-container>
      <avue-crud
      ref="crud"
      :option="tableOpt"
      :data="pageList"
      :table-loading="loading"
      @refresh-change="refreshChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      :before-open="beforeOpen"
      :before-close="beforeClose">
        <template slot="menu" slot-scope="scope">
          <el-button :size="scope.size" type="text" @click='menu(scope.row)' v-if="scope.row.isMenu == 1 && hasPermission('AUTH')">权限</el-button>
          <el-button :size="scope.size" type="text" @click='rowDel(scope.row)' v-if="scope.row.id != 'develop'">删除</el-button>
        </template>
      </avue-crud>
      <el-dialog title="权限选择" :visible.sync="isMenuDialog"> 
        <silas-tree :option="treeOpt" :data="treeList" @check-change='handleCheckChange' >
          <template slot="funMenu">
            <el-button type="primary" :size="uiSize" @click="authorization()">授权</el-button>
          </template>
        </silas-tree>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import PageMixin from '@/mixins/PageMixin'
import TreeMixin from '@/mixins/TreeMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { DIC } from '@/const/dic'
import { Component, Mixins } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'

@Component
export default class SysRole extends Mixins(PageMixin, TreeMixin, BaseMixin) {

  private isMenuDialog = false
  private roleId: string = ''
  private menuIds: string[] = []

  protected created() {
    this.pageQueryApi = this.$api.sys.roleList
    this.insertApi = this.$api.sys.insertRole
    this.updateApi = this.$api.sys.updateRole
    this.deleteApi = this.$api.sys.deleteRole
    this.treeQueryApi = this.$api.sys.menuTreeListByRole
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
          delBtn: false,
          labelWidth: 180,
          column: [{
            label: '角色ID',
            prop: 'id',
            row: true,
            span: 18,
            rules: [{
                required: true,
                message: '请输入角色ID',
                trigger: 'blur'
            }, { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]
          }, {
            label: '角色名称',
            prop: 'roleName',
            row: true,
            span: 18,
            rules: [{
                required: true,
                message: '请输入角色名称',
                trigger: 'blur'
            }, { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]
        }, {
            label: '有无菜单',
            prop: 'isMenu',
            type: 'radio',
            dicData: DIC.HAVE,
            span: 18,
            row: true,
            rules: [{
                required: true,
                message: '请选择有无菜单',
                trigger: 'blur'
            }]
        }, {
            label: '角色序号',
            prop: 'num',
            type: 'number',
            span: 18,
            row: true,
            rules: [{
                required: true,
                message: '请输入角色序号',
                trigger: 'blur'
            }, {type: 'number', min: 1, max: 100, message: '角色序号在1-100之间', trigger: 'blur' }]
        }, {
            label: '备注',
            prop: 'remarks',
            row: true,
            span: 18,
            rules: [{ min: 1, max: 50, message: '长度在 1 到 500 个字符', trigger: 'blur' }]
        }]
    })
    this.treeOpt = Object.assign({
      props: {
        value: 'id',
        children: 'children'
      },
      menu: false,
      multiple: true,
      span: 21
    }, this.treeOpt)
  }

  protected mounted() {
    this.page.pageSize = 100
    this.queryList()
  }

  private menu(row: any) {
    this.roleId = row.id
    console.log(row.id)
    this.queryTreeList({ role: row.id}).then(() => {
      this.isMenuDialog = true
    })
  }

  private handleCheckChange(data: any, checkedNodes: any) {
    this.menuIds = checkedNodes.checkedKeys.concat(checkedNodes.halfCheckedKeys)
  }

  private authorization() {
    if (!this.menuIds.join()) {
      this.$message({ message: '您未修改菜单的授权项', type: 'warning' })
      return
    }
    this.$api.sys.updateMenuRole({roleId: this.roleId, menuIds: this.menuIds.join() }).then(((res: any) => {
      this.isMenuDialog = false
      this.$message.success('权限更新成功')
    })
    )
  }
}
</script>
