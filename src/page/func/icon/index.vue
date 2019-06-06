<template>
  <div>
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOpt"
        :data="pageList"
        :page='page'
        :table-loading="loading"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-reset='searchReset'
        @row-update="rowUpdate"
        @row-save="rowSave"
        @row-del="rowDel"
        :before-open="beforeOpen"
        :before-close="beforeClose">
        <template slot-scope="scope" slot="icon">
                  <i :class="scope.row.icon" v-clipboard:copy="scope.row.icon" v-clipboard:success="clipboardSuccess"></i>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import PageMixin from '@/mixins/PageMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'
import { DIC } from '@/const/dic'
import clipboard from '@/directive/clipboard/index'

@Component({directives: {clipboard}})
export default class Icon extends Mixins(PageMixin, BaseMixin) {


  protected created() {
    this.pageQueryApi = this.$api.func.IconPageList
    this.insertApi = this.$api.func.insertIcon
    this.updateApi = this.$api.func.updateIcon
    this.deleteApi = this.$api.func.deleteIcon
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      column: [{
        label: '中文名称',
        prop: 'name',
        search: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写中文名称',
                trigger: 'blur'
            }]
      }, {
        label: '分类名称',
        prop: 'type',
        type: 'select',
        dicData: DIC.ICONTYPE,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请选择分类名称',
                trigger: 'blur'
            }]
      }, {
        label: 'icon',
        prop: 'icon',
        slot: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写icon名称',
                trigger: 'blur'
            }]
      }, {
        label: '排序',
        prop: 'rank',
        type: 'number',
        overHidden: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写排序',
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
    this.queryList()
  }
}
</script>