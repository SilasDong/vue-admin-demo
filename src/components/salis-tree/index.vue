<template>
   <div :class="b()" style="overflow: hidden;">
    <div :class="b('filter')" style="margin-bottom:15px;">
      <el-row>
        <el-col :span="span">
          <el-input placeholder="输入关键字进行过滤"
                style="margin-right:8px;"
                :size="uiSize"
                v-model="filterText">
          </el-input>
        </el-col>
        <el-col :span="1">
        </el-col>
        <el-col :span="23-span">
          <slot name="funMenu"></slot>
        </el-col>
      </el-row>
    </div>
    <div :class="outClass">
      <el-tree ref="tree"
              :data="list"
              :node-key="nodeKey"
              :filter-node-method="filterNode"
              :default-expanded-keys="multiple?checkedKeys:defaultExpandedKeys"
              :default-checked-keys="multiple?checkedKeys:[]"
              :expand-on-click-node="false"
              :show-checkbox="multiple"
              :default-expand-all="defaultExpandAll"
              :accordion='accordion'
              @node-expand='nodeExpand'
              @check="checkChange">
        <div slot-scope="{ node,data }"
            :class="b('item')">
          <div :class="b('title')"
              @click.stop="nodeClick(data)"
              @dblclick.stop  ="nodeDbClick(data)"
              @mouseenter="data.is_show=true"
              @mouseleave="data.is_show=false">{{ data[labelKey] && data[labelKey].length > 15 ? data[labelKey].substr(0, 15) + '...' : data[labelKey] }}
            <div :class="b('menu')"
                v-show="data.is_show && vaildData(option.menu,true)">
              <el-dropdown trigger="click">
                <i class="el-icon-more"
                  :class="b('icon')"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="vaildData(option.addBtn,true)"
                                    @click.native="append(node,data)">新增</el-dropdown-item>
                  <el-dropdown-item v-if="vaildData(option.editBtn,true)"
                                    @click.native="edit(node,data)">修改</el-dropdown-item>
                  <el-dropdown-item v-if="vaildData(option.delBtn,true)"
                                    @click.native="remove(node,data)">删除</el-dropdown-item>
                  <slot name="menuBtn"
                        :node="node"
                        :data="data"></slot>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script lang="ts">
const propsDefault = {
  nodeKey: 'id',
  label: 'label',
  value: 'value',
  children: 'children',
  labelText: '名称'
}
import { Component, Mixins, Prop, Watch} from 'vue-property-decorator'
import BaseMixin from '@/mixins/BaseMixin'
@Component
export default class SilasTree extends Mixins(BaseMixin) {
  @Prop({ type: Object, default: () => {}})
  private option: any
  @Prop({ type: Array, default: () => []})
  private data: any
  @Prop({ type: Object, default: () => {}})
  private value: any

  private filterText = ''
  private box = false
  private type = ''
  private node: any = {}
  private obj: any = {}
  private form: any = {}
  private list: any = []
  private checkedKeys: any = []
  private defaultExpandedKeys: any = []
  private vaildData: any

  private clickTimeId: any[] = []

  get addFlag() {
    return this.type === 'add' || this.type === 'parentAdd'
  }

  get addText() {
    return this.addFlag ? '新增' : '修改'
  }

  get props() {
      return this.option.props || {}
  }
  get valueKey() {
    return this.props.value || propsDefault.value
  }
  get labelText() {
    return this.props.labelText || propsDefault.labelText
  }
  get labelKey() {
    return this.props.label || propsDefault.label
  }
  get childrenKey() {
    return this.props.children || propsDefault.children
  }
  get defaultExpandAll() {
    return this.$util.getObjType(this.option.defaultExpandAll) === 'boolean' ? this.option.defaultExpandAll : true
  }
  get accordion() {
    return this.option.accordion || false
  }
  get multiple() {
    return this.option.multiple || false
  }
  get span() {
    return this.option.span || 24
  }
  get nodeKey() {
    return this.option.nodeKey || propsDefault.nodeKey
  }
  get columnOption() {
    return this.appednKey(this.$util.deepClone(this.data || []))
  }
  get outClass() {
    return [this.option.outClass === undefined ? 'avue-dialog' : this.option.outClass]
  }

