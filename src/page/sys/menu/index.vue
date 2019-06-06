<template>
  <div>
    <basic-container>
      <el-container  v-if="hasPermission('SYNCH')">
        <el-header class="menu-header">
          <el-button-group>
            <el-button type="primary"
                       icon="el-icon-refresh"
                       :size="uiSize"
                       @click.native="handleSynchronize()">菜单同步</el-button>
          </el-button-group>
        </el-header>
      </el-container>
      <el-container>
        <el-row :gutter="20">
          <el-col :span="7" :xs='24'>
            <el-aside style="margin-right: 50px;width: 200px;">
              <silas-tree  :option="treeOpt" :data="treeList" @node-click="handleNodeClick"  @node-dbclick='handleDbNodeClick' v-model="treeForm" @del="handleTreeDel">
                <template slot-scope="scope" slot="menuBtn">
                    <el-dropdown-item @click.native="handleEdit(scope.node,scope.data)" v-if="hasPermission('EDIT')">编辑</el-dropdown-item>
                    <el-dropdown-item @click.native="handleCope(scope.node,scope.data)" v-if="hasPermission('ADD')">复制</el-dropdown-item>
                    <el-dropdown-item @click.native="handleAddNext(scope.node,scope.data)"
                      v-if="!((scope.data.path && scope.data.path.startsWith('http') && form.parentLabel) || scope.data.component) && hasPermission('ADD')">添加下级</el-dropdown-item>
                </template>
              </silas-tree>
            </el-aside>
          </el-col>
          <el-col :span="17" :xs='24'>
            <el-main>
              <avue-form :option="formOpt" v-model="form" @submit="handleSubmit">
                <template slot="apiNames">
                  <div>
                    <el-button @click="addApi" type="primary" :size="uiSize" v-if='this.formStatus != 1'>添加</el-button>
                    <el-table
                      :data="apisList"
                      style="width: 100%"
                      :show-header='false'>
                      <el-table-column
                        prop="apiId"
                        label="APIID">
                      </el-table-column>
                      <el-table-column
                        prop="apiName"
                        label="API名称">
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                          <el-button @click="delApi(scope.row)" type="text">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
                <template slot="buttonRole">
                  <div>
                    <el-button @click="addMenuButton" type="primary" :size="uiSize" v-if='this.buttonList.length === 0'>
                      {{ this.buttonList.length === 0 ? '添加权限' : '新增' }}</el-button>
                    <avue-crud
                        v-else
                        ref="crud1"
                        :option="option"
                        :data="buttonList"
                        @row-save="rowButtonSave"
                        @row-del="rowButtonDel"
                        v-model="buttonForm">
                    </avue-crud>
                  </div>
                </template>
              </avue-form>
            </el-main>
          </el-col>
        </el-row>
        
        
      </el-container>
      <el-dialog title="添加api" :visible.sync="isAddApi" >
        <avue-crud
          ref="crud"
          :option="tableOpt"
          :data="pageList"
          :page='page'
          :table-loading="loading"
          @search-change="searchChange"
          @search-reset='searchReset'
          @refresh-change="refreshChange"
          @size-change="sizeChange"
          @current-change="currentChange"
          @selection-change="selectionChange">
            <template slot="tip">
              <el-button type="text" size="small" @click="choose">
                完成
              </el-button>
            </template>
        </avue-crud>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import FormMixin from '@/mixins/FormMixin'
import PageMixin from '@/mixins/PageMixin'
import { FormStatus, DialogStatus } from '@/enum'
import TreeMixin from '@/mixins/TreeMixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'
import { DIC } from '@/const/dic'


@Component
export default class SysMenu extends Mixins(TreeMixin, PageMixin, FormMixin) {
  @Getter('topMenu') private topMenu: any
  @Mutation('SET_MENU') private mSetMenu: any
  @Mutation('SET_TOP_MENU') private mSetTopMenu: any
  @Action('GetIcons') private aGetIcons: any
  @Action('GetUserInfo') private aGetUserInfo: any

  private apisList: any[] = []
  private isAddApi = false
  private buttonRoles: any[] = [] // 菜单权限
  private option: any
  private buttonList: any = []
  private buttonForm: any = {}

