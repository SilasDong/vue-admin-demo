import { Component, Mixins } from 'vue-property-decorator'
import BaseMixin from './BaseMixin'
@Component
export default class TreeMixin extends Mixins(BaseMixin) {
  /**
   * 树组件配置像
   */
  protected treeOpt: any = {
    nodeKey: 'id',
    addBtn: false,
    editBtn: false,
    defaultExpandedKeys: []
  }
  /**
   * 树对象返回list
   */
  protected treeList: any[] = []
  /**
   * 查询函数
   */
  protected treeQueryApi: any
  /**
   * 查询函数
   */
  protected treeDelApi: any
  /**
   * 树对象
   */
  protected treeForm: any = {}
  /**
   * 选中时树对象的父亲对象
   */
  protected parentTreeForm: any = {}

  /**
   * 默认展开的节点
   */
  protected defaultExpandedKey = ''

  /**
   * 查询树对象数据
   */
  protected queryTreeList(param?: any) {
    return new Promise((resolve) => {
      this.treeQueryApi(param).then((res: any) => {
        if (res.data) {
          const tmp = JSON.stringify(res.data).replace(/_children/g, 'children')
          this.treeList = JSON.parse(tmp)
          if (this.defaultExpandedKey) {
            this.treeOpt.defaultExpandedKeys = []
            this.treeOpt.defaultExpandedKeys.push(this.defaultExpandedKey)
          }
          resolve(this.treeList)
        }
      })
    })
  }

  /**
   * 删除树对象
   * @param data
   * @param node
   * @param done
   */
  protected handleTreeDel(data: any, node: any, done: any) {
    const param = this.delTreeData(data)
    const isString = this.treeDelApi && this.$util.getObjType(this.treeDelApi) === 'string'
    const promise = isString ? this.$http.get(`/api/${this.treeDelApi}`, param) : this.treeDelApi(param)
    promise.then((res: any) => {
      this.$message({
        showClose: true,
        message: '删除成功',
        type: 'success'
      })
      this.queryTreeList()
      done()
    })
  }

  /**
   * 删除时，行数据处理
   * @param form
   */
  protected delTreeData(data: any): any {
    return { id: data.id }
  }

  protected handleNodeExpand(data: any, node: any) {
    this.defaultExpandedKey = data.id
  }

  /**
   * 点击结点函数
   * @param data
   */
  protected handleNodeClick(data: any) {
    this.parentTreeForm = Object.assign({}, this.$util.findParent(this.treeList, data.id))
    this.nodeClickCallBack(data)
  }

  /**
   * 点击节点选择后的回调函数
   * @param data
   */
  protected nodeClickCallBack(data: any) {
    //
  }
}
