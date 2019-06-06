<template>
  <div>
    <basic-container>
      <avue-tabs :option="option" @change="handleChange">
      </avue-tabs>
      <el-row :gutter="20">
        <el-col :span="7" :xs='24'>
          <el-aside  style="margin-right: 50px;width: 200px;">
            <silas-tree :option="treeOpt" :data="treeList" @node-expand='handleNodeExpand' @node-click="handleNodeClick" @node-dbclick='handleDbNodeClick' v-model="treeForm" @del="handleTreeDel">
              <template slot-scope="scope" slot="menuBtn">
                  <el-dropdown-item @click.native="handleEdit(scope.node,scope.data)" v-if="hasPermission('EDIT')">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="handleCope(scope.node,scope.data)" v-if="hasPermission('ADD')">复制</el-dropdown-item>
                  <el-dropdown-item @click.native="handleAddNext(scope.node,scope.data)" v-if='!scope.data.pid && hasPermission("ADD")'>添加下级</el-dropdown-item>
              </template>
            </silas-tree>
          </el-aside>
        </el-col>
      <el-col :span="17" :xs='24'>
        <el-main style="margin-top: 50px;">
          <avue-form :option="formOpt" v-model="form" @submit="handleSubmit">
          </avue-form>
        </el-main>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import FormMixin from '@/mixins/FormMixin'
import PageMixin from '@/mixins/PageMixin'
import { FormStatus } from '@/enum'
import TreeMixin from '@/mixins/TreeMixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'


@Component
export default class SysDic extends Mixins(TreeMixin, FormMixin, BaseMixin) {

  private apisList: any[] = []
  private isAddApi = false
  private isFather = true
  private option: any = { column: [{label: '项目字典', prop: '0'}, {label: '系统字典', prop: '1'}] }
  private configType: any = 0

  protected created() {
    this.treeQueryApi = this.$api.sys.dicTreeList

    this.formOpt = Object.assign(this.$util.deepClone(this.BASE_FORM_OPT), {
      labelWidth: 100,
      submitBtn: false,
      emptyBtn: false,
      menuPostion: 'left',
      column: [{
          label: '字典组ID',
          prop: 'id',
          row: true,
          disabled: true,
          display: true,
          maxlength: 20,
          span: 18,
          rules: [{
              required: true,
              message: '字典组ID不能为空',
              trigger: 'blur'
          }]
        },
        {
          label: '字典组名称',
          prop: 'groupName',
          disabled: true,
          display: true,
          maxlength: 30,
          span: 18,
          rules: [{
              required: true,
              message: '字典组名称不能为空',
              trigger: 'blur'
          }],
          row: true
        },
        {
          label: '字典组备注',
          prop: 'remark',
          type: 'textarea',
          span: 18,
          disabled: true,
          display: true,
          row: true
        },
        {
          label: '字典组ID',
          prop: 'groupId',
          disabled: true,
          display: false,
          maxlength: 20,
          span: 18,
          rules: [{
              required: true,
              message: '字典组ID不能为空',
              trigger: 'blur'
          }],
          row: true
        },
        {
          label: '字典KEY',
          prop: 'dictKey',
          disabled: true,
          display: false,
          maxlength: 20,
          span: 18,
          rules: [{
              required: true,
              message: '字典KEY不能为空',
              trigger: 'blur'
          }],
          row: true
        },
        {
          label: '字典VALUE',
          prop: 'dictValue',
          maxlength: 100,
          span: 18,
          disabled: true,
          display: false,
          rules: [{
              required: true,
              message: '字典VALUE不能为空',
              trigger: 'blur'
          }, { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }],
          row: true
        },
        {
          label: '字典排序',
          prop: 'rank',
          disabled: true,
          display: false,
          valueDefault: 0,
          span: 18,
          mock: {
              type: 'number',
              max: 1,
              min: 100,
              precision: 0
          },
          rules: [{
              required: true,
              message: '字典VALUE不能为空',
              trigger: 'blur'
          }],
          row: true
        }]
    })

    this.treeOpt = Object.assign(this.treeOpt, {
      props: {
        value: 'dictKey',
        label: 'dictValue'
      },
      menu: true,
      defaultExpandAll: false,
      outClass: '',
      accordion: true,
      delBtn: this.hasPermission('DEL')
    })
  }

  protected mounted() {
    this.handleChange(this.option.column[0])
  }

  protected nodeClickCallBack(data: any) {
    this.disableInput(true)
    this.formStatus = FormStatus.EMPTY
    this.form = data
    this.editData(data)
  }

  protected submitCallBack(form: any) {
    this.queryTreeList({configType: this.configType})
  }

  // 新增或修改表单数据时操作数据
  protected editFormData(form: any) {
    let tmp
    if (this.isFather) {
      this.fromSubmitApi = this.formStatus === FormStatus.EDIT ?
                           this.$api.sys.updateDictGroup : this.$api.sys.insertDictGroup
      tmp = {id: form.id, groupName: form.groupName, remark: form.remark}
    } else {
      this.fromSubmitApi = this.formStatus === FormStatus.EDIT ?
                           this.$api.sys.updateDict : this.$api.sys.insertDict
      tmp = {id: form.id, groupId: form.groupId, dictKey: form.dictKey, dictValue: form.dictValue, rank: form.rank}
    }
    return tmp
  }

  protected delTreeData(data: any) {
    this.treeDelApi = this.isFather ? this.$api.sys.deleteDictGroup : this.$api.sys.deleteDict
    return { id: data.id }
  }

  @Watch('isFather')
  private onWatchIsFather() {
    let index = 0
    this.formOpt.column.forEach((item: any) => {
      item.display = index > 2 ? !this.isFather : this.isFather
      index++
    })
  }

  // 首次加载就触发
  private handleChange(column: any) {
    this.configType = column.prop
    this.queryTreeList({configType: this.configType}).then((res: any) => {
      this.treeOpt.defaultExpandedKeys.push(res && res[0] && res[0].id)
    })
  }

  // 区分是dict_group数据还是dict数据
  private editData(data: any) {
    this.isFather = data.type === 'isFather'
    this.form = Object.assign({}, data)
    if (this.isFather) {
      this.form.groupName = this.form.dictValue
    } else {
      this.form.groupId = this.form.pid
    }
  }

  private handleDbNodeClick(data: any) {
    if (this.hasPermission('ADD')) {
      this.handleEdit(null, data)
    }
  }

  private handleAddNext(node: any, data: any) {
    this.editData({pid: data.id, type: 'isChild', rank: data.children && data.children.length + 1})
    this.disableInput(false)
    this.formStatus = FormStatus.ADD
    this.formOpt.submitText = '添加'
  }
  // 复制数对象
  private handleCope(node: any, data: any) {
    this.editData(data)
    this.formStatus = FormStatus.COPY
    this.disableInput(false)
    this.formOpt.submitText = '复制'
    this.form.rank++
  }
  // 编辑树对象
  private handleEdit(node: any, data: any) {
    this.editData(data)
    this.formStatus = FormStatus.EDIT
    this.formOpt.submitText = '编辑'
    this.disableInput(false)
  }

  private disableInput(disabled: boolean) {
    this.formOpt.submitBtn = !disabled
    this.formOpt.column.forEach((element: any) => {
      if (element.label !== this.formOpt.column[3].label || this.formStatus === FormStatus.COPY) {
        element.disabled = disabled
      }
    })
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