  protected created() {
    this.vaildData = this.$util.vaildData
    this.list = this.$util.deepClone(this.columnOption)
  }

  @Watch('columnOption')
  private onWatchColumnOption() {
    this.list = this.$util.deepClone(this.columnOption)
  }

  @Watch('data', {immediate: true})
  private onWatchData() {
    this.checkedKeys = []
    this.recursionCheckedKeys(this.data)
    this.defaultExpandedKeys = this.option.defaultExpandedKeys
  }

  @Watch('option')
  private onWatchOption() {
    this.defaultExpandedKeys = this.option.defaultExpandedKeys
  }

  @Watch('filterText')
  private onWatchFilterText(val: any) {
    this.$refs.tree.filter(val)
  }

  @Watch('value')
  private onWatchValue(val: any) {
    this.form = val
  }

  @Watch('form')
  private onWatchForm(val: any) {
    this.$emit('input', val)
  }

  private b(cls = '') {
    return `avue-tree__${cls}`
  }

  private appednKey(list: any) {
    list.forEach((ele: any) => {
      ele.is_show = false
      if (ele[this.childrenKey]) {
        this.appednKey(ele[this.childrenKey])
      }
    })
    return list
  }
  private nodeClick(data: any) {
    this.clickTimeId.push(setTimeout(() => {
      this.$emit('node-click', data)
    }, 250))
  }
  private nodeDbClick(data: any) {
    this.clickTimeId.forEach((element: any) => {
      clearTimeout(element)
    })
    this.clickTimeId = []
    this.$emit('node-dbclick', data)
  }
  private checkChange(data: any, checkedNodes: any) {
    this.$emit('check-change', data, checkedNodes)
  }
  private nodeExpand(data: any, node: any) {
    this.$emit('node-expand', data, node)
  }
  private filterNode(value: any, data: any) {
    if (!value) {
      return true
    }
    return data[this.labelKey].indexOf(value) !== -1
  }
  private hide() {
    this.box = false
    this.node = {}
    this.obj = {}
    this.$refs.form.resetForm()
    this.$refs.form.clearValidate()
  }
  private save() {
    const callback = () => {
      const form = this.$util.deepClone(Object.assign(this.form, { is_show: false }))
      if (this.type === 'add') {
        if (!this.obj[this.childrenKey]) {
          this.$set(this.obj, 'children', [])
        }
        this.obj.children.push(form)
      } else if (this.type === 'parentAdd') {
        this.obj.push(form)
      }
      this.hide()
    }
    this.$emit('save', this.obj, this.node, callback)
  }
  private update() {
    const callback = () => {
      const parent = this.node.parent
      const children = parent.data[this.childrenKey] || parent.data
      const index = children.findIndex((item: any) => item[this.nodeKey] === this.form[this.nodeKey])
      children.splice(index, 1, this.form)
      this.hide()
    }
    this.$emit('update', this.obj, this.node, callback)
  }

  private edit(node: any, data: any) {
    this.type = 'edit'
    this.node = node
    this.obj = data
    this.form = this.$util.deepClone(this.obj)
    this.show()
  }
  private parentAdd(data: any) {
    this.type = 'parentAdd'
    this.obj = this.list
    this.show()
  }
  private append(node: any, data: any) {
    this.type = 'add'
    this.obj = data
    this.node = node
    this.show()
  }
  private show() {
    this.box = true
    setTimeout(() => {
      this.$refs.form.clearValidate()
    }, 0)
  }
  private remove(node: any, data: any) {
    this.obj = data
    this.node = node
    const callback = () => {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d: any) => d.id === data.id)
      children.splice(index, 1)
    }
    this.$confirm('是否删除改节点?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$emit('del', this.obj, this.node, callback)
    }).catch(() => {
      //
    })

  }

  /**
   * 初始化选中的节点
   */
  private recursionCheckedKeys(treeList: any) {
    treeList.forEach((element: any) => {
      if (element.isSlect === 1 && !element.children) {
        this.checkedKeys.push(element.id)
      }
      if (element.children) {
        this.recursionCheckedKeys(element.children)
      }
    })
  }

}
</script>