  protected created() {
    const tmpDicData: any = []
    let apiContext = require.context('@/views', true, /\.vue$/)
    apiContext.keys().forEach((element: string) => {
      const label = element.replace('./', 'views/').replace('.vue', '')
      tmpDicData.push({label, value: label})
    })
    apiContext = require.context('@/page', true, /^(?!.*(?:(index|lock|login|logs)\/)).*\.vue$/)
    apiContext.keys().forEach((element: string) => {
      const label = element.replace('./', 'page/').replace('.vue', '')
      tmpDicData.push({label, value: label})
    })

    this.treeQueryApi = this.$api.sys.menuAllList
    this.fromAddApi = this.$api.sys.insertMenu
    this.fromEditApi = this.$api.sys.updateMenu
    this.treeDelApi = this.$api.sys.deleteMenu
    this.pageQueryApi = this.$api.core.queryApiList

    this.formOpt = Object.assign(this.$util.deepClone(this.BASE_FORM_OPT), {
      submitBtn: false,
      emptyBtn: false,
      menuPostion: 'left',
      column: [{
          label: '上级名称',
          prop: 'parentLabel',
          disabled: true,
          span: 18,
          row: true
        },
        {
          label: '菜单名称',
          prop: 'label',
          disabled: true,
          maxlength: 10,
          rules: [{
              required: true,
              message: '菜单名称不能为空',
              trigger: 'blur'
          }],
          span: 18,
          row: true
        }, { label: '菜单图标', prop: 'icon', disabled: true, span: 18, row: true },
        {
          label: '菜单路径',
          prop: 'path',
          disabled: true,
          rules: [{
              required: true,
              message: '请输入菜单路径',
              trigger: 'blur'
          }],
          span: 18,
          row: true
        },
        {
          label: '组件地址',
          prop: 'component',
          type: 'select',
          dicData: tmpDicData,
          disabled: true,
          span: 18,
          row: true
        },
        {
          label: '组件序号',
          prop: 'rank',
          type: 'number',
          disabled: true,
          minRows: 1,
          maxRows: 100,
          span: 18,
          row: true
        },
        {
          label: '是否显示',
          prop: 'isShow',
          type: 'radio',
          dicData: [{label: '显示', value: 1}, {label: '隐藏', value: 0}],
          valueDefault: 1,
          span: 18,
          row: true
        },
        {
          label: '是否启用',
          prop: 'status',
          type: 'radio',
          dicData: DIC.STATUS,
          valueDefault: 1,
          span: 18,
          row: true
        },
        {
          label: '按钮权限',
          prop: 'buttonRole',
          span: 18,
          formslot: true,
          row: true,
          display: false
        },
        {
          label: '关联API',
          prop: 'apiNames',
          span: 18,
          formslot: true,
          row: true,
          display: false
        }]
    })

    this.tableOpt = {
      addBtn: false,
      delBtn: false,
      menu: false,
      editBtn: false,
      refreshBtn: false,
      columnBtn: false,
      searchBtn: false,
      selection: true,
      column: [{
            label: 'API类型',
            prop: 'apiType',
            hide: true,
            searchDefault: '1,3'
          }, {
            label: 'APIID',
            prop: 'apiId',
            search: true
          }, {
            label: 'API名称',
            prop: 'apiName',
            search: true
          }]
    }

    this.treeOpt = Object.assign(this.treeOpt, {
      menu: true,
      accordion: true,
      delBtn: this.hasPermission('DEL')
    })

    this.option = {
          page: false,
          align: 'center',
          menuAlign: 'center',
          editBtn: false,
          columnBtn: false,
          menuType: 'text',
          refreshBtn: false,
          showHeader: false,
          size: 'mini',
          column: [{
              label: '名称',
              prop: 'label',
              rules: [ { required: true, message: '请输入名称', trigger: 'blur' }]
            },
            {
              label: '简称',
              prop: 'path',
              rules: [ { required: true, message: '请输入简称', trigger: 'blur' }]
            },
            {
              label: '排序',
              prop: 'rank',
              type: 'number',
              hide: true,
              rules: [ { required: true, message: '请输入简称', trigger: 'blur' },
                     {type: 'number', min: 1, max: 50, message: '序号在1-50之间', trigger: 'blur' }]
            }]
        }
  }

  protected mounted() {
    this.queryTreeList()
    this.aGetIcons().then((res: any) => {
      const col: any = { label: '菜单图标', prop: 'icon', type: 'icon-select',
                        iconList: res, disabled: true, span: 18, row: true }
      this.formOpt.column.splice(2, 1, col)
    })
  }

  protected nodeClickCallBack(data: any) {
    this.disableInput(true)
    this.formStatus = FormStatus.EMPTY
    this.form = data
    this.form.parentLabel = this.parentTreeForm.label
    this.buildApisList()
    this.queryMenuButtonList()
    this.canSetButtonRole(true)
  }

  protected submitCallBack(form: any) {
    this.queryTreeList()
  }

  protected editFormData(form: any) {
    form.apiIds = this.objToArr().join()
    form.apiIds = form.apiIds ? form.apiIds : 'not_in'
    delete form.children
    delete form.apiNames
    delete form.parentLabel
    delete form.is_show
    return form
  }

  protected queryListCallBack(list = []) {
    this.pageList = list
    const selectionData: any[] = []
    list.forEach((item: any) => {
      if (this.objToArr().includes(item.apiId)) {
        selectionData.push(item)
      }
    })
    this.$util.timeout(() => {this.$refs.crud.toggleSelection(selectionData)})
  }

  @Watch('form.component')
  private onWatchFormComponent() {
    if (this.form.component) {
      this.formOpt.column[9].display = true
    } else {
      this.formOpt.column[9].display = false
    }
  }

  // 编辑和查看的时候才允许添加菜单权限
  private canSetButtonRole(display: boolean) {
    if (this.form.component) {
      this.formOpt.column[8].display = display
    } else {
      this.formOpt.column[8].display = false
    }
  }

  // 菜单同步
  private handleSynchronize() {
    this.mSetMenu([])
    this.mSetTopMenu([])
    this.aGetUserInfo()
  }

  // 添加下一级菜单
  private handleAddNext(node: any, data: any) {
    this.disableInput(false)
    this.formStatus = FormStatus.ADD
    this.formOpt.submitText = '添加'
    this.form = {}
    this.form.parentLabel = data.label
    this.form.pid = data.id
    this.form.pids = `${data.pids ? data.pids + ',' : ''}${data.id}`
    this.canSetButtonRole(false)
  }

  // 双击编辑
  private handleDbNodeClick(data: any) {
    if (!this.hasPermission('ADD')) {
      return
    }
    this.parentTreeForm = Object.assign({}, this.$util.findParent(this.treeList, data.id))
    this.handleEdit(null, data)
    this.buildApisList()
    this.queryMenuButtonList()
    this.canSetButtonRole(true)
  }
  // 复制对象
  private handleCope(node: any, data: any) {
    this.apisList = []
    this.disableInput(false)
    this.formStatus = FormStatus.COPY
    this.formOpt.submitText = '复制'
    this.form = Object.assign({}, data)
    this.form.rank++
    this.form.parentLabel = this.parentTreeForm.label
    this.canSetButtonRole(false)
  }
  // 编辑树对象
  private handleEdit(node: any, data: any) {
    this.form = Object.assign({}, data)
    this.formStatus = FormStatus.EDIT
    this.formOpt.submitText = '保存'
    this.disableInput(false)
    this.form.parentLabel = this.parentTreeForm.label
    this.canSetButtonRole(true)
  }

  // 删除api
  private delApi(row: any) {
    this.apisList = this.apisList.filter((item: any) => {
      return item.apiId !== row.apiId
    })
  }

  // 添加api
  private addApi() {
    this.isAddApi = true
    this.queryList()
  }

  // 选择管理的api
  private choose() {
    this.selectionList.forEach((item: any) => {
      if (!this.objToArr().includes(item.apiId)) {
        this.apisList.push({apiId: item.apiId, apiName: item.apiName})
      }
    })
    this.isAddApi = false
  }

  // 查询按钮权限
  private queryMenuButtonList() {
    if (this.form && this.form.component) {
      this.$api.sys.menuButtonList(this.form.id).then((res: any) => {
        this.buttonList = res.data || []
      })
    }
  }

  // 插入默认的菜单按钮权限
  private addMenuButton() {
    if (this.buttonList && this.buttonList.length === 0) {
      const data = {pid: this.form.id, pids: `${this.form.pid},${this.form.id}` }
      this.$api.sys.insertDefaultMenuButton(data).then((res: any) => {
        this.queryMenuButtonList()
      })
    }
  }

  // 新增按钮权限
  private rowButtonSave(form: any, done: any, loading: any) {
    const data = Object.assign({pid: this.form.id, pids: `${this.form.pid},${this.form.id}` }, form)
    this.$api.sys.insertMenuButton(data).then((res: any) => {
        this.$notify({ title: '操作成功', message: '添加成功', type: 'success', duration: 2000 })
        this.queryMenuButtonList()
        done()
    }).catch((err: any) => {
        loading()
    })
  }

  // 删除按钮权限
  private rowButtonDel(form: any) {
    const tip = this.buttonList.length === 1 ? '您确定要删除数据吗？全部删除后，页面无需授权就有全部的增删改查的权限' : '您确定要删除数据吗？删除后原来的已经授权的将失去权限。'
    this.$confirm(tip, '删除确认', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        this.$api.sys.deleteMenuButton(form.id).then((res: any) => {
        this.$notify({ title: '操作成功', message: '删除成功', type: 'success', duration: 2000 })
        this.queryMenuButtonList()
      })
    })
  }

  private disableInput(disabled: boolean) {
    this.formOpt.submitBtn = !disabled
    this.formOpt.column.forEach((element: any) => {
      if (element.label !== this.formOpt.column[0].label) {
        element.disabled = disabled
      }
    })
  }

  private buildApisList() {
    this.apisList = []
    if (this.form && this.form.apiIds) {
      const apiArr: any[] = this.form.apiIds.split(',')
      const apiNameArr: any[] = this.form.apiNames.split(',')
      for (let i = 0; i < apiArr.length; i++) {
        this.apisList.push({apiId: apiArr[i], apiName: apiNameArr[i]})
      }
    }
  }

  private objToArr(): any[] {
    const apiArr: any[] = []
    this.apisList.forEach((it: any) => {
      apiArr.push(it.apiId)
    })
    return apiArr || []
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  padding: 0 20px;
}
.menu-header {
  padding: 8px 0;
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 60%;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
